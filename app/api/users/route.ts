import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import clientPromise from "@/lib/mongodb";
import {
  contactLeadSchema,
  MINI_ESTATE_OFFER,
} from "@/lib/validation/contact";

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "mydb";
const COLLECTION_NAME = "leads";
const MAX_BODY_BYTES = 10_000;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

type GlobalRateLimit = typeof globalThis & {
  _leadRateLimit?: Map<string, RateLimitBucket>;
};

const globalForRateLimit = globalThis as GlobalRateLimit;
const rateLimitStore = globalForRateLimit._leadRateLimit ?? new Map();

if (process.env.NODE_ENV !== "production") {
  globalForRateLimit._leadRateLimit = rateLimitStore;
}

const getClientIp = (request: NextRequest) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
};

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);

  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  existing.count += 1;
  return existing.count > RATE_LIMIT_MAX_REQUESTS;
};

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Not available in production." },
      { status: 403 },
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const users = await db
      .collection(COLLECTION_NAME)
      .find(
        {},
        {
          projection: {
            fullName: 1,
            offer: 1,
            unitType: 1,
            estatesNeeded: 1,
            plotsNeeded: 1,
            source: 1,
            createdAt: 1,
          },
        },
      )
      .sort({ createdAt: -1 })
      .limit(30)
      .toArray();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("GET /api/users failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429 },
      );
    }

    const rawText = await req.text();

    if (rawText.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Request payload is too large." },
        { status: 413 },
      );
    }

    const body = JSON.parse(rawText) as unknown;
    const validatedData = contactLeadSchema.parse(body);

    if (validatedData.website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);

    const { quantity, offer, ...leadRest } = validatedData;
    const isMiniEstate = offer === MINI_ESTATE_OFFER;
    const unitType = isMiniEstate ? "estate" : "plot";

    const result = await db.collection(COLLECTION_NAME).insertOne({
      ...leadRest,
      offer,
      unitType,
      ...(isMiniEstate
        ? { estatesNeeded: quantity }
        : { plotsNeeded: quantity }),
      createdAt: new Date(),
      ipAddress: ip,
    });

    return NextResponse.json(
      {
        success: true,
        insertedId: result.insertedId,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON payload." },
        { status: 400 },
      );
    }

    if (error instanceof ZodError) {
      const firstIssue = error.issues[0]?.message || "Invalid form data.";
      return NextResponse.json({ error: firstIssue }, { status: 400 });
    }

    console.error("POST /api/users failed:", error);
    return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
  }
}
