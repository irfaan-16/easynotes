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
            <h3 className="text-xl font-semibold">{subject}</h3>
            <p className="text-muted-foreground">{desc}</p>
          </div>
          <div className="flex items-center gap-4">
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
