"use client";

import { Button } from "@/components/ui/button";
import { Chapter, Course } from "@prisma/client";
import { Pencil, PlusCircle } from "lucide-react";
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

import { useForm } from "react-hook-form";
import { chapterSchema, ChapterValueType } from "../../schema";
import { createChapter } from "../aciton";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

type ChapterFormProps = {
  courseId: string;
  course: Course & { chapters: Chapter[] };
};

export default function ChapterForm({ course, courseId }: ChapterFormProps) {
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const form = useForm<ChapterValueType>({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      title: "",
    },
  });

  const handleCreateToggle = () => setIsCreating((isCreating) => !isCreating);

  const onSubmit = async (values: ChapterValueType) => {
    const { status } = await createChapter({ title: values.title, courseId });
    if (status === "success") {
      toast.success("successfully created chapter!");
      form.reset();
      router.refresh();

      handleCreateToggle();
    } else {
      toast.error("Update unsuccessful, please try again later!");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Chapters
        <Button variant="ghost" onClick={handleCreateToggle}>
          {isCreating ? (
            "Cancel"
          ) : (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              add a chapter
            </>
          )}
        </Button>
      </div>
      <div>
        {isCreating ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create</Button>
            </form>
          </Form>
        ) : (
          <div>
            {course.chapters.length === 0 ? (
              <div>
                <span className="text-xs text-slate-500 italic">
                  No Chapter
                </span>
                <p className="text-xs text-muted-foreground mt-4">
                  Drag and Drop the courses
                </p>
              </div>
            ) : (
              <div>Chapters</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
