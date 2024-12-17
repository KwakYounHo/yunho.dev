import AlbumCover from "./component/AlbumCover";
import GridWrapper from "./component/GridWrapper";
import HamburgerModal from "./component/HamburgerModal";

const Lyrics = () => {
  return (
    <main>
      <AlbumCover />
      <div className="container flex flex-col gap-4">
        <div>
          <div className="flex items-center">
            <h2>Lyrics</h2>
            <HamburgerModal />
          </div>
        </div>
        <GridWrapper />
      </div>
    </main>
  );
};

export default Lyrics;
