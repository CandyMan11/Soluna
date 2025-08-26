// soluna_mark3\src\lib\models\Journal.ts

import mongoose, { Schema, Document } from "mongoose";

export interface IJournal extends Document {
  title?: string;
  content: string;
  date: Date;
  tags?: string[];
  shared: boolean;
}

const JournalSchema: Schema = new Schema({
  title: { type: String },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  tags: { type: [String], default: [] },
  shared: { type: Boolean, default: false }
});

export default mongoose.models.Journal || mongoose.model<IJournal>("Journal", JournalSchema);
