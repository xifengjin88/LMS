"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { auth } from "@clerk/nextjs/server";

import { z } from "zod";
import { prisma } from "@/lib/server";
import { courseSchema } from "./create/schema";

export async function createCourse(prevState: unknown, formData: FormData) {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }
  const submission = parseWithZod(formData, {
    schema: courseSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  let course = null;

  try {
    course = await prisma.course.create({
      data: {
        userId: userId,
        title: submission.value.title,
      },
    });
  } catch (error) {
    console.error("something went wrong");
    return submission.reply({
      formErrors: ["Something went wrong while creating the form"],
    });
  }
  redirect(`/teacher/courses/${course.id}`);
}
