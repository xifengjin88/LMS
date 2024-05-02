"use client";

import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { descriptionSchema, DescriptionValueType } from "../../schema";
import { updateCourseDescription } from "../aciton";
import { useRouter } from "next/navigation";

type TitleFormProp = {
  courseId: string;
  course: Pick<Course, "title" | "categoryId" | "description" | "price">;
};

export default function DescriptionForm({ course, courseId }: TitleFormProp) {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const form = useForm<DescriptionValueType>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      description: course.description ?? "",
    },
  });

  const handleEditToggle = () => setIsEditing((isEditing) => !isEditing);
  const description = form.watch("description");

  const onSubmit = async (values: DescriptionValueType) => {
    const { status, error } = await updateCourseDescription(courseId, values);
    if (status === "success") {
      toast.success("successfully updated description!");
      router.refresh();
      handleEditToggle();
    } else {
      console.log(error);
      toast.error("Update unsuccessful, please try again later!");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Description
        <Button variant="ghost" onClick={handleEditToggle}>
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit Description
            </>
          )}
        </Button>
      </div>
      <div>
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Some description name"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save</Button>
            </form>
          </Form>
        ) : (
          <p className="text-sm mt-2">
            {course.description === null ? "No description" : description}
          </p>
        )}
      </div>
    </div>
  );
}
