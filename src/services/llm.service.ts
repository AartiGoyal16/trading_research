import OpenAI from 'openai';
import { ExperimentSpec } from '../types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function extractExperimentParameters(query: string): Promise<Partial<ExperimentSpec>> {
  const prompt = `
    Analyze the following user query and extract trading experiment parameters.
    Query: "${query}"

    Return a strict JSON object with these keys:
    - "instrument": (string, default "NIFTY 50" if not explicitly stated)
    - "action": (string, "BUY" or "SELL")
    - "dropThreshold": (number, decimal representation of the percentage drop. E.g., 2% = 0.02. Return null if not explicitly stated)
    - "holdingPeriod": (number, the number of days to hold. Return null if not explicitly stated)
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content || '{}');
}