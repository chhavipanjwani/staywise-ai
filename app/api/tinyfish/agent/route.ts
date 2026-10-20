import { NextResponse } from 'next/server';
import { tinyFishAgent } from '@/lib/tinyfish';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const url = typeof body.url === 'string' ? body.url.trim() : '';
    const goal = typeof body.goal === 'string' ? body.goal.trim() : '';

    if (!url || !goal) {
      return NextResponse.json({ mode: 'error', result: null, message: 'A target URL and research goal are required.' }, { status: 400 });
    }

    const parsedUrl = new URL(url);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return NextResponse.json({ mode: 'error', result: null, message: 'Only HTTP and HTTPS URLs are supported.' }, { status: 400 });
    }

    if (goal.length > 1000) {
      return NextResponse.json({ mode: 'error', result: null, message: 'Please keep the research goal under 1,000 characters.' }, { status: 400 });
    }

    const result = await tinyFishAgent(parsedUrl.toString(), goal);
    return NextResponse.json(result);
  } catch (error) {
    console.error('TinyFish Agent route failed', error);
    return NextResponse.json(
      { mode: 'error', result: null, message: 'TinyFish agent research is temporarily unavailable.' },
      { status: 502 }
    );
  }
}
