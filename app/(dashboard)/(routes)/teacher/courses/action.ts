import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";

export const courseSchema = z.object({
  title: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string({ required_error: "Course title is required" })
  ),
});

export async function createCourse(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: courseSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  redirect("/teacher/courses");
}
