import BackgroundImage from "./home-component/BackgroundImage";
import HomeCard from "./home-component/HomeCard";
import LeftBox from "./home-component/LeftBox";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juno",
  description: "Juno's playground",
};

const Home = () => {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="container flex flex-col items-center justify-center">
        <div className="w-10/12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-items-center">
            <LeftBox />
            <HomeCard />
          </div>

          {/* absolute */}
          <BackgroundImage />
        </div>
      </div>
    </main>
  );
};
export default Home;
