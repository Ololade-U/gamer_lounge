import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: process.env.RAWG_API_KEY,
  },
  headers: {
    'User-Agent': 'MyVideoGameApp'
  }
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const response = await apiClient.get('/games', {
      params: {
        ...Object.fromEntries(searchParams),
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json({ error: 'Failed to fetch games' }, { status: 500 });
  }
}