import { NextResponse } from "next/server";

import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    await client.db().admin().ping();

    return NextResponse.json(
      {
        ok: true,
        message: "MongoDB connected",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/db-test failed:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "MongoDB not connected",
      },
      { status: 500 },
    );
  }
}
