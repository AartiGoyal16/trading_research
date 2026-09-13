import { NextResponse } from 'next/server';
import { runHistoricalSimulation } from '@/services/quant.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (body.dropThreshold === undefined || body.holdingPeriod === undefined) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const results = runHistoricalSimulation(body.dropThreshold, body.holdingPeriod);
    return NextResponse.json(results);

  } catch (error) {
    console.error("Simulation API Error:", error);
    return NextResponse.json({ error: "Failed to run simulation" }, { status: 500 });
  }
}