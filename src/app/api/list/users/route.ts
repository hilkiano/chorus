import { db } from "@/db/drizzle";
import { apiKeys, members, users } from "@/db/schema";
import { desc, eq, or, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 1;
  const filter = searchParams.get("filter") || "";

  const offset = (page - 1) * limit;
  try {
    const query = db
      .select()
      .from(users)
      .where(
        filter ? or(eq(users.email, filter), eq(users.name, filter)) : undefined
      )
      .leftJoin(members, eq(users.id, members.userId));
    const data = await query
      .orderBy(desc(users.createdAt))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(users);

    const totalPages = Math.ceil(Number(count) / limit);

    return NextResponse.json({
      data,
      pagination: {
        total: Number(count),
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching list:", error);
    return NextResponse.json(
      { error: "Failed to fetch list" },
      { status: 500 }
    );
  }
}
