import { prisma } from "@/lib/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";
import CategoryFrom from "./_components/category-form";

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
        imageUrl: true,
        price: true,
      },
    });
    const categories = await prisma.category.findMany({
      select: {
        courses: true,
        id: true,
        name: true,
      },
    });
    return { course, status: "success", categories };
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
  const { course, categories } = await getCourse({ courseId: params.courseId });
  if (!course) {
    notFound();
  }

  const requiredFields = [
    course.title,
    course.description,
    course.categoryId,
    course.imageUrl,
    course.price,
  ];
  const completedFields = requiredFields.filter(Boolean);

  const completedText = `Complete all fields (${completedFields.length}/${requiredFields.length})`;

  return (
    <div>
      <h1 className="text-xl font-medium text-gray-800">Course setup</h1>
      <span className="text-sm text-gray-400">{completedText}</span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <div className="flex items-center">
            <LayoutDashboard className="w-6 h-6 mr-2 bg-green-50" />
            <h1 className="text-xl">Customize your course</h1>
          </div>
          <TitleForm courseId={params.courseId} course={course} />
          <DescriptionForm courseId={params.courseId} course={course} />
          <ImageForm courseId={params.courseId} course={course} />
          <CategoryFrom
            categories={categories}
            courseId={params.courseId}
            course={course}
          />
        </div>
      </div>
    </div>
  );
}
