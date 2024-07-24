import { MongoClient } from "mongodb";
import mongoose, { ConnectOptions } from "mongoose";
let cachedConnection: any;

export const connect = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  const client = new MongoClient(process.env.MONGODB_URI as string);
  await client.connect();

  cachedConnection = client;
  return client;
};
export default connect;
