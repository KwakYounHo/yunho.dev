"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";

const GoHome = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Button
      onClick={() => router.push("/")}
      variant="outline"
      size="icon"
      disabled={pathname === "/"}
    >
      <House className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
};

export default GoHome;
