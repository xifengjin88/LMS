import * as z from "zod";

export const titleSchema = z.object({
  title: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string({ required_error: "Course title is required" })
  ),
});

export const descriptionSchema = z.object({
  description: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string({ required_error: "Course description is required" })
  ),
});

export type TitleValueType = z.infer<typeof titleSchema>;
export type DescriptionValueType = z.infer<typeof descriptionSchema>;
