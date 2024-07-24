// pages/api/upload.js
import connect from "@/lib/db";
import { GridFSBucket, ObjectId } from "mongodb";
import dynamic from "next/dynamic";
import { NextResponse } from "next/server";
import { Readable } from "stream";

const dataURLtoBuffer = (dataURL: string) => {
  const parts = dataURL.split(";base64,");
  if (parts.length !== 2) {
    throw new Error("Invalid Data URL");
  }

  return Buffer.from(parts[1], "base64");
};
// Config to set the body size limit
export const config = {
  api: {
    responseLimit: "40mb",
  },
};
export const POST = async (req: any) => {
  try {
    const {
      dataURL,
      fileName,
      course,
      subject,
      description,
      year,
      semester,
      userID,
    } = await req.json();

    const client = await connect();
    const database = client.db("easynotes");
    const bucket = new GridFSBucket(database, { bucketName: "uploads" });

    const buffer = dataURLtoBuffer(dataURL);

    const readableStream = new Readable();
    readableStream._read = () => {}; // _read is required but you can noop it
    readableStream.push(buffer);
    readableStream.push(null);

    const uploadStream = bucket.openUploadStream(fileName, {
      metadata: {
        course,
        subject,
        description,
        year,
        semester,
        userID: new ObjectId(userID),
      },
    });

    readableStream.pipe(uploadStream);

    await new Promise<void>((resolve, reject) => {
      uploadStream.on("finish", async () => {
        try {
          await database.collection("uploads").insertOne({
            course,
            subject,
            year,
            description,
            semester,
            fileID: uploadStream.id,
            userID: new ObjectId(userID),
          });
          resolve();
        } catch (err) {
          reject(err);
        }
      });

      uploadStream.on("error", (err) => {
        reject(err);
      });
    });

    client.close();
    return NextResponse.json(
      { message: "File uploaded successfully", fileId: uploadStream.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to process Data URL:", error);
    return NextResponse.json(
      { error: "Failed to process Data URL" },
      { status: 500 }
    );
  }
};
