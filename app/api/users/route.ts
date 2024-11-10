import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch(`${process.env.USERSAPI_URL}/api/v1/Users`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}