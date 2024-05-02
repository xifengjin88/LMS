"use client";

import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { CirclePlus, ImageIcon } from "lucide-react";

import { ImageValueType } from "../../schema";

import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/file-upload";
import { updateCourseImage } from "../aciton";
import toast from "react-hot-toast";

type ImageFormProp = {
  courseId: string;
  course: {
    imageUrl: string | null;
  };
};

export default function ImageForm({ course, courseId }: ImageFormProp) {
  const [isEditing, setIsEditing] = useState(false);
  const { imageUrl } = course;

  const router = useRouter();

  const handleEditToggle = () => setIsEditing((isEditing) => !isEditing);

  const onSubmit = async (values: ImageValueType) => {
    const { status, error } = await updateCourseImage(courseId, values);
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
        Course Image
        <Button variant="ghost" onClick={handleEditToggle}>
          {isEditing ? (
            "Cancel"
          ) : imageUrl === null ? (
            <>
              <CirclePlus className="w-4 h-4 mr-2" />
              Add Image
            </>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit Image
            </>
          )}
        </Button>
      </div>
      <div>
        {isEditing ? (
          <div>
            <FileUpload
              endpoint="courseImageUploader"
              onChange={(url) => {
                if (url) {
                  onSubmit({ imageUrl: url });
                }
              }}
            />
            <div className="text-xs text-muted-forground mt-4">
              16:9 aspect ratio recommended
            </div>
          </div>
        ) : imageUrl === null ? (
          <div className="h-60 flex justify-center items-center bg-slate-200 rounded-md">
            <ImageIcon className="w-10 h-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              src={imageUrl}
              alt="course image"
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}
