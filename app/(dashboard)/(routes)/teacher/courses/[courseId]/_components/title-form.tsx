"use client";

import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { CourseValueType, courseSchema } from "../../schema";
import { updateCourse } from "../aciton";
import { useRouter } from "next/navigation";

type TitleFormProp = {
  courseId: string;
  course: Pick<Course, "title" | "categoryId" | "description" | "price">;
};

export default function TitleForm({ course, courseId }: TitleFormProp) {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const form = useForm<CourseValueType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: course.title,
    },
  });

  const handleEditToggle = () => setIsEditing((isEditing) => !isEditing);
  const courseTitle = form.watch("title");

  const onSubmit = async (values: CourseValueType) => {
    const { status, error } = await updateCourse(courseId, values);
    if (status === "success") {
      toast.success("successfully updated!");
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
        Course Title
        <Button variant="ghost" onClick={handleEditToggle}>
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit Title
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Some course name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the title of your course
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save</Button>
            </form>
          </Form>
        ) : (
          <p className="text-sm mt-2">{courseTitle}</p>
        )}
      </div>
    </div>
  );
}
