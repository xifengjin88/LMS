"use client";

import { getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createCourse, courseSchema } from "../action";

export default function CourseCreationPage() {
  const [lastResult, action] = useFormState(createCourse, undefined);
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: courseSchema });
    },
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
      <div className="max-w-5xl mx-auto h-full p-6 md:items-center md:justify-center">
        <div className="my-4">
          <h1 className="text-2xl">Name your course</h1>
          <p className="text-slate-600 text-sm">
            What would you like to name your course?
          </p>
          <div>
            <Label htmlFor={fields.title.id}>Course title</Label>
            <Input {...getInputProps(fields.title, { type: "text" })} />
            {fields.title.errors && (
              <p className="mt-2 text-sm text-red-600" id="email-error">
                {fields.title.errors}.
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <Button type="submit">Create</Button>
        </div>
      </div>
    </form>
  );
}
