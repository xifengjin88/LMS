import * as z from "zod";

export const titleSchema = z.object({
  title: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string({ required_error: "Course title is required" })
  ),
});

export const categorySchema = z.object({
  categoryId: z.preprocess(
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

export const imageSchema = z.object({
  imageUrl: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string({ required_error: "Image url is required" })
  ),
});

export type TitleValueType = z.infer<typeof titleSchema>;
export type DescriptionValueType = z.infer<typeof descriptionSchema>;
export type ImageValueType = z.infer<typeof imageSchema>;
export type CategoryValueType = z.infer<typeof categorySchema>;
