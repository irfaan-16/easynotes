import connect from "@/lib/db";
import { GridFSBucket, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (
  req: NextRequest,
  context: any,
  res: NextResponse
) => {
  try {
    const { id } = context.params;
    const client = await connect();
    const database = client.db("easynotes");
    const bucket = new GridFSBucket(database, { bucketName: "uploads" });
    const downloadStream = bucket.openDownloadStream(new ObjectId(id));
    const chunks = [];
    for await (const chunk of downloadStream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    const fileBase64 = buffer.toString("base64");

    return new Response(JSON.stringify({ base64: fileBase64 }));
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify({ msg: "something went wrong" }));
  }
};
