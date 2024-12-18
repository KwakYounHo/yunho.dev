import { API_SERVER_URL } from "@/utils/apiServer";
import { SongResponse, ResponseError } from "@/types/externalAPI";
import { Song } from "@/types/songs";

export const GET = async () => {
  try {
    const response = await fetch(`${API_SERVER_URL}/lyrics`);
    if (!response.ok) {
      throw new ResponseError(
        "FetchError",
        "Failed to fetch lyrics",
        response.status
      );
    }
    const responseData: SongResponse<Song[]> = await response.json();
    if ("data" in responseData) {
      return Response.json(
        { data: responseData.data },
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    const err: ResponseError =
      error instanceof ResponseError
        ? error
        : new ResponseError("InternalServerError", String(error), 500);
    console.error(err);
    return Response.json({ error: err.message }, { status: err.cause });
  }
};

export const POST = async (request: Request) => {
  const data = await request.json();
  try {
    const response = await fetch(`${API_SERVER_URL}/lyrics`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new ResponseError(
        "FetchError",
        "Failed to fetch lyrics",
        response.status
      );
    }
    const responseData: SongResponse<Song[]> = await response.json();
    if ("data" in responseData) {
      return Response.json(
        { data: responseData.data },
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    const err: ResponseError =
      error instanceof ResponseError
        ? error
        : new ResponseError("InternalServerError", String(error), 500);
    console.error(err);
    return Response.json({ error: err.message }, { status: err.cause });
  }
};
