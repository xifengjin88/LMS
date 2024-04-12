import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Courses() {
  return (
    <div>
      <Link href="/teacher/courses/create">
        <Button>Create a course</Button>
      </Link>
    </div>
  );
}
