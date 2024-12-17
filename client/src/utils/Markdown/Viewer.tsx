"use client";

import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

import styles from "./Editor.module.css";

const MarkdownViewer = ({
  value,
  className,
}: {
  value: string;
  className?: string;
}) => {
  return (
    <ReactMarkdown
      className={cn(
        "lg:col-span-1 col-span-2 w-full ",
        styles.wrapper,
        className
      )}
    >
      {value}
    </ReactMarkdown>
  );
};

export default MarkdownViewer;
