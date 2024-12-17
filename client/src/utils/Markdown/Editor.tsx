"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { Viewer } from "@/utils/Markdown";

import { Textarea } from "@/components/ui/textarea";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const commonClass = "min-h-[50vh] bg-background/80";

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 items-center justify-center">
      <Textarea
        value={value}
        onChange={handleInputChange}
        className={cn(commonClass)}
      />
      <Viewer value={value} className={commonClass} />
    </div>
  );
};

export default MarkdownEditor;
