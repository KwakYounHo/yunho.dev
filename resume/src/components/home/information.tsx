const Information = () => {
  return (
    <div className={"flex flex-col justify-end max-w-xl"}>
      <div className={"mb-4"}>
        <h2 className={"text-4xl font-bold"}>곽윤호</h2>
        <div className={"flex gap-2 text-foreground/50 text-sm"}>
          <span>YunHo Kwak</span>
          <span>/</span>
          <span>Juno</span>
        </div>
      </div>
      <div className={"flex flex-col gap-2"}>
        <p>
          능력 부족으로 원하는 일을 하지 못하는 상황이 생기지 않도록, <br />
          스스로를 지속적으로 성장시키는 것을 목표로 하고 있습니다.
        </p>
      </div>
    </div>
  );
};

export default Information;
