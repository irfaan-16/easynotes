"use client";

import { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

export default function Component() {
    const [file, setFile] = useState<Blob | null>(null);
    const [course, setCourse] = useState("");
    const [year, setYear] = useState("");
    const [subject, setSubject] = useState("");
    const [semester, setSemester] = useState("");
    const [description, setDescription] = useState("");
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState(1);
    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
        console.log(e.target.files[0]);
        const reader = new FileReader();

        if (file) {
            reader.readAsArrayBuffer(file);
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
                                        accept=".pdf"
                                    />
                                </div>
                            </div>
                            {file && (
                                <div>
                                    <button
                                        onClick={() =>
                                            setPageNumber((prev) => prev + 1)
                                        }
                                        type="button"
                                    >
                                        next
                                    </button>
                                    <Document
                                        file={file}
                                        onLoadSuccess={({ numPages }) =>
                                            setNumPages(numPages)
                                        }
                                    >
                                        <Page
                                            pageNumber={pageNumber}
                                            renderTextLayer={false}
                                            renderAnnotationLayer={false}
                                        />
                                    </Document>
                                    <p>
                                        Page {pageNumber} of {numPages}
                                    </p>
                                </div>
                            )}
                            <Button type="submit" className="w-full">
                                Upload
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
