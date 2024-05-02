import * as z from "zod";

export const courseSchema = z.object({
  title: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string({ required_error: "Course title is required" })
  ),
});

export type CourseValueType = z.infer<typeof courseSchema>;
