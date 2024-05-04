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
import { priceSchema, PriceValueType } from "../../schema";
import { updateCourse, updateCourseDescription } from "../aciton";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

type PriceFormProps = {
  courseId: string;
  course: Pick<Course, "title" | "categoryId" | "description" | "price">;
};

export default function PriceForm({ course, courseId }: PriceFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const form = useForm<PriceValueType>({
    resolver: zodResolver(priceSchema),
    defaultValues: {
      price: course.price ?? 0,
    },
  });

  const handleEditToggle = () => setIsEditing((isEditing) => !isEditing);
  const price = form.watch("price");

  const onSubmit = async (values: PriceValueType) => {
    const { status } = await updateCourse(values, courseId);
    if (status === "success") {
      toast.success("successfully updated description!");
      router.refresh();
      handleEditToggle();
    } else {
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
              Edit Price
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
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} step="0.01" />
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
            {course.price === null ? "No price" : formatCurrency(course.price)}
          </p>
        )}
      </div>
    </div>
  );
}
