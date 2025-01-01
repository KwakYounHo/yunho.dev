import { FirstImpression } from "./FistImpression";
import styles from "./LeftBox.module.css";

const LeftBox = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <div className={`${styles.homeParagraph} w-full`}>
        <h2>Hello</h2>
        <h2>World :D</h2>

        <FirstImpression
          className="w-full h-16 p-8"
          placeholder="What was your first impression of me?"
        />
      </div>
    </div>
  );
};

export default LeftBox;
