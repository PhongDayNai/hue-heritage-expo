import { NextResponse } from 'next/server';
import { getFeatureFlags, setFeatureFlags } from '@/lib/featureFlags';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(getFeatureFlags());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const current = getFeatureFlags();

    const next = {
      ...current,
      showServices: typeof body.showServices === 'boolean' ? body.showServices : current.showServices
    };

    const saved = setFeatureFlags(next);
    return NextResponse.json(saved);
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
