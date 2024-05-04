"use client";

import { Button } from "@/components/ui/button";
import { Category, Course } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Combobox } from "@/components/ui/combobox";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { categorySchema, CategoryValueType } from "../../schema";
import { updateCourse } from "../aciton";
import { useRouter } from "next/navigation";

type TitleFormProp = {
  courseId: string;
  course: Pick<Course, "title" | "categoryId" | "description" | "price">;
  categories: Category[];
};

export default function CategoryFrom({
  course,
  courseId,
  categories,
}: TitleFormProp) {
  const [isEditing, setIsEditing] = useState(false);
  const [categoryValue, setCategoryValue] = useState(course.categoryId ?? "");

  const onCategoryChange = (value: string) => {
    setCategoryValue(value);
  };

  const selectedCategory = categories.find(
    ({ id }) => id === course.categoryId
  );

  const router = useRouter();

  const handleEditToggle = () => setIsEditing((isEditing) => !isEditing);

  const onSubmit = async (values: { categoryId: string }) => {
    const { status } = await updateCourse(values, courseId);

    if (status === "success") {
      toast.success("successfully updated category!");
      router.refresh();
      handleEditToggle();
    } else {
      toast.error("Update unsuccessful, please try again later!");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Category
        <Button variant="ghost" onClick={handleEditToggle}>
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit Category
            </>
          )}
        </Button>
      </div>
      <div>
        {isEditing ? (
          <div className="space-y-8">
            <Combobox
              options={categories.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
              value={categoryValue}
              onChange={onCategoryChange}
            />
            <Button
              onClick={() => {
                onSubmit({ categoryId: categoryValue });
              }}
            >
              Save
            </Button>
          </div>
        ) : (
          <p className="text-sm mt-2">
            {!selectedCategory ? "No category" : selectedCategory.name}
          </p>
        )}
      </div>
    </div>
  );
}
