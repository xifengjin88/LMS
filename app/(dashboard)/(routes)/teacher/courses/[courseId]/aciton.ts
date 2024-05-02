"use server";

import { prisma } from "@/lib/server";
import { auth } from "@clerk/nextjs/server";
import { Course } from "@prisma/client";
import { redirect } from "next/navigation";
import { CourseValueType, courseSchema } from "../schema";

export async function updateCourse(courseId: string, values: CourseValueType) {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const result = courseSchema.safeParse(values);

  if (!result.success) {
    return {
      status: "error",
      error: result.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        ...values,
      },
    });

    return {
      status: "success",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "something went wrong",
    };
  }
}
