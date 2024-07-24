import FeedCard from "@/components/FeedCard";
import connect from "@/lib/db";
import Link from "next/link";

interface UserDetails {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

interface UploadDocument {
  _id: string;
  course: string;
  subject: string;
  year: string;
  description: string;
  semester: string;
  fileID: string;
  userID: string;
  userDetails: UserDetails;
}
const getData = async () => {
  try {
    const client = await connect();
    // Specify the database and collection
    // Specify the database and collection
    const database = client.db("easynotes");
    const uploads = database.collection("uploads");

    // Perform the aggregation
    const uploadDocs = await uploads
      .aggregate([
        {
          $lookup: {
            from: "users", // The collection to join
            localField: "userID", // Field from the uploads collection
            foreignField: "_id", // Field from the users collection
            as: "userDetails", // The name of the new array field to add to the documents
          },
        },
        {
          $unwind: "$userDetails", // Unwind the array to include user details as a single object
        },
      ])
      .toArray();
    return uploadDocs;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch the data...");
  }
};

const Page = async () => {
  const uploads = await getData();

  function base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }

  return (
    <div>
      <h1>Feed</h1>
      <Link href="/upload">Upload</Link>
      <div className="flex flex-wrap gap-6 p-4 justify-center">
        {uploads?.map((upload: any) => {
          return (
            <FeedCard
              key={upload._id}
              subject={upload.subject}
              desc={upload.description}
              avatar={upload.userDetails.avatar}
              name={upload.userDetails.name}
              course={upload.course}
              id={upload.fileID}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
