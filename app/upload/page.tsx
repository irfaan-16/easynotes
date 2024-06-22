"use client";
import { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Document, Page, pdfjs } from "react-pdf";
import jsPDF from "jspdf";
import "jspdf-autotable";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function Component() {
    const [file, setFile] = useState<Blob | null>(null);
    const [images, setImages] = useState<string[] | null>([]);
    const [course, setCourse] = useState("");
    const [year, setYear] = useState("");
    const [subject, setSubject] = useState("");
    const [semester, setSemester] = useState("");
    const [description, setDescription] = useState("");
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState(1);
    const handleFileChange = (event: any) => {
        const fileList = Array.from(event.target.files);

        // Create URL for each image to display preview
        const imagePreviews = fileList.map((file: any) =>
            URL.createObjectURL(file)
        );

        setImages(imagePreviews);
    };

    // Handle PDF generation and download
    const generatePdf = async () => {
        const doc = new jsPDF();

        // Calculate dimensions to fit image within page width
        const calculateDimensions = (
            img: any,
            maxWidth: number,
            maxHeight: number
        ) => {
            const ratio = img.width / img.height;
            let imgWidth = maxWidth;
            let imgHeight = maxWidth / ratio;

            if (imgHeight > maxHeight) {
                imgHeight = maxHeight;
                imgWidth = maxHeight * ratio;
            }

            return { imgWidth, imgHeight };
        };

        // Helper function to add image to PDF
        const addImageToPdf = (imageUrl: string) => {
            return new Promise<void>((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = "Anonymous"; // Handle CORS issues if applicable
                img.onload = () => {
                    const maxWidth = doc.internal.pageSize.getWidth() - 20; // Adjust margin
                    const maxHeight = doc.internal.pageSize.getHeight() - 20; // Adjust margin

                    const { imgWidth, imgHeight } = calculateDimensions(
                        img,
                        maxWidth,
                        maxHeight
                    );

                    doc.addImage(imageUrl, "JPEG", 10, 10, imgWidth, imgHeight);
                    resolve();
                };
                img.src = imageUrl;
            });
        };

        // Generate PDF for all images
        try {
            for (const imageUrl of images!) {
                await addImageToPdf(imageUrl);
                if (imageUrl !== images![images!.length - 1]) {
                    doc.addPage();
                }
            }
            doc.save("images.pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
    };
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <form
                            onSubmit={handleSubmit}
                            className="max-w-2xl mx-auto space-y-6"
                        >
                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="course">Course</Label>
                                        <Input
                                            id="course"
                                            value={course}
                                            onChange={(e) =>
                                                setCourse(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="year">Year</Label>
                                        <Input
                                            id="year"
                                            value={year}
                                            onChange={(e) =>
                                                setYear(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input
                                            id="subject"
                                            value={subject}
                                            onChange={(e) =>
                                                setSubject(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="semester">
                                            Semester
                                        </Label>
                                        <Input
                                            id="semester"
                                            value={semester}
                                            onChange={(e) =>
                                                setSemester(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        rows={4}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="file">File</Label>
                                    <Input
                                        id="file"
                                        type="file"
                                        onChange={handleFileChange}
                                        required
                                        accept="image/*"
                                        multiple
                                    />
                                </div>
                            </div>
                            {images?.length && images.length > 0 && (
                                <div>
                                    {images.map((imageUrl, index) => (
                                        <div
                                            key={index}
                                            style={{ margin: "10px 0" }}
                                        >
                                            <img
                                                src={imageUrl}
                                                alt={`Image ${index}`}
                                                style={{
                                                    maxWidth: "100%",
                                                    height: "auto",
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                            <Button type="submit" className="w-full">
                                Upload
                            </Button>

                            <Button
                                type="button"
                                className="w-full"
                                onClick={generatePdf}
                            >
                                Download
                            </Button>
                        </form>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-muted-foreground">
                    &copy; 2024 Note Sharing. All rights reserved.
                </p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link
                        href="#"
                        className="text-xs hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        Privacy
                    </Link>
                    <Link
                        href="#"
                        className="text-xs hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        Terms of Service
                    </Link>
                </nav>
            </footer>
        </div>
    );
}
