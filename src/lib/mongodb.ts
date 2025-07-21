import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return cachedDb;
  }

  const client = new MongoClient(MONGODB_URI!);

  cachedClient = await client.connect();
  
  // The user's connection string includes the database name, so we can parse it
  const dbName = MONGODB_URI.split('/').pop()?.split('?')[0] || 'machisdb';
  cachedDb = cachedClient.db(dbName);

  return cachedDb;
}
