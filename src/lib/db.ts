import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
}

if (!global._mongooseCache) {
  global._mongooseCache = { conn: null, promise: null };
}

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in .env.local");
  }

  const cached = global._mongooseCache;

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .catch((err) => {
        // Clear the cached promise so the next request retries
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
