"use client";

import { type FieldValues, useForm } from "react-hook-form";
import dynamic from "next/dynamic";

import { type EditorProps } from "@/utils/mark-down/MarkDown";

// ui components
import RequestConfirm from "@/utils/mark-down/modals/RequestConfirm";
import { Input } from "@/components/ui/input";

const Editor = dynamic<EditorProps<FormInput>>(() =>
  import("@/utils/mark-down/MarkDown").then((mod) => mod.Editor)
);

interface FormInput extends FieldValues {
  title: string;
  markdown: string;
}

const PostCreateForm = () => {
  const { register, handleSubmit, control } = useForm<FormInput>();

  const submit = (data: FormInput) => {
    // ! 추후 Database API 와 연동 필요
    data.now = Date.now();
    console.log(data);
  };

  return (
    <form className={"flex flex-col gap-4"}>
      <Input
        id="title"
        type="text"
        placeholder="제목을 입력해 주세요"
        {...register("title")}
      />
      <Editor height={660} control={control} name="markdown" />
      <RequestConfirm onConfirm={handleSubmit(submit)} />
    </form>
  );
};
export default PostCreateForm;
