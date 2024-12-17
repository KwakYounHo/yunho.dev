"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import LyricsList from "./LyricsList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useState } from "react";

const HamburgerModal = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className={cn("lg:hidden w-10 h-10", className)}
          variant="outline"
          onClick={toggleDropdown}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 6h-16M20 12h-16m7 6h-7"
            />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0 w-96" side="left">
        <SheetHeader>
          <SheetTitle className="my-4 flex justify-center">Lyrics</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[80vh] max-w-full">
          <LyricsList setIsOpen={setIsOpen} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerModal;
