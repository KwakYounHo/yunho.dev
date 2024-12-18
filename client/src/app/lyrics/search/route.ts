import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("q");
  try {
    const abort = new AbortController();
    const response = await fetch(`https://api.genius.com/search?q=${keyword}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GENIUS_API_KEY}`,
      },
      signal: abort.signal,
    });
    const timeoutId = setTimeout(() => {
      abort.abort();
    }, 30000);
    if (!response.ok) {
      throw new Error("Failed to fetch lyrics");
    }
    const data = await response.json();
    clearTimeout(timeoutId);
    return Response.json(data.response.hits, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof DOMException) {
      console.error(error);
      return Response.json({ error: "Request timed out" }, { status: 408 });
    }
    console.error(error);
    return Response.json({ error: "Failed to fetch lyrics" }, { status: 500 });
  }
};
