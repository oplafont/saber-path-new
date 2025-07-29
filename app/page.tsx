"use client";

import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/navigation';

// Define the shape of a single quiz question.  Each question contains
// the prompt text and four possible answers.  The user will rank three of
// these answers from most preferred to least.  Ensuring the ranks are
// unique within each question helps capture nuanced preferences.
interface QuizQuestion {
  text: string;
  options: string[];
}

// Hard‑coded quiz questions.  Feel free to modify these to better
// reflect the Jedi virtues you want to evaluate.  Keep the number of
// options at exactly four so that ranking works cleanly.
const QUESTIONS: QuizQuestion[] = [
  {
    text: 'When faced with conflict, you prefer:',
    options: [
      'Calm negotiation and diplomacy',
      'Defensive manoeuvres to protect others',
      'Swift offensive action to end it quickly',
      'Listening to the Force for guidance',
    ],
  },
  {
    text: 'Which training appeals to you the most?',
    options: [
      'Lightsaber forms and combat techniques',
      'Meditation and expanding your connection to the Force',
      'Tactical leadership and battlefield strategy',
      'Deep study of ancient Jedi texts and lore',
    ],
  },
  {
    text: 'Pick the trait you value most:',
    options: [
      'Courage',
      'Wisdom',
      'Compassion',
      'Discipline',
    ],
  },
  {
    text: 'Your ideal lightsaber is:',
    options: [
      'A single‑bladed weapon with a classic hilt',
      'A curved hilt emphasising finesse',
      'A double‑bladed staff for versatility',
      'A shoto or short blade paired with the Force',
    ],
  },
  {
    text: 'Choose the destiny that resonates with you:',
    options: [
      'Guarding the peace across the galaxy',
      'Teaching Padawans and passing on knowledge',
      'Exploring unknown regions and uncovering secrets',
      'Leading troops into battle against tyranny',
    ],
  },
];

// The shape of a single answer set for a question.  Each rank holds
// the chosen option value.  Using nullable strings allows us to
// differentiate between unselected and intentionally selected options.
interface RankedAnswer {
  first: string | null;
  second: string | null;
  third: string | null;
}

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  // Initialise answers for each question.  Each element holds the three
  // rankings for that question.  We clone the template for every
  // question to avoid shared state.
  const [answers, setAnswers] = useState<RankedAnswer[]>(
    () => QUESTIONS.map(() => ({ first: null, second: null, third: null }))
  );
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<string>('');
  const [error, setError] = useState<string>('');
  // When the AI returns structured metadata (colour, forms, etc.),
  // capture it here for certificate generation.  For now it remains
  // undefined until extraction is implemented.
  const [profileData, setProfileData] = useState<any>(null);

  // Play a lightsaber swoosh sound whenever the user interacts with a
  // ranking select.  The file lives in the public folder and is small
  // enough to load instantly.  Using the native Audio API keeps
  // dependencies minimal.
  const playSfx = () => {
    try {
      const audio = new Audio('/saber.mp3');
      audio.volume = 0.4;
      audio.play().catch(() => {});
    } catch {
      /* no sound on server */
    }
  };

  // Determine whether the current user has unlocked the full profile.
  // We check for the presence of our cookie or a query parameter in
  // window.location.  Because cookies are asynchronous on the server,
  // this code runs in the browser only.
  const isPaid = useMemo(() => {
    if (typeof document === 'undefined') return false;
    const hasCookie = document.cookie.includes('jediPaid=true');
    const params = new URLSearchParams(window.location.search);
    return hasCookie || params.has('paid');
  }, [typeof document !== 'undefined' && document.cookie, typeof window !== 'undefined' && window.location.search]);

  // Update an answer when a select changes.  This helper ensures that
  // updates are immutable and that each rank remains unique within a
  // question.  We accept null to clear a selection.
  const updateAnswer = (
    questionIndex: number,
    rank: keyof RankedAnswer,
    value: string | null
  ) => {
    playSfx();
    setAnswers((prev) => {
      const next = [...prev];
      const current = { ...next[questionIndex] };
      current[rank] = value;
      next[questionIndex] = current;
      return next;
    });
  };

  // Determine whether all ranks have been selected for all questions.
  const canSubmit = useMemo(() => {
    return answers.every((a) => a.first && a.second && a.third);
  }, [answers]);

  // On submission, call our generation endpoint.  We send both the
  // participant's name and their ranked answers.  The API will return
  // markdown describing the user's Jedi destiny.  Network errors are
  // surfaced to the user.
  const handleSubmit = async () => {
    setError('');
    if (!canSubmit) {
      setError('Please rank at least three options for every question.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, answers }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to generate profile');
      }
      const data = await res.json();
      setProfile(data.profile);
      setProfileData(data.data ?? null);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Kick off a Stripe Checkout session.  We call our backend route to
  // create a session and then redirect the browser to Stripe's hosted
  // payment page.  The price is determined server‑side via the
  // environment variable PRICE_CENTS.  Errors are shown if the
  // fetch fails.
  const handlePay = async () => {
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Unable to start checkout');
      }
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      alert(err.message || 'Payment failed');
    }
  };

  // Helper to download a personalised certificate.  It sends the
  // essential profile details to the server, receives a PDF blob in
  // response, and triggers a client download.  If structured data
  // isn't available, it will fall back to using the name and a
  // placeholder colour.
  const downloadCertificate = async () => {
    try {
      const payload = {
        name: name || 'Padawan',
        color: profileData?.color || 'blue',
        forms: profileData?.forms || ['Form I'],
        portrait: null,
      };
      const res = await fetch('/api/certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Unable to generate certificate');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'jedi-certificate.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      alert(err.message || 'Error downloading certificate');
    }
  };

  return (
    <main className="w-full max-w-3xl px-4 py-10 space-y-8">
      <h1 className="text-4xl md:text-5xl font-orbitron text-center text-jedi-blue">
        Jedi Path Quiz
      </h1>
      <p className="text-center text-gray-400 max-w-xl mx-auto">
        Rank your top three choices for each question to reveal your Jedi destiny.
      </p>

      {/* Name input */}
      <div className="flex justify-center">
        <input
          type="text"
          value={name}
          placeholder="Your name (optional)"
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded px-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-jedi-blue"
        />
      </div>

      {QUESTIONS.map((q, qIndex) => {
        const ranks = answers[qIndex];
        const usedValues = new Set<string>([
          ranks.first ?? undefined,
          ranks.second ?? undefined,
          ranks.third ?? undefined,
        ].filter(Boolean) as string[]);
        return (
          <div
            key={qIndex}
            className="bg-gray-900/60 backdrop-blur-md p-6 rounded-lg shadow-lg space-y-4"
          >
            <p className="font-orbitron text-xl text-jedi-gold">
              {qIndex + 1}. {q.text}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(['first', 'second', 'third'] as (keyof RankedAnswer)[]).map((rank) => {
                const label = rank === 'first' ? '1st' : rank === 'second' ? '2nd' : '3rd';
                return (
                  <div key={rank} className="flex flex-col">
                    <label className="text-sm mb-1 text-gray-300">{label} choice</label>
                    <select
                      value={ranks[rank] ?? ''}
                      onChange={(e) => {
                        const val = e.target.value || null;
                        updateAnswer(qIndex, rank, val);
                      }}
                      className="bg-gray-800 border border-gray-700 rounded px-2 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-jedi-blue"
                    >
                      <option value="">Select...</option>
                      {q.options.map((opt) => (
                        <option
                          key={opt}
                          value={opt}
                          disabled={opt !== ranks[rank] && usedValues.has(opt)}
                        >
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit || loading}
          className="px-6 py-3 rounded bg-jedi-blue text-black font-semibold hover:bg-jedi-gold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Preparing your destiny...' : 'Discover your Jedi Path'}
        </button>
      </div>

      {/* Display the generated profile */}
      {profile && (
        <div className="bg-gray-900/70 p-6 rounded-lg shadow-xl mt-8 space-y-4">
          {isPaid ? (
            <>
              <ReactMarkdown className="prose prose-invert max-w-none">
                {profile}
              </ReactMarkdown>
              <hr className="border-gray-700" />
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={downloadCertificate}
                  className="px-4 py-2 rounded bg-jedi-green text-black font-semibold hover:bg-jedi-gold transition"
                >
                  Download Certificate
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard
                      .writeText(window.location.href)
                      .then(() => alert('Link copied to clipboard'))
                      .catch(() => alert('Unable to copy link'));
                  }}
                  className="px-4 py-2 rounded bg-jedi-purple text-black font-semibold hover:bg-jedi-gold transition"
                >
                  Copy Link
                </button>
                <button
                  onClick={() => {
                    const tweet = encodeURIComponent(
                      `I just discovered my Jedi destiny! Find yours at ${window.location.origin}`
                    );
                    window.open(
                      `https://twitter.com/intent/tweet?text=${tweet}`,
                      '_blank'
                    );
                  }}
                  className="px-4 py-2 rounded bg-jedi-red text-black font-semibold hover:bg-jedi-gold transition"
                >
                  Tweet Your Destiny
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-300">{profile.slice(0, 300)}...</p>
              <div className="backdrop-blur-sm bg-black/70 p-4 mt-4 rounded">
                <p className="text-gray-400 mb-4">
                  Unlock your full Jedi destiny to view the complete profile.
                </p>
                <button
                  onClick={handlePay}
                  className="px-6 py-2 rounded bg-jedi-gold text-black font-semibold hover:bg-jedi-blue transition"
                >
                  Pay $4.97 to Unlock Full Destiny
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </main>
  );
}