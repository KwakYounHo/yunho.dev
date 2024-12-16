import GridItem from "./component/GridItem";
import LyricsList from "./component/lyricsList";
import Video from "./component/Video";
import Contents from "./component/Contents";

const Lyrics = () => {
  return (
    <>
      <main>
        <Video src="4594922-uhd_4096_2160_25fps.mp4" />
        <div className="container flex flex-col gap-4">
          <div>
            <h2>Lyrics</h2>
          </div>
          <div className="grid grid-cols-[0.3fr_0.7fr] gap-4">
            <GridItem>
              <LyricsList
                id="1q2w3e4r"
                image="https://images.genius.com/48caff7f3cd18b4f4e9b2db1baf3d576.1000x1000x1.png"
                title="Someone Like You"
                artist="Adele"
              />
              <LyricsList
                id="qwerasdf"
                image="https://images.genius.com/29f15eb96f814e785598d0eea14126a7.1000x1000x1.png"
                title="A Million Dreams"
                artist="Ziv Zaifman, Hugh Jackman & Michelle Williams"
              />
            </GridItem>
            <GridItem>
              <Contents />
            </GridItem>
          </div>
        </div>
      </main>
    </>
  );
};

export default Lyrics;
