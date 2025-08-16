import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error('Define MONGODB_URI in .env.local');

let cached: { conn: typeof mongoose | null } = (global as any)._mongoose;

if (!cached) {
  (global as any)._mongoose = cached = { conn: null };
}

export async function dbConnect() {
  if (cached.conn) return cached.conn;
  cached.conn = await mongoose.connect(MONGODB_URI);
  return cached.conn;
}
