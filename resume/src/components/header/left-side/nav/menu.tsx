"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// models
import { pages } from "@/models/pages";

const Menu = () => {
  const pathname = usePathname();
  return (
    <nav className={"text-sm"}>
      {Object.entries(pages).map(([, details]) => {
        return (
          <Link
            key={details.title}
            href={details.href}
            className={`capitalize text-sm transition-colors duration-300 ease-in-out hover:text-foreground/80 ${
              pathname === details.href
                ? "text-foreground"
                : "text-foreground/50"
            }`}
          >
            {details.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default Menu;
