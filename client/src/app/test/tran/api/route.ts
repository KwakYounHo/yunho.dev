import { API_SERVER_URL } from "@/utils/apiServer";

export const GET = async () => {
  try {
    const response = await fetch(`${API_SERVER_URL}/`);
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
