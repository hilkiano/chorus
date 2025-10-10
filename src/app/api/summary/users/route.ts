import { db } from "@/db/drizzle";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const summaryQuery = await db.execute(sql`
      SELECT 
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE deleted_at IS NULL)::int AS total_active,
        COUNT(*) FILTER (WHERE deleted_at IS NOT NULL)::int AS total_inactive
      FROM users;
    `);

    const row = summaryQuery.rows[0];

    return NextResponse.json({
      users: {
        total: row.total ?? 0,
        totalActive: row.total_active ?? 0,
        totalInactive: row.total_inactive ?? 0,
      },
    });
  } catch (error) {
    console.error("Error fetching summary:", error);
    return NextResponse.json(
      { error: "Failed to fetch summary" },
      { status: 500 }
    );
  }
}
