import { prisma } from "@/lib/server";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { LayoutDashboard, ListChecks, DollarSign, File } from "lucide-react";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";
import CategoryFrom from "./_components/category-form";
import PriceForm from "./_components/price-form";
import AttachmentForm from "./_components/attachment-form";
import ChapterForm from "./_components/chapter-form";

async function getCourse({ courseId }: { courseId: string }) {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  try {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        attachments: {
          orderBy: {
            createdAt: "asc", // or 'asc' for ascending order
          },
        },
        chapters: {
          orderBy: {
            createdAt: "asc",
          },
        },
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
    return { status: "error", message: "something went wrong" };
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

  console.log(course.chapters);

  const requiredFields = [
    course.title,
    course.description,
    course.categoryId,
    course.imageUrl,
    course.price,
    course.chapters.filter(({ isPublished }) => isPublished).length > 0,
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
            <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
              <LayoutDashboard className="w-6 h-6" />
            </div>

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
        <div>
          <div className="flex items-center">
            <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
              <ListChecks className="w-6 h-6" />
            </div>

            <h1 className="text-xl">Course Chapter</h1>
          </div>
          <div>
            <ChapterForm course={course} courseId={params.courseId} />
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                <DollarSign className="w-6 h-6" />
              </div>

              <h1 className="text-xl">Sell your course</h1>
            </div>
            <div>
              <PriceForm course={course} courseId={params.courseId} />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                <File className="w-6 h-6" />
              </div>

              <h1 className="text-xl">Resources & Attachments</h1>
            </div>
            <div>
              <AttachmentForm data={course} courseId={params.courseId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
