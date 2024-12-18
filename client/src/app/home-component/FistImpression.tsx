"use client";

import { FC, ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { useAppDispatch } from "@/app/hooks/state";
import { setImpressive } from "@/utils/state/impressive";

import { Button } from "@/components/ui/button";

interface InputProps {
  placeholder?: string;
  className?: string;
}

const FirstImpression: FC<InputProps> = ({ placeholder, className }) => {
  const dispatch = useAppDispatch();
  const [motto, setMotto] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMotto(e.target.value);
  };

  const handleSubmit = async () => {
    const response = await fetch("/api/impressive", {
      method: "POST",
      body: JSON.stringify({ text: motto }),
    });
    if (response.status >= 400) {
      setMotto("");
      return;
    }
    const res = await response.json();
    if (res.data === "done") {
      dispatch(setImpressive({ text: motto }));
      setMotto("");
      return;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Input
        value={motto}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          "w-full px-4 py-2 rounded-xl border border-foreground/20 bg-background/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-foreground/50 transition-all duration-300",
          className
        )}
      />
      <Button
        variant="default"
        className="text-background"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export { FirstImpression };
