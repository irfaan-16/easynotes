import Link from "next/link";

const page = () => {
  return (
    <main className="w-full h-landing flex flex-col gap-14 py-10 items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            Share and Discover <span className="text-green-500">Notes</span>
          </h1>
          <p className="max-w-[720px] text-muted-foreground md:text-xl">
            Easily share your class notes with other students and discover new
            resources to enhance your learning.
          </p>

          <div className="flex justify-center gap-2">
            <Link
              href="/upload"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={true}
            >
              Share Notes
            </Link>
            <Link
              href="/feed"
              className="inline-flex h-10 items-center justify-center rounded-md bg-secondary px-8 text-sm font-medium text-secondary-foreground shadow "
              prefetch={false}
            >
              Discover Notes
            </Link>
          </div>
        </div>
      </div>

      {/* <section className="w-full">
                <div className="container px-4 md:px-6 space-y-6 ">
                    <div className="text-center">
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold tracking-tighter sm:text-4xl">
                                Simplified Note Sharing
                            </h2>
                            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed m-auto">
                                Our platform makes it easy for students to share
                                their class notes and discover new resources to
                                enhance their learning.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-around gap-6  w-full">
                        <div className="space-y-2 bg-secondary shadow  rounded-lg p-3 max-w-80">
                            <h3 className="text-xl font-bold">
                                Seamless Sharing
                            </h3>
                            <p className="text-muted-foreground">
                                Upload your notes with a few clicks and share
                                them with your classmates.
                            </p>
                        </div>
                        <div className="space-y-2 bg-secondary shadow  rounded-lg p-3 max-w-80">
                            <h3 className="text-xl font-bold">
                                Discover New Resources
                            </h3>
                            <p className="text-muted-foreground">
                                Browse through a library of shared notes to find
                                new perspectives and insights.
                            </p>
                        </div>
                        <div className="space-y-2 bg-secondary shadow  rounded-lg p-3 max-w-80">
                            <h3 className="text-xl font-bold">
                                Collaborative Learning
                            </h3>
                            <p className="text-muted-foreground">
                                Engage with your peers by commenting and
                                providing feedback on shared notes.
                            </p>
                        </div>
                    </div>
                </div>
            </section> */}
    </main>
  );
};

export default page;
