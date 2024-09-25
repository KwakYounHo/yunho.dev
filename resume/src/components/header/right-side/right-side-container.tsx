import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

// components
import ModeToggle from "./theme/theme-toggle";

// ui components
import { Button } from "@/components/ui/button";

const RightSideContainer = () => {
  return (
    <div>
      <Button variant="ghost" asChild>
        <Link href="https://github.com/KwakYounHo" target="_blank">
          <GitHubLogoIcon className={"w-[1.2rem] h-[1.2rem]"} />
        </Link>
      </Button>
      <ModeToggle />
    </div>
  );
};

export default RightSideContainer;
