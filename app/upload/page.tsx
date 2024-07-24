"use client";
import { FormEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import GetFiles from "@/components/GetFiles";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
interface User {
  name: string;
  email: string;
  image: string;
  mongoDbID: string;
}
interface Session {
  user: User;
  expires: string;
}
const Page = () => {
  const sessionData = useSession();
  const session: Session | null = sessionData.data as Session | null;
  if (!session) {
    redirect("/");
  }

  // const [file, setFile] = useState<Blob | null>(null);
  // const [images, setImages] = useState<string[] | null>([]);
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [description, setDescription] = useState("");
  const [dataURL, setDataURL] = useState("");
  const [canUpload, setCanUpload] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(dataURL);
    const toastId = toast.loading("uploading your notes.⌛");

    const response = await fetch("/api/uploadnotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dataURL,
        fileName: new Date().toISOString().replace(/[-:.]/g, ""),
        course,
        year,
        semester,
        subject,
        description,
        userID: session.user.mongoDbID,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data, "DATATATATATATATATATATATATATA");
      toast.success("notes uploaded!🚀", {
        id: toastId,
      });
    } else {
      toast.error("failed to upload notes!", {
        id: toastId,
      });
    }
  };

  return (
    <main className="flex flex-col min-h-[100dvh]">
      <section className="w-full py-6">
        <h1 className="mb-4 text-3xl font-extrabold md:text-4xl lg:text-5xl text-center text-transparent bg-clip-text bg-gradient-to-r to-green-500 from-sky-400 leading-6">
          Brain Dump Zone: <br />
          Upload Notes!
        </h1>
        <div className="container px-4 md:px-6">
          <form className="max-w-2xl mx-auto space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="course">Course</Label>
                  <Input
                    id="course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="semester">Semester</Label>
                  <Input
                    id="semester"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  className="max-h-52"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>
              <GetFiles setDataURL={setDataURL} setCanUpload={setCanUpload} />
            </div>

            <Button type="submit" className="w-full" disabled={!canUpload}>
              Upload
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Page;
