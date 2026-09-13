import { NextResponse } from 'next/server';
import { extractExperimentParameters } from '@/services/llm.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const parsedData = await extractExperimentParameters(body.query);
    return NextResponse.json(parsedData);
    
  } catch (error) {
    console.error("Parse API Error:", error);
    return NextResponse.json({ error: "Failed to parse query" }, { status: 500 });
  }
}