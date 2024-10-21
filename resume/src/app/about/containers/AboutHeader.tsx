import Image from "next/image";

const AboutHeader = () => {
  return (
    <>
      <Image
        src="https://www.gravatar.com/avatar/e3d305ca3dd159da2aeb67c8994cea36?s=400"
        width={220}
        height={220}
        className={"rounded-full"}
        alt="YunHo Kwak"
      />
      <div className={"flex flex-col items-center"}>
        <h2 className={"font-bold text-4xl"}>곽윤호</h2>
        <span className={"text-sm text-foreground/50"}>YunHo Kwak / Juno</span>
        <span className={"text-sm text-foreground/50"}>
          Motto : Anxiety arises from ignorance
        </span>
      </div>
    </>
  );
};

export default AboutHeader;
