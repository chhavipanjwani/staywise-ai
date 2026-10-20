import { NextResponse } from 'next/server';
import { tinyFishSearch } from '@/lib/tinyfish';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const query = typeof body.query === 'string' ? body.query.trim() : '';
    const location = typeof body.location === 'string' && body.location.trim() ? body.location.trim() : 'IN';

    if (!query) {
      return NextResponse.json({ mode: 'error', results: [], message: 'A search query is required.' }, { status: 400 });
    }

    if (query.length > 500) {
      return NextResponse.json({ mode: 'error', results: [], message: 'Please keep the search under 500 characters.' }, { status: 400 });
    }

    const result = await tinyFishSearch(query, location);
    return NextResponse.json(result);
  } catch (error) {
    console.error('TinyFish Search route failed', error);
    return NextResponse.json(
      { mode: 'error', results: [], message: 'TinyFish is temporarily unavailable. StayWise demo results are still available.' },
      { status: 502 }
    );
  }
}
