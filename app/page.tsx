"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  QUESTIONS,
  createEmptyAnswers,
  type JediProfileData,
  type RankedAnswer,
} from '@/lib/quiz';

interface StatsBarProps {
  label: string;
  percentage: number;
  description: string;
}

interface VirtueProps {
  label: string;
  description: string;
  percentage: number;
}

interface TimelineProps {
  era: string;
  highlight: string;
  outcome: string;
}

interface ModuleProps {
  title: string;
  description: string;
  duration: string;
}

interface MissionProps {
  title: string;
  location: string;
  objective: string;
}

interface StarStopProps {
  stop: string;
  focus: string;
  reason: string;
}

const heroHighlights = [
  {
    title: 'Holocron-grade destiny',
    description: 'Receive a cinematic narrative with saber specs, Force philosophy, allies, rivals, and a signature holomessage.',
  },
  {
    title: 'Actionable training arc',
    description: 'Unlock curated drills, meditations, missions, and holocrons so you can start living the Jedi lifestyle today.',
  },
  {
    title: 'Collector-friendly rewards',
    description: 'Download a printable certificate, share a markdown report, and keep exploring with a guided star map itinerary.',
  },
];

const unlockBenefits = [
  {
    title: 'Legendary archetype dossier',
    detail: 'Full markdown lore with backstory, theme music, and comparisons to iconic Jedi masters.',
  },
  {
    title: 'Holocron vault access',
    detail: 'Interactive stats, virtue insights, holocron recommendations, and bespoke meditation playlists.',
  },
  {
    title: 'Strategic training plan',
    detail: 'Five tailored modules plus live-fire missions, allies, rivals, and a Force ability roadmap.',
  },
  {
    title: 'Shareable keepsakes',
    detail: 'Unlock the download-ready certificate, copyable profile link, and instant social sharing buttons.',
  },
];

function StatsBar({ label, percentage, description }: StatsBarProps) {
  const clamped = Math.max(0, Math.min(percentage, 100));
  const visual = Math.max(clamped, clamped > 0 ? 6 : 0);
  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 space-y-2">
      <div className="flex items-center justify-between text-sm text-gray-300">
        <span className="font-semibold text-gray-100">{label}</span>
        <span>{clamped}%</span>
      </div>
      <div className="h-2 w-full rounded bg-gray-800 overflow-hidden">
        <div
          className="h-full rounded bg-gradient-to-r from-jedi-blue via-jedi-gold to-jedi-green transition-all duration-500"
          style={{ width: `${visual}%` }}
        />
      </div>
      {description && <p className="text-xs text-gray-400 leading-relaxed">{description}</p>}
    </div>
  );
}

function VirtueCard({ label, description, percentage }: VirtueProps) {
  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-base font-semibold text-jedi-gold">{label}</h4>
        <span className="text-sm text-gray-300">{percentage}%</span>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

function TimelineCard({ era, highlight, outcome }: TimelineProps) {
  return (
    <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4 space-y-1">
      <p className="text-xs uppercase tracking-wider text-jedi-gold">{era}</p>
      <p className="text-sm text-gray-200 font-medium">{highlight}</p>
      <p className="text-xs text-gray-400">{outcome}</p>
    </div>
  );
}

function ModuleCard({ title, description, duration }: ModuleProps) {
  return (
    <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4">
      <h4 className="text-sm font-semibold text-gray-100">{title}</h4>
      <p className="text-sm text-gray-400 leading-relaxed mt-1">{description}</p>
      <p className="text-xs text-gray-500 mt-2 uppercase tracking-wide">Duration: {duration}</p>
    </div>
  );
}

function MissionCard({ title, location, objective }: MissionProps) {
  return (
    <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4 space-y-2">
      <div>
        <p className="text-xs uppercase tracking-wide text-jedi-blue">{location}</p>
        <h4 className="text-sm font-semibold text-gray-100">{title}</h4>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed">{objective}</p>
    </div>
  );
}

function StarStop({ stop, focus, reason }: StarStopProps) {
  return (
    <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4 space-y-1">
      <h4 className="text-sm font-semibold text-gray-100">{stop}</h4>
      <p className="text-xs text-jedi-blue uppercase tracking-wide">Focus: {focus}</p>
      <p className="text-sm text-gray-400 leading-relaxed">{reason}</p>
    </div>
  );
}

export default function Home() {
  const [name, setName] = useState('');
  const [answers, setAnswers] = useState<RankedAnswer[]>(() => createEmptyAnswers());
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState('');
  const [profileData, setProfileData] = useState<JediProfileData | null>(null);
  const [error, setError] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const hasCookie = document.cookie.includes('jediPaid=true');
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    setIsPaid(hasCookie || (params ? params.has('paid') : false));
  }, []);

  const answeredCount = useMemo(() => {
    return answers.filter((answer) => answer.first && answer.second && answer.third).length;
  }, [answers]);

  const progress = useMemo(() => {
    if (QUESTIONS.length === 0) return 0;
    return Math.round((answeredCount / QUESTIONS.length) * 100);
  }, [answeredCount]);

  const playSfx = () => {
    try {
      const audio = new Audio('/saber.mp3');
      audio.volume = 0.4;
      void audio.play();
    } catch {
      // ignore audio issues in non-browser contexts
    }
  };

  const updateAnswer = (questionIndex: number, rank: keyof RankedAnswer, value: string | null) => {
    playSfx();
    setAnswers((prev) => {
      const next = [...prev];
      const current = { ...next[questionIndex] };
      current[rank] = value;
      next[questionIndex] = current;
      return next;
    });
  };

  const canSubmit = useMemo(() => {
    return answers.every((answer) => answer.first && answer.second && answer.third);
  }, [answers]);

  const handleSubmit = async () => {
    setError('');
    if (!canSubmit) {
      setError('Please rank your top three choices for every question.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, answers }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to generate profile');
      }
      const data = await response.json();
      setProfile(data.profile);
      setProfileData(data.data ?? null);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (err: any) {
      setError(err.message || 'An unexpected disturbance in the Force occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async () => {
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Unable to start checkout');
      }
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url as string;
      }
    } catch (err: any) {
      alert(err.message || 'Payment failed. Try again in a moment.');
    }
  };

  const downloadCertificate = async () => {
    try {
      const payload = {
        name: (profileData?.name || name || 'Padawan').trim(),
        color: profileData?.saber.color || 'blue',
        forms: profileData?.saber.formDetails.map((form) => form.name) || ['Form I: Shii-Cho'],
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
      const link = document.createElement('a');
      link.href = url;
      link.download = 'jedi-certificate.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      alert(err.message || 'Error downloading certificate');
    }
  };

  return (
    <main className="w-full max-w-5xl px-4 py-12 space-y-12">
      <section className="text-center space-y-6">
        <span className="inline-block uppercase tracking-[0.3em] text-xs text-jedi-gold">Galactic Assessment</span>
        <h1 className="text-4xl md:text-5xl font-orbitron text-jedi-blue">
          Forge Your Personal Jedi Codex
        </h1>
        <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Rank your instincts, discover your dominant traits, and unlock an immersive dossier worthy of the Jedi archives.
          Each question sharpens the Force signature that defines your destiny.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {heroHighlights.map((feature) => (
            <div key={feature.title} className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 space-y-2">
              <h3 className="text-lg font-semibold text-jedi-gold">{feature.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-widest">Progress</p>
            <p className="text-2xl font-semibold text-gray-100">{progress}% complete</p>
            <p className="text-sm text-gray-500">
              {answeredCount} / {QUESTIONS.length} holocron prompts ranked
            </p>
          </div>
          <div className="w-full md:w-1/2 h-3 bg-gray-800 rounded overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-jedi-blue via-jedi-gold to-jedi-green transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your chosen name (optional)"
            className="flex-1 bg-gray-950/80 border border-gray-800 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-jedi-blue"
          />
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || loading}
            className="px-6 py-3 rounded-lg bg-jedi-blue text-black font-semibold hover:bg-jedi-gold transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Consulting the Holocron…' : 'Reveal My Jedi Destiny'}
          </button>
        </div>
      </section>

      <section className="space-y-6">
        {QUESTIONS.map((question, qIndex) => {
          const ranks = answers[qIndex];
          const usedValues = new Set<string>(
            [ranks.first ?? undefined, ranks.second ?? undefined, ranks.third ?? undefined].filter(Boolean) as string[]
          );
          return (
            <div
              key={question.text}
              className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 space-y-4 shadow-lg"
            >
              <div className="flex items-baseline justify-between">
                <p className="text-lg font-semibold text-jedi-gold">
                  {qIndex + 1}. {question.text}
                </p>
                <p className="text-xs uppercase tracking-widest text-gray-500">Rank top 3</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {(['first', 'second', 'third'] as (keyof RankedAnswer)[]).map((rank) => {
                  const label = rank === 'first' ? '1st Choice' : rank === 'second' ? '2nd Choice' : '3rd Choice';
                  return (
                    <div key={rank} className="flex flex-col gap-2">
                      <label className="text-sm text-gray-300">{label}</label>
                      <select
                        value={ranks[rank] ?? ''}
                        onChange={(event) => {
                          const value = event.target.value || null;
                          updateAnswer(qIndex, rank, value);
                        }}
                        className="bg-gray-950/80 border border-gray-800 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-jedi-blue"
                      >
                        <option value="">Select…</option>
                        {question.options.map((option) => (
                          <option
                            key={option}
                            value={option}
                            disabled={option !== ranks[rank] && usedValues.has(option)}
                          >
                            {option}
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
        {error && <p className="text-center text-sm text-red-400">{error}</p>}
      </section>

      <section className="bg-gray-900/40 border border-gray-800 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-100 text-center">What you unlock for $4.97</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {unlockBenefits.map((benefit) => (
            <div key={benefit.title} className="bg-gray-950/60 border border-gray-800 rounded-lg p-4 space-y-2">
              <h3 className="text-sm font-semibold text-jedi-gold uppercase tracking-wide">{benefit.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{benefit.detail}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 text-center">
          One-time purchase. Instant access. Use it for RPG characters, cosplay inspirations, or personal motivation.
        </p>
      </section>

      {profile && (
        <section ref={resultRef} className="bg-gray-950/70 border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
          <h2 className="text-2xl font-orbitron text-jedi-blue text-center">Your Holocron Results</h2>
          <div className="relative">
            {!isPaid && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70 backdrop-blur rounded-xl text-center space-y-4 p-6">
                <p className="text-lg font-semibold text-jedi-gold">Unlock the full Holocron</p>
                <p className="text-sm text-gray-300 max-w-sm">
                  You&rsquo;re moments away from a 500+ word cinematic profile, training regimen, allies, rivals, star map, and certificate download.
                </p>
                <button
                  onClick={handlePay}
                  className="px-6 py-3 rounded-lg bg-jedi-gold text-black font-semibold hover:bg-jedi-blue transition"
                >
                  Pay $4.97 to Access Everything
                </button>
                <p className="text-xs text-gray-500 max-w-xs">
                  Perfect for roleplaying, LARP planning, convention personas, or gifting a friend their Jedi alter ego.
                </p>
              </div>
            )}
            <div className={`space-y-6 ${!isPaid ? 'blur-sm select-none pointer-events-none' : ''}`}>
              {profileData && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 space-y-3">
                    <p className="text-xs uppercase tracking-widest text-jedi-gold">Archetype</p>
                    <h3 className="text-xl font-semibold text-gray-100">{profileData.archetype.label}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{profileData.archetype.description}</p>
                    <p className="text-xs text-gray-500">Motto: “{profileData.archetype.motto}”</p>
                    <p className="text-xs text-gray-500">Ceremonial Role: {profileData.archetype.ceremonialRole}</p>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 space-y-3">
                    <p className="text-xs uppercase tracking-widest text-jedi-gold">Secondary Influence</p>
                    <h3 className="text-xl font-semibold text-gray-100">{profileData.secondary.label}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{profileData.secondary.tagline}</p>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-jedi-gold">Lightsaber Signature</p>
                      <ul className="text-sm text-gray-300 mt-2 space-y-1 list-disc list-inside">
                        <li>Blade: {profileData.saber.color}</li>
                        <li>Accent: {profileData.saber.accent}</li>
                        <li>Hilt: {profileData.saber.hiltStyle}</li>
                        <li>Ignition: {profileData.saber.ignitionSound}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {profileData && (
                <div className="grid gap-4 md:grid-cols-2">
                  {profileData.traitBreakdown.map((trait) => (
                    <StatsBar
                      key={trait.trait}
                      label={`${trait.label}`}
                      percentage={trait.percentage}
                      description={trait.description}
                    />
                  ))}
                </div>
              )}

              {profileData && profileData.virtueHighlights.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-100">Virtue Highlights</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {profileData.virtueHighlights.map((virtue) => (
                      <VirtueCard
                        key={virtue.id}
                        label={virtue.label}
                        description={virtue.description}
                        percentage={virtue.percentage}
                      />
                    ))}
                  </div>
                </div>
              )}

              {profileData && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 space-y-3">
                    <h3 className="text-lg font-semibold text-gray-100">Companion</h3>
                    <p className="text-sm text-gray-300">{profileData.companion.name} — {profileData.companion.role}</p>
                    <p className="text-xs text-gray-500">Species: {profileData.companion.species}</p>
                    <p className="text-sm text-gray-400 leading-relaxed">{profileData.companion.description}</p>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 space-y-3">
                    <h3 className="text-lg font-semibold text-gray-100">Rival</h3>
                    <p className="text-sm text-gray-300">{profileData.rival.name}</p>
                    <p className="text-sm text-gray-400 leading-relaxed">{profileData.rival.description}</p>
                    <p className="text-xs text-gray-500">Lesson: {profileData.rival.lesson}</p>
                  </div>
                </div>
              )}

              {profileData && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-100">Saber Forms</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    {profileData.saber.formDetails.map((form) => (
                      <div key={form.name} className="bg-gray-900/40 border border-gray-800 rounded-lg p-4 space-y-2">
                        <p className="text-sm font-semibold text-jedi-gold">{form.name}</p>
                        <p className="text-sm text-gray-400 leading-relaxed">{form.rationale}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {profileData && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-100">Training Modules</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    {profileData.trainingModules.map((module) => (
                      <ModuleCard key={module.title} {...module} />
                    ))}
                  </div>
                </div>
              )}

              {profileData && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-100">Mission Directives</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {profileData.missions.map((mission) => (
                      <MissionCard key={mission.title} {...mission} />
                    ))}
                  </div>
                </div>
              )}

              {profileData && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-100">Star Map Itinerary</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    {profileData.starMap.map((stop) => (
                      <StarStop key={stop.stop} {...stop} />
                    ))}
                  </div>
                </div>
              )}

              {profileData && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-100">Timeline</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    {profileData.timeline.map((beat, index) => (
                      <TimelineCard key={`${beat.era}-${index}`} {...beat} />
                    ))}
                  </div>
                </div>
              )}

              {profileData && (
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4 space-y-2">
                    <h3 className="text-sm font-semibold text-jedi-gold uppercase tracking-wide">Holocrons</h3>
                    <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                      {profileData.holocrons.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4 space-y-2">
                    <h3 className="text-sm font-semibold text-jedi-gold uppercase tracking-wide">Meditations</h3>
                    <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                      {profileData.meditations.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4 space-y-2">
                    <h3 className="text-sm font-semibold text-jedi-gold uppercase tracking-wide">Field Gear</h3>
                    <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                      {profileData.gear.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-5">
                <ReactMarkdown className="prose prose-invert max-w-none">{profile}</ReactMarkdown>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={downloadCertificate}
                  className="px-4 py-2 rounded-lg bg-jedi-green text-black font-semibold hover:bg-jedi-gold transition"
                >
                  Download Certificate
                </button>
                <button
                  onClick={() => {
                    if (navigator?.clipboard && typeof window !== 'undefined') {
                      navigator.clipboard
                        .writeText(window.location.href)
                        .then(() => alert('Link copied to clipboard'))
                        .catch(() => alert('Unable to copy link.'));
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-jedi-purple text-black font-semibold hover:bg-jedi-gold transition"
                >
                  Copy Link
                </button>
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      const tweet = encodeURIComponent(
                        `I just unlocked my Jedi destiny! Discover yours for $4.97 at ${window.location.origin}`
                      );
                      window.open(`https://twitter.com/intent/tweet?text=${tweet}`, '_blank');
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-jedi-red text-black font-semibold hover:bg-jedi-gold transition"
                >
                  Share on X
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
