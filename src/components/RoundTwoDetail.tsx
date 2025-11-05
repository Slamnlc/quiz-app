import { RotateCcw, Volume2 } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import type { RoundTwoItem } from "../data/round2";
import { QuizState } from "../types";

type Props = {
  item: RoundTwoItem;
  onBack: () => void;
  state: QuizState;
  updateState: (updates: Partial<QuizState>) => void;
};

const generateSpoilerText = (length: number, seed: number): string => {
  const emojis = [
    "🎵",
    "🎶",
    "🎤",
    "🎧",
    "🎸",
    "🎹",
    "🥁",
    "🎺",
    "🎷",
    "🎻",
    "🎯",
    "⭐",
    "🌟",
    "✨",
    "💫",
    "🔥",
    "💥",
    "⚡",
    "🎪",
    "🎭",
    "🎬",
    "🎨",
    "🎪",
    "🎭",
  ];
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const allChars = [...emojis, ...chars.split("")];

  // Use seed for consistent generation per line
  let random = seed;
  const next = () => {
    random = (random * 9301 + 49297) % 233280;
    return random / 233280;
  };

  let result = "";
  for (let i = 0; i < length; i++) {
    result += allChars[Math.floor(next() * allChars.length)];
  }
  return result;
};

export default function RoundTwoDetail({
  item,
  onBack,
  state,
  updateState,
}: Props) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [musicStarted, setMusicStarted] = useState(false);
  const revealTimerRef = useRef<number | null>(null);
  const [answerGot, setAnswerGot] = useState<boolean>(false);

  const spoilers = useMemo(() => {
    return item.hintLines.map((_, i) => {
      const length = 5 + Math.floor((item.id * 7 + i * 13) % 10);
      return generateSpoilerText(length, item.id * 1000 + i * 100);
    });
  }, [item.id, item.hintLines]);

  const handleAnswer = (result: boolean) => {
    if (state.usedSongs.includes(item.id)) {
      return;
    }
    const updates: Partial<QuizState> = {
      usedSongs: [...state.usedSongs, item.id],
      currentTeam: state.currentTeam === 1 ? 2 : 1,
    };

    if (result) {
      const increase = revealed.size ? 1 : 2;

      if (state.currentTeam === 1) {
        updates.team1Score = state.team1Score + increase;
      } else {
        updates.team2Score = state.team2Score + increase;
      }
    }
    updateState(updates);
  };

  return (
    <div className="min-h-[40vh] bg-white/95 rounded-2xl p-4 2xl:p-14 backdrop-blur-sm max-w-5xl 2xl:max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6 2xl:mb-8">
        <h2 className="text-2xl md:text-3xl 2xl:text-6xl font-bold text-gray-800">
          Завдання #{item.id}
        </h2>
        <button
          onClick={() => {
            if (revealTimerRef.current) {
              clearTimeout(revealTimerRef.current);
              revealTimerRef.current = null;
            }
            setMusicStarted(false);
            stopCurrentAudio();
            onBack();
          }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold inline-flex items-center gap-2 hover:scale-[1.02] transition-transform"
        >
          <RotateCcw size={18} /> Назад
        </button>
      </div>

      <div className="flex flex-wrap justify-center items-center text-7xl md:text-8xl 2xl:text-[10rem] text-center py-3 gap-5 md:gap-8 2xl:gap-12">
        {item.puzzle.map((p, i) => (
          <span key={i} className="inline-block">
            {p}
          </span>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        <div className="bg-purple-50 text-purple-900 rounded-xl p-5 2xl:p-8 text-center">
          {item.hintLines.map((l, i) => {
            const isShown = revealed.has(i);
            return (
              <p
                key={i}
                onClick={() => setRevealed((prev) => new Set(prev).add(i))}
                className={`text-base leading-relaxed !text-6xl 2xl:!text-8xl inline-block cursor-pointer select-none transition-all ${
                  isShown ? "" : "blur-lg"
                }`}
              >
                {isShown ? l : spoilers[i]}
              </p>
            );
          })}
          {!revealed.size && (
            <div className="mt-3 text-2xl 2xl:text-4xl text-purple-700/80">
              Натисніть, щоб показати підказку
            </div>
          )}
        </div>
      </div>
      {answerGot && (
        <div className="text-black flex items-center justify-center">
          Відповідь правильна?
          <button onClick={() => handleAnswer(true)}>✅ Так</button>
          <button onClick={() => handleAnswer(false)}>❌ Ні</button>
        </div>
      )}
      <div className="mt-10 flex items-center justify-between gap-6">
        <div
          className={`inline-block bg-green-50 text-green-800 px-6 2xl:px-10 py-3 2xl:py-5 rounded-full font-semibold text-xl md:text-2xl 2xl:text-4xl ${musicStarted ? "" : "blur-lg select-none"}`}
        >
          {item.answer}
        </div>
        <button
          onClick={() => {
            if (revealTimerRef.current) {
              clearTimeout(revealTimerRef.current);
              revealTimerRef.current = null;
            }
            setMusicStarted(false);
            playItemAudio(item, () => {
              revealTimerRef.current = window.setTimeout(() => {
                setMusicStarted(true);
                revealTimerRef.current = null;
                setAnswerGot(true);
              }, 4000);
            });
          }}
          className="ml-auto bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-5 2xl:px-8 py-3 2xl:py-4 rounded-lg font-semibold inline-flex items-center gap-3 hover:scale-[1.02] transition-transform text-lg 2xl:text-2xl"
        >
          <Volume2 size={96} />
        </button>
      </div>
    </div>
  );
}

let currentAudio: HTMLAudioElement | null = null;
function stopCurrentAudio(): void {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch {}
    currentAudio = null;
  }
}

function playItemAudio(item: RoundTwoItem, onStart?: () => void): void {
  stopCurrentAudio();
  if (item.audioPath) {
    try {
      const audio = new Audio(item.audioPath);
      currentAudio = audio;
      audio.onended = () => {
        if (currentAudio === audio) currentAudio = null;
      };
      audio
        .play()
        .then(() => {
          if (onStart) onStart();
        })
        .catch(() => {
          if (currentAudio === audio) currentAudio = null;
          playChime();
        });
      return;
    } catch {
      // ignore and fallback
    }
  }
  playChime();
}

function playChime(): void {
  const AudioCtx =
    (window as any).AudioContext || (window as any).webkitAudioContext;
  if (!AudioCtx) return;
  const ctx = new AudioCtx();

  const now = ctx.currentTime;
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.0001, now);
  masterGain.connect(ctx.destination);

  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  const noteDur = 0.12;
  const gap = 0.04;

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);
    osc.connect(gain);
    gain.connect(masterGain);

    const t0 = now + idx * (noteDur + gap);
    // envelope
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(0.6, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + noteDur);

    masterGain.gain.setValueAtTime(1, t0);

    osc.start(t0);
    osc.stop(t0 + noteDur + 0.02);
  });

  // stop context after sound
  setTimeout(() => {
    try {
      ctx.close();
    } catch {}
  }, 1000);
}
