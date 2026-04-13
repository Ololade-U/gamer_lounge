import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';


const apiClient = axios.create({
  baseURL: 'https://api.rawg.io',
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
    const response = await apiClient.get('/api/platforms', {
      params: {
        ...Object.fromEntries(searchParams),
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching platforms:', error);
    return NextResponse.json({ error: 'Failed to fetch platforms' }, { status: 500 });
  }
}