/**
 * Chat API for Aurora — deploy to Vercel (or any Node/Edge runtime).
 *
 * Deploy: put this file in your Vercel project's /api folder as chat.ts,
 * or use "vercel" CLI from project root if api/ is in the same repo.
 *
 * Env on Vercel: OPENAI_API_KEY and/or GOOGLE_GENERATIVE_AI_API_KEY
 */
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';

const SYSTEM_PROMPT = `You are Aurora, a warm and thoughtful AI companion in the Nearu app.
You learn the user's patterns, remember what matters to them, and speak in a supportive, concise way.
Keep replies conversational and not too long. Use the user's name when you know it.`;

function getModel(provider?: string) {
  if (provider === 'gemini' && process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return google('gemini-2.0-flash');
  }
  if (process.env.OPENAI_API_KEY) {
    return openai('gpt-4o-mini');
  }
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return google('gemini-2.0-flash');
  }
  throw new Error('Set OPENAI_API_KEY or GOOGLE_GENERATIVE_AI_API_KEY in the environment.');
}

export const config = { runtime: 'edge' };

export async function POST(req: Request) {
  try {
    const { messages, provider } = (await req.json()) as {
      messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
      provider?: 'openai' | 'gemini';
    };
    const model = getModel(provider);
    const result = streamText({
      model,
      system: SYSTEM_PROMPT,
      messages,
    });
    return result.toDataStreamResponse();
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
