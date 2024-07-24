"use client";

import { useState } from "react";
import PdfView from "./PdfView";
import { DownloadIcon } from "@radix-ui/react-icons";

const ViewPdf = ({ ID }: { ID: string }) => {
  const [fileBase64, setFileBase64] = useState<string>("");

  const handleDownload = () => {};
  const handleSubmit = async () => {
    console.log("handleSubmit");

    const response = await fetch(`/api/notes/${ID}`);
    console.log(response);

    const { base64 } = await response.json();
    setFileBase64(base64);
  };

  return (
    <div>
      <button
        onClick={() => handleSubmit()}
        className="p-2 px-6 bg-black text-primary-foreground rounded-md font-bold cursor-pointer text-sm   dark:text-white"
      >
        view
      </button>
      {fileBase64 && <PdfView base64={fileBase64} />}
      {/* <div
        className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-3 font-bold cursor-pointer"
        onClick={() => handleDownload()}
      >
        <DownloadIcon className="mr-2 w-5 h-5" />
        Download Notes
      </div> */}
    </div>
  );
};

export default ViewPdf;
