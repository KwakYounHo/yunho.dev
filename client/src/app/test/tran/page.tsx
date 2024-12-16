"use client";

import { useState } from "react";

const TranTestPage = () => {
  const [result, setResult] = useState<string>("");
  const handleTest = async () => {
    const response = await fetch("/test/tran/api/");
    const data = await response.json();
    setResult(data.message);
  };

  return (
    <main>
      <div>
        <button onClick={handleTest}>테스트 하기</button>
        <p>테스트 결과 : {result}</p>
        <p>Actions 빌드 에러 확인용</p>
      </div>
    </main>
  );
};

export default TranTestPage;
