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
    return Response.json(
      { data: responseData },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    const err: ResponseError =
      error instanceof ResponseError
        ? error
        : new ResponseError("InternalServerError", String(error), 500);
    console.error(err);
    return Response.json({ error: err.message }, { status: err.cause });
  }
};
