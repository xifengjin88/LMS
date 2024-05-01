import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/server";
import { notFound } from "next/navigation";

async function getCourses() {
  const courses = await prisma.course.findMany();

  return courses;
}

export default async function Courses() {
  const courses = await getCourses();

  console.log(courses);

  return (
    <div>
      <Link href="/teacher/courses/create">
        <Button>Create a course</Button>
      </Link>
    </div>
  );
}
