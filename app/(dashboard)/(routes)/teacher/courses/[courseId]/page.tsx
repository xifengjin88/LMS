import { prisma } from "@/lib/server";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

async function getCourse({ courseId }: { courseId: string }) {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  try {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      select: {
        categoryId: true,
        title: true,
        description: true,
        image: true,
        price: true,
      },
    });
    return { data: course, status: "success" };
  } catch (error) {
    console.error(error);
    throw new Error("something happened while getting course");
  }
}

export default async function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const { data: course } = await getCourse({ courseId: params.courseId });
  if (!course) {
    notFound();
  }

  const requiredFields = [
    course.title,
    course.description,
    course.categoryId,
    course.image,
    course.price,
  ];
  const completedFields = requiredFields.filter(Boolean);

  const completedText = `Complete all fields (${completedFields.length}/${requiredFields.length})`;

  return (
    <div>
      <h1 className="text-xl font-medium text-gray-800">Course setup</h1>
      <span className="text-sm text-gray-400">{completedText}</span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="flex items-center">
          <LayoutDashboard className="w-6 h-6 mr-2 bg-green-50" />
          Customize your course
        </div>
      </div>
    </div>
  );
}
