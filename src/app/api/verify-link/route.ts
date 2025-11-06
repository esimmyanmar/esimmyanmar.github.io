import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter required' }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'eSIM Myanmar Link Checker/1.0'
      }
    });

    return NextResponse.json({
      url,
      status: response.status,
      ok: response.ok,
      statusText: response.statusText
    });
  } catch (error) {
    return NextResponse.json({
      url,
      status: 0,
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}