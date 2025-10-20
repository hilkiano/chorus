import { db } from "@/db/drizzle";
import { apiKeys } from "@/db/schema";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  type NewKey = typeof apiKeys.$inferInsert;

  const payload: NewKey = await req.json();

  try {
    await db
      .insert(apiKeys)
      .values(payload)
      .onConflictDoUpdate({
        target: apiKeys.userId,
        set: {
          key: payload.key,
        },
      });

    return NextResponse.json({
      status: true,
    });
  } catch (error) {
    console.error("Error create API key:", error);
    return NextResponse.json(
      { error: "Error create API key" },
      { status: 500 }
    );
  }
}
