"use server";

import { prisma } from "@/lib/server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  DescriptionValueType,
  TitleValueType,
  descriptionSchema,
  titleSchema,
} from "../schema";

export async function updateCourseTitle(
  courseId: string,
  values: TitleValueType
) {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const result = titleSchema.safeParse(values);

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

export async function updateCourseDescription(
  courseId: string,
  values: DescriptionValueType
) {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const result = descriptionSchema.safeParse(values);

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
