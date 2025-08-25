// src/app/api/journal/route.ts

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content, tags } = body;

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("soluna_db");
    const collection = db.collection("journals");

    const result = await collection.insertOne({
      content,
      tags: tags || [],
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save journal" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("soluna_db");
    const collection = db.collection("journals");

    const entries = await collection.find().sort({ createdAt: -1 }).toArray();

    return NextResponse.json(entries);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch journals" }, { status: 500 });
  }
}
