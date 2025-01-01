import AlbumCover from "./components/AlbumCover";
import HamburgerModal from "./components/HamburgerModal";
import LyricsList from "./components/LyricsList";
import LyricsDetail from "./components/LyricsDetail";

const Lyrics = () => {
  return (
    <main>
      <AlbumCover />
      <div className="container flex flex-col">
        <div className="flex justify-center items-center font-black text-4xl h-[10dvh]">
          <h2>Lyrics</h2>
        </div>
        <LyricsDetail />
        <div className="absolute top-[10dvh] left-10 xl:block hidden">
          <LyricsList />
        </div>
      </div>
      <div className="fixed top-4 left-4 z-50">
        <HamburgerModal />
      </div>
    </main>
  );
};

export default Lyrics;
