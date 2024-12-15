import { GetHelloResponse } from "@/types/externalAPI";
import { API_SERVER_URL } from "@/utils/apiServer";

const TransPortationTest = async () => {
  const response = await fetch(`${API_SERVER_URL}/`);
  if (response.status >= 400) {
    return <div>Error</div>;
  }
  const data: GetHelloResponse = await response.json();

  return <div>{data.message}</div>;
};
export default TransPortationTest;
