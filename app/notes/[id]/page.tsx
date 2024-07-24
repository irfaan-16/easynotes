import ViewPdf from "@/components/ViewPdf";
import connect from "@/lib/db";
import { ObjectId } from "mongodb";
import Image from "next/image";

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

const getData = async (ID: string) => {
  try {
    const client = await connect();
    const database = client.db("easynotes");
    const uploads = database.collection("uploads");
    const uploadDocs = await uploads
      .aggregate([
        { $match: { fileID: new ObjectId(ID) } },
        {
          $lookup: {
            from: "users",
            localField: "userID",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        { $unwind: "$userDetails" }, // Unwind the userDetails array to get a single object
      ])
      .toArray();

    return uploadDocs[0]; // Assuming there is only one document per fileID
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch the document");
  }
};

const Page = async ({ params }: { params: any }) => {
  const ID = params.id;
  const data = await getData(ID);
  console.log(data, "DATA");

  return (
    <div className="bg-zinc-900 rounded-md max-w-screen-xl m-auto p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="mt-2">
            <span className="p-1 px-2 rounded-sm bg-[rgba(0,0,0,0.7)] text-sm">
              degree
            </span>
            <h1 className="text-5xl font-bold text-foreground">
              {data?.course}
            </h1>
          </div>
          <div className="mt-4">
            <span className="p-1 px-2 rounded-sm bg-[rgba(0,0,0,0.7)] text-sm">
              subject
            </span>
            <h3 className="text-3xl">{data?.subject}</h3>
          </div>

          <div className="mt-4">
            <span className="p-1 px-2 rounded-sm bg-[rgba(0,0,0,0.7)] text-sm">
              description
            </span>
            <p>{data?.description}</p>
          </div>
        </div>
        <div className="p-4 rounded-md bg-[rgba(0,0,0,0.7)] flex flex-col gap-3 text-center items-center w-max mt-10">
          <Image
            src={data?.userDetails?.avatar as string}
            height={80}
            width={80}
            alt="User avatar"
            className="rounded-full h-16 w-16"
          />

          <div>
            <h4 className="text-2xl">{data?.userDetails?.name}</h4>
            <span>{data?.userDetails?.email}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-6 p-4 justify-center">
        <ViewPdf ID={ID} />
      </div>
    </div>
  );
};

export default Page;
