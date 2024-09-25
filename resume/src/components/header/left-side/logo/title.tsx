import { Inconsolata } from "next/font/google";
import Link from "next/link";

const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["500", "900"],
  style: ["normal"],
});

const Title = () => {
  return (
    <Link href="/">
      <h1
        className={`uppercase text-xl ${inconsolata.className} font-bold tracking-tight`}
      >
        yunho kwak
      </h1>
    </Link>
  );
};

export default Title;
