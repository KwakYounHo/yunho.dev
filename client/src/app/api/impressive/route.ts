import { NextRequest } from "next/server";
import { API_SERVER_URL } from "@/utils/apiServer";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  try {
    const response = await fetch(`${API_SERVER_URL}/impressive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.status < 400) {
      const res = await response.json();
      return Response.json(res, { status: 201 });
    } else {
      throw new Error("Failed to fetch data - (Impressive)");
    }
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch data - (Impressive)" },
      { status: 500 }
    );
  }
};
