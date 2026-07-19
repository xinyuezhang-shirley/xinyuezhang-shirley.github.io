import { useEffect, useRef, useState } from "react";

const SOUND_KEY = "echo-portfolio-sound-on";
const VOLUME = 0.18;

/** Echo soundtrack toggle — off until the visitor asks; never autoplay. */
export function EchoSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = VOLUME;
    audio.loop = true;
    setReady(true);
    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (on) {
      audio.play().catch(() => setOn(false));
    } else {
      audio.pause();
    }
    try {
      localStorage.setItem(SOUND_KEY, on ? "on" : "off");
    } catch {
      /* private mode */
    }
  }, [on]);

  return (
    <div className="echo-sound">
      <audio ref={audioRef} src="/media/work/echo/soundtrack.mp3" preload="metadata" loop />
      <button
        type="button"
        className="echo-sound-toggle"
        aria-pressed={on}
        aria-label={on ? "Turn Echo soundtrack off" : "Turn Echo soundtrack on"}
        disabled={!ready}
        onClick={() => setOn((v) => !v)}
      >
        {on ? "Turn soundtrack off" : "Turn soundtrack on"}
      </button>
    </div>
  );
}
