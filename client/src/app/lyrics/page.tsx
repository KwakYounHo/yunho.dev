import AlbumCover from "./component/AlbumCover";
import GridWrapper from "./component/GridWrapper";
import HamburgerModal from "./component/HamburgerModal";

const Lyrics = () => {
  return (
    <main>
      <AlbumCover />
      <div className="container flex flex-col gap-4">
        <div className="flex flex-col gap-6">
          <div className="flex items-center">
            <h2>Lyrics</h2>
          </div>
        </div>
        <GridWrapper />
      </div>
      <div className="fixed top-4 left-4 z-50">
        <HamburgerModal />
      </div>
    </main>
  );
};

export default Lyrics;
