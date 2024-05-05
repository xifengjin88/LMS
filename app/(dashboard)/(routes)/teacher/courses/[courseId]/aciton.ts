"use server";

import { prisma } from "@/lib/server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  DescriptionValueType,
  TitleValueType,
  descriptionSchema,
  imageSchema,
  titleSchema,
} from "../schema";
import { Course } from "@prisma/client";

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

export async function updateCourseImage(
  courseId: string,
  values: {
    imageUrl: string;
  }
) {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const result = imageSchema.safeParse(values);

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

export async function updateCourse<T extends keyof Course>(
  values: Pick<Course, T>,
  courseId: string
) {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
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

export async function createAttachment({
  url,
  courseId,
}: {
  url: string;
  courseId: string;
}) {
  const name = url.split("/").pop() ?? "";

  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  try {
    await prisma.attachment.create({
      data: {
        courseId,
        name,
        url,
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

export async function deleteAttachment({ id }: { id: string }) {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  try {
    await prisma.attachment.delete({
      where: {
        id,
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
