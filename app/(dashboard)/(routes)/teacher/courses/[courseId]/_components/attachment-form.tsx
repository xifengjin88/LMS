"use client";

import { Button } from "@/components/ui/button";
import { Attachment, Course } from "@prisma/client";
import { File, Loader2, Pencil, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { CirclePlus, ImageIcon } from "lucide-react";

import { AttachmentValueType, ImageValueType } from "../../schema";

import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/file-upload";
import {
  createAttachment,
  deleteAttachment,
  updateCourseImage,
} from "../aciton";
import toast from "react-hot-toast";

type AttachmentFormProp = {
  courseId: string;
  data: Course & {
    attachments: Attachment[];
  };
};

export default function AttachmentForm({ data, courseId }: AttachmentFormProp) {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const attachments = data.attachments;

  const router = useRouter();

  const handleEditToggle = () => setIsEditing((isEditing) => !isEditing);

  const onSubmit = async (values: AttachmentValueType) => {
    const { status } = await createAttachment({ url: values.url, courseId });
    if (status === "success") {
      toast.success("successfully updated!");
      router.refresh();
      handleEditToggle();
    } else {
      toast.error("Update unsuccessful, please try again later!");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      const { status } = await deleteAttachment({ id });
      if (status === "success") {
        toast.success("Attachment deleted!");
        router.refresh();
      } else {
        throw new Error("something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something was wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachments
        <Button variant="ghost" onClick={handleEditToggle}>
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <CirclePlus className="w-4 h-4 mr-2" />
              Add Attachment
            </>
          )}
        </Button>
      </div>
      <div>
        {isEditing ? (
          <div>
            <FileUpload
              endpoint="courseAttachment"
              onChange={(url) => {
                if (url) {
                  onSubmit({ url });
                }
              }}
            />
            <div className="text-xs text-muted-forground mt-4">
              Add anothing your student might need to complete the course
            </div>
          </div>
        ) : attachments.length === 0 ? (
          "No attachment"
        ) : (
          <div className="relative aspect-video mt-2">
            <div className="space-y-2">
              {attachments.map(({ name, id }) => (
                <div
                  key={id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 rounded-md border text-sky-700"
                >
                  <File className="w-4 h-4 mr-2" />
                  <p className="text-sm line-clamp-1">{name}</p>
                  {deletingId === id && <Loader2 className="w-4 h-4 mr-2" />}
                  {deletingId === null && (
                    <button onClick={() => onDelete(id)}>
                      <X className="w-4 h-4 mr-2" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
