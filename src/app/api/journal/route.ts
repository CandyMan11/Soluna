// src/app/api/journal/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Utility: get DB with fallback
async function getDb() {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB || "soluna_db");
}

// Create (POST) a new journal entry
export async function POST(req: Request) {
  try {
    const db = await getDb();
    const body = await req.json();

    const entry = {
      title: body.title || "Untitled",
      content: body.content || "",
      tags: body.tags || [],
      createdAt: new Date(),
    };

    const result = await db.collection("journal").insertOne(entry);

    console.log("POST created entry:", result.insertedId);

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("POST error:", err.message);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to create entry" },
      { status: 500 }
    );
  }
}

// Get all journal entries (GET)
export async function GET() {
  try {
    const db = await getDb();

    const entries = await db
      .collection("journal")
      .find({})
      .sort({ createdAt: -1 }) // newest first
      .toArray();

    console.log("GET fetched entries:", entries.length);

    return NextResponse.json(entries);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("GET error:", err.message);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch entries" },
      { status: 500 }
    );
  }
}

// Update a journal entry by ID (PUT)
export async function PUT(req: Request) {
  try {
    const db = await getDb();
    const body = await req.json();

    // Accept either "id" or "_id"
    const id = body.id || body._id;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing ID" },
        { status: 400 }
      );
    }

    // Whitelist fields we want to allow updating
    const updateFields: Record<string, unknown> = {};
    if (body.title !== undefined) updateFields.title = body.title;
    if (body.content !== undefined) updateFields.content = body.content;
    if (body.tags !== undefined) updateFields.tags = body.tags;

    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { success: false, error: "No fields to update" },
        { status: 400 }
      );
    }

    const result = await db
      .collection("journal")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateFields });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "No entry found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, updatedId: id });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("PUT error:", err.message);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update entry" },
      { status: 500 }
    );
  }
}


// Delete a journal entry by ID (DELETE)
export async function DELETE(req: Request) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(req.url);

    // Accept either query param "id" or "_id"
    const id = searchParams.get("id") || searchParams.get("_id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing ID" },
        { status: 400 }
      );
    }

    const result = await db
      .collection("journal")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "No entry found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("DELETE error:", err.message);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete entry" },
      { status: 500 }
    );
  }
}

