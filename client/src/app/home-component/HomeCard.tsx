import Gravatar from "./Gravata";
import Link from "next/link";
import Impressive from "./Impressive";
const HomeCard = () => {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      {/* <Link href="/lyrics"> */}
      <Gravatar
        size={400}
        className="md:w-52 md:h-52 lg:w-72 lg:h-72 w-48 h-48 hover:scale-105 transition-all duration-300 shadow-xl shadow-foreground/20"
      />
      {/* </Link> */}
      <div className="flex flex-col items-center text-center gap-2">
        <div>
          <h1 className="xl:text-6xl text-4xl font-bold">Juno</h1>
          <p className="xl:text-lg text-md text-foreground/80 dark:text-muted-foreground">
            Software Developer
          </p>
        </div>
        <Impressive />
      </div>
    </div>
  );
};

export default HomeCard;
