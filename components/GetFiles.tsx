"use client";
import { jsPDF } from "jspdf";
import { useState } from "react";
import { Button } from "./ui/button";

const GetFiles = ({ setDataURL, setCanUpload }: any) => {
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<boolean>(false);
  const doc = new jsPDF();

  const blobToBase64 = (blob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
    await handleGeneratePdf();
  };

  const handleGeneratePdf = async () => {
    const readFile = (file: File) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    };

    for (let i = 0; i < selectedFiles.length; i++) {
      const imgData = await readFile(selectedFiles[i]);
      const img = new Image();
      img.src = imgData;
      await new Promise<void>((resolve) => {
        img.onload = () => {
          const aspectRatio = img.width / img.height;
          const maxWidth = 180; // Maximum width of the image in the PDF
          const maxHeight = 250; // Maximum height of the image in the PDF
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            width = maxWidth;
            height = maxWidth / aspectRatio;
          }
          if (height > maxHeight) {
            height = maxHeight;
            width = maxHeight * aspectRatio;
          }
          if (i !== 0) {
            doc.addPage();
          }
          doc.addImage(imgData, "JPEG", 10, 10, width, height);
          resolve();
        };
      });
    }
    const blob = doc.output("blob");
    blobToBase64(blob)
      .then((res) => {
        console.log(res);
        setDataURL(res);
      })
      .then(() => {
        setCanUpload(true);
      });
    // const pdfBlob = doc.output("blob");
    // const dataURL = doc.output("dataurlstring");
    // const pdfUrl = URL.createObjectURL(pdfBlob);
    // setPdfUrl(pdfUrl);
  };

  return (
    <div>
      <div>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-12 h-12 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              {selectedFiles.length ? (
                <p>
                  You&apos;ve selected {selectedFiles.length + " "}
                  Image(s)
                </p>
              ) : (
                <>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload{"  "}</span>
                    or drag and drop files here
                  </p>
                </>
              )}
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              multiple
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-4">
        <Button
          type="button"
          className="mb-4"
          onClick={() => {
            setPreview(!preview);
            handleGeneratePdf();
          }}
          disabled={selectedFiles.length === 0}
        >
          {preview ? "Hide" : "Show"} Preview
        </Button>
      </div>
      {pdfUrl && preview && (
        <div>
          {/* <object
                        width="100%"
                        data={pdfUrl}
                        height="500px"
                        type="application/pdf"
                        className="border-none outline-none"
                    ></object> */}
          <iframe src={pdfUrl} width="100%" height="500px"></iframe>
        </div>
      )}
    </div>
  );
};
export default GetFiles;
