"use client";

import { FC, ChangeEvent, useState, Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputProps {
  placeholder?: string;
  className?: string;
}

export const useMotto = (): [string, Dispatch<SetStateAction<string>>] => {
  const [motto, setMotto] = useState<string>("");
  return [motto, setMotto];
};

const FirstImpression: FC<InputProps> = ({ placeholder, className }) => {
  const [motto, setMotto] = useMotto();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMotto(e.target.value);
  };

  return (
    <Input
      value={motto}
      onChange={handleChange}
      placeholder={placeholder}
      className={cn(
        "w-full px-4 py-2 rounded-xl border border-foreground/20 bg-background/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-foreground/50 transition-all duration-300",
        className
      )}
    />
  );
};

export { FirstImpression };
