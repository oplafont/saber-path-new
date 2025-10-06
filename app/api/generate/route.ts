import { NextResponse } from 'next/server';
import { generateProfile, type RankedAnswer } from '@/lib/quiz';

interface GeneratePayload {
  name?: string;
  answers: RankedAnswer[];
}

export async function POST(req: Request) {
  try {
    const { name, answers } = (await req.json()) as GeneratePayload;
    if (!Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json(
        { error: 'Answers are required to forge your Jedi destiny.' },
        { status: 400 }
      );
    }

    const result = generateProfile(name, answers);
    return NextResponse.json(result);
  } catch (err) {
    console.error('Failed to generate profile', err);
    return NextResponse.json(
      { error: 'The Force faltered while crafting your profile. Please try again.' },
      { status: 500 }
    );
  }
}
