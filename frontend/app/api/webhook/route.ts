import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const event = JSON.parse(body);

  if (event.type === 'checkout.session.completed') {
    console.log('Payment successful');
  }

  return NextResponse.json({ message: 'Received' }, { status: 200 });
}
