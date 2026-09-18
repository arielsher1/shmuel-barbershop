import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

// 1. הגדרת המבנה המדויק של המטמון (במקום להשתמש ב-any)
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// 2. הוספת המשתנה לתוך הזיכרון הגלובלי של השרת בצורה תקנית
declare global {
  // eslint-disable-next-line no-var
  var mongooseGlobalCache: MongooseCache;
}

let cached = global.mongooseGlobalCache;

if (!cached) {
  cached = global.mongooseGlobalCache = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then((mongooseInstance) => {
      console.log('✅ Connected to MongoDB successfully');
      return mongooseInstance;
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;