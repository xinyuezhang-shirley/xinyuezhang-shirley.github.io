import { useEffect, useRef, useState } from "react";

const SOUND_KEY = "echo-portfolio-sound-on";
const VOLUME = 0.18;

/** Echo soundtrack toggle — off until the visitor asks; never autoplay. */
export function EchoSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = VOLUME;
    audio.loop = true;
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
    localStorage.setItem(SOUND_KEY, on ? "on" : "off");
  }, [on]);

  return (
    <div className="echo-sound">
      <audio ref={audioRef} src="/work/echo/soundtrack.mp3" preload="none" loop />
      <button
        type="button"
        className="echo-sound-toggle"
        aria-pressed={on}
        onClick={() => setOn((v) => !v)}
      >
        sound: {on ? "on" : "off"}
      </button>
    </div>
  );
}
