import { NextResponse } from 'next/server';

interface RankedAnswer {
  first: string | null;
  second: string | null;
  third: string | null;
}

interface GeneratePayload {
  name?: string;
  answers: RankedAnswer[];
}

// A helper to choose random elements from an array.  Used when
// generating a fallback profile without calling the OpenAI API.
function pickRandom<T>(items: T[], count: number): T[] {
  const picks: T[] = [];
  const pool = [...items];
  while (picks.length < count && pool.length) {
    const idx = Math.floor(Math.random() * pool.length);
    picks.push(pool.splice(idx, 1)[0]);
  }
  return picks;
}

export async function POST(req: Request) {
  const { name, answers } = (await req.json()) as GeneratePayload;

  // Build a system prompt for the AI.  The instructions ask the model
  // to infer Jedi attributes based on the ranked answers.  It should
  // produce a structured markdown profile covering lightsaber forms,
  // colours, equipment, backstory and a training challenge.  The
  // profile must be self‑contained and not rely on additional data.
  const systemPrompt = `You are a wise Jedi Master crafting destinies for Padawans.  Given a list of ranked answers to five questions, infer the individual's Jedi persona.  Respond in rich markdown with clear headings and bolded attribute labels.  Include the following sections: \n\n• **Lightsaber Forms:** List a primary, secondary and tertiary form with a one‑sentence rationale for each.\n• **Force Alignment:** Describe the Force philosophy (e.g. Light‑side Guardian, Consular, or a more balanced approach).\n• **Lightsaber Details:** Specify colour, hilt style and the sound of ignition.\n• **Robes/Armour:** Suggest appropriate attire.\n• **Symbolic Item:** A personal talisman or artifact.\n• **Backstory:** A short narrative explaining how their path led them here.\n• **Famous Jedi Comparisons:** Mention two well‑known Jedi they resemble.\n• **Theme Song:** Suggest a piece of Star Wars music that fits them.\n• **Training Challenge:** Propose a short “holocron challenge” – a mini mission or exercise to further their development.\n• **Holo‑message:** End with a short inspirational quote the Jedi might leave in a holocron.\n\nAnswer richly and creatively but stay within a reasonable length (around 500 words).`;

  // Prepare the message for the chat model.  We include both the
  // system instructions and the user payload.  Answers are stringified
  // to provide context without exposing internal structure.
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: JSON.stringify({ name: name ?? null, answers }) },
  ];

  const openAiKey = process.env.OPENAI_API_KEY;
  if (openAiKey) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages,
          temperature: 0.8,
          max_tokens: 800,
        }),
      });
      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || 'OpenAI request failed');
      }
      const data = await response.json();
      const message: string = data.choices?.[0]?.message?.content ?? '';
      return NextResponse.json({ profile: message, data: null });
    } catch (err) {
      // If the API call fails for any reason, fall back to a handcrafted profile.
      console.error('OpenAI error:', err);
    }
  }

  // Fallback generation if no API key is configured or the call fails.  We
  // randomly assign lightsaber colours and forms, and compose a short
  // descriptive profile using template strings.  This ensures the
  // application remains functional without external dependencies.
  const colours = ['blue', 'green', 'purple', 'yellow', 'orange', 'white'];
  const trainingChallenges = [
    'Spend a week meditating at sunrise and practising Form III parries against remotes to sharpen your focus.',
    'Build a makeshift shelter in the wilderness using only the Force and your wits; survive three nights.',
    'Translate an ancient Jedi scroll without relying on technology, trusting your intuition to uncover its meaning.',
    'Guide a youngling through lightsaber drills while blindfolded, relying on the Force to sense their movements.',
    'Travel to a remote world to negotiate peace between feuding tribes without drawing your weapon.',
  ];
  const forms = [
    'Form I: Shii‑Cho',
    'Form II: Makashi',
    'Form III: Soresu',
    'Form IV: Ataru',
    'Form V: Shien / Djem So',
    'Form VI: Niman',
    'Form VII: Juyo / Vaapad',
  ];
  const [primary, secondary, tertiary] = pickRandom(forms, 3);
  const color = pickRandom(colours, 1)[0];
  const challenge = pickRandom(trainingChallenges, 1)[0];
  const personaName = name && name.trim().length > 0 ? name.trim() : 'Unknown';
  const fallbackProfile = `## Jedi Profile\n\n**Name:** ${personaName}\n\n**Lightsaber Forms:**\n\n- **Primary:** ${primary} – You show natural aptitude for this form.\n- **Secondary:** ${secondary} – An area you draw upon when needed.\n- **Tertiary:** ${tertiary} – A form you dabble in to round out your abilities.\n\n**Force Alignment:** A balanced practitioner of the light who values harmony and knowledge.\n\n**Lightsaber Details:** Your blade glows ${color}, with a traditional hilt and a crisp ignition sound reminiscent of training sabres.\n\n**Robes/Armour:** Simple yet elegant robes with minimal armour, signifying agility and wisdom.\n\n**Symbolic Item:** A weathered holocron passed down through generations.\n\n**Backstory:** Raised in the Jedi Temple, you dedicated yourself to understanding the mysteries of the Force.  Years of meditation and sparring honed your skills and shaped your calm demeanour.\n\n**Famous Jedi Comparisons:** Much like Plo Koon and Ahsoka Tano, you balance compassion with a readiness to act.\n\n**Theme Song:** “Binary Sunset” – a reflective piece capturing your introspective nature.\n\n**Training Challenge:** ${challenge}\n\n**Holo‑message:** *“To know the Force is to know oneself; seek balance and you will find peace.”*\n`;
  return NextResponse.json({ profile: fallbackProfile, data: { color, forms: [primary, secondary, tertiary], challenge } });
}