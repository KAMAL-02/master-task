import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '2';
  
  try {
    const response = await fetch(
      `${process.env.NEWSAPI_URL}?` + new URLSearchParams({
        country: 'us',
        language: 'en',
        page: page,
        pageSize: pageSize,
        apiKey: process.env.NEWSAPI_KEY!
      })
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch news');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}