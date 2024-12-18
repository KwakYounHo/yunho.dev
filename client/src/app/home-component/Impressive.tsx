"use client";

import { useAppSelector } from "@/app/hooks/state";

const Impressive = () => {
  const impressive = useAppSelector((state) => state.impressive);
  return (
    <p className="xl:text-lg text-sm text-foreground/80 dark:text-muted-foreground">
      {impressive.text}
    </p>
  );
};

export default Impressive;
