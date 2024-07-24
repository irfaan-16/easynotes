import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function Component({
  subject,
  desc,
  avatar,
  name,
  course,
  id,
}: {
  subject: string;
  desc: string;
  avatar: string;
  name: string;
  course: string;
  id: string;
}) {
  return (
    <Link href={`notes/${id}`}>
      <Card className="w-full max-w-sm cursor-pointer">
        <CardHeader className="bg-primary rounded-t-lg p-3 text-primary-foreground relative">
          <h2 className="text-xl font-bold">{course}</h2>

          {/* <div className="absolute right-2 -top-1 h-10 bg-red-600 w-10 rounded-full">
          s
        </div> */}
        </CardHeader>
        <CardContent className="p-4 grid gap-4">
          <div>
            <h3 className="text-xl font-semibold border-b-2 pb-3">{subject}</h3>
            <p className="text-muted-foreground mt-2">{desc}</p>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-[rgba(0,0,0,0.12)] rounded-md dark:bg-white/10">
            <Avatar>
              <AvatarImage src={avatar} />
            </Avatar>
            <div>
              <div className="font-medium">{name}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
