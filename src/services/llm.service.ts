import OpenAI from 'openai';
import { ExperimentSpec } from '../types';

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1", 
});

export async function extractExperimentParameters(query: string): Promise<Partial<ExperimentSpec>> {
  const prompt = `
    Analyze the following user query and extract trading experiment parameters.
    Query: "${query}"

    Return a strict JSON object with these keys. If a value is missing or ambiguous, return null for that key.
    - "instrument": (string, standard ticker format like "NIFTY 50" or "NIFTY BANK". Default to "NIFTY 50" if missing)
    - "action": (string, "BUY" or "SELL")
    - "dropThreshold": (number, decimal representation of the percentage drop. E.g., 2% = 0.02. Return null if missing)
    - "holdingPeriod": (number, the number of days to hold. Return null if missing)
  `;

  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content || '{}');
}