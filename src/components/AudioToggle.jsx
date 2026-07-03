import { useEffect, useRef, useState } from "react";
import { audio } from "../content";

export default function AudioToggle() {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.volume = 0.5;
  }, []);

  if (!audio.src) return null;

  function toggle() {
    const el = ref.current;
    if (!el) return;
    if (playing) {
      el.pause();
    } else {
      el.play().catch(() => {});
    }
    setPlaying((p) => !p);
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <audio ref={ref} src={audio.src} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause ${audio.title}` : `Play ${audio.title}`}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-brass-400/40 bg-capsule-900/80 text-brass-300 shadow-lg shadow-black/40 backdrop-blur transition hover:bg-capsule-800"
      >
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full border border-brass-300/60 ${
            playing ? "animate-spin-slow" : ""
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brass-300" />
        </span>
      </button>
    </div>
  );
}
