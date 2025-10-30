import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const model = searchParams.get("model");

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const apiKey = session?.user.apiKey;

  try {
    const response = await fetch(
      `${process.env.HILKIANO_BACKEND_BASEURL}/template/import/${type}/${model}`,
      {
        headers: {
          "x-api-key": apiKey || "",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }

    const csvData = await response.arrayBuffer();

    return new NextResponse(csvData, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${model ?? "data"}.csv"`,
      },
    });
  } catch (error) {
    console.error("Error from backend:", error);
    return NextResponse.json(
      { error: "Failed to get template" },
      { status: 500 }
    );
  }
}
