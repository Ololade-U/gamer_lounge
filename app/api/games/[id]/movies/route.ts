import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.rawg.io",
  params: {
    key: process.env.RAWG_API_KEY,
  },
  headers: {
    "User-Agent": "MyVideoGameApp",
  },
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const response = await apiClient.get(`/api/games/${id}/movies`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching trailers:", error);
    return NextResponse.json(
      { error: "Failed to fetch trailers" },
      { status: 500 },
    );
  }
}
