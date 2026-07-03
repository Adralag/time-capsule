import { useState } from "react";
import { motion } from "framer-motion";
import { couple, unlock } from "../content";

export default function UnlockScreen({ onUnlock }) {
  const [value, setValue] = useState("");
  const [shake, setShake] = useState(false);
  const [tries, setTries] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    const correct =
      value.trim().toLowerCase() === unlock.answer.trim().toLowerCase();

    if (correct) {
      onUnlock();
    } else {
      setShake(true);
      setTries((t) => t + 1);
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-capsule-950 px-6"
    >
      {/* Blurred backdrop photo */}
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center opacity-40 blur-2xl"
        style={{ backgroundImage: `url(${unlock.heroImage})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-capsule-950/70 via-capsule-950/80 to-capsule-950" />
      <div className="grain-overlay" />

      {/* Ambient drifting brass dot, purely decorative */}
      <motion.div
        className="absolute left-1/2 top-1/4 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brass-300/70 animate-drift"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-2xl border border-brass-400/30 bg-capsule-900/70 p-8 shadow-[0_0_60px_-15px_rgba(201,161,92,0.25)] backdrop-blur-md sm:p-10">
          <p className="text-center font-sans text-[11px] uppercase tracking-[0.28em] text-brass-300/80">
            {unlock.eyebrow}
          </p>

          <h1 className="mt-4 text-center font-display text-4xl font-medium tracking-tight text-parchment-100 sm:text-5xl">
            {couple.anniversaryLabel}.
          </h1>
          <p className="mt-3 text-center font-letter text-base italic text-parchment-200/70">
            A capsule for {couple.her}, sealed by {couple.you}.
          </p>

          <div className="my-8 brass-rule" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <label
              htmlFor="capsule-answer"
              className="block text-center font-sans text-sm text-parchment-200/90"
            >
              {unlock.question}
            </label>

            <motion.input
              id="capsule-answer"
              type="text"
              autoComplete="off"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              animate={shake ? { x: [0, -10, 10, -8, 8, 0] } : { x: 0 }}
              transition={{ duration: 0.45 }}
              placeholder="Type your answer"
              className="w-full rounded-lg border border-brass-400/40 bg-capsule-950/60 px-4 py-3 text-center font-sans text-parchment-100 placeholder:text-parchment-100/30 outline-none ring-brass-300/60 transition focus:border-brass-300 focus:ring-2"
            />

            <button
              type="submit"
              className="w-full rounded-lg border border-brass-400/60 bg-brass-400/10 py-3 font-sans text-sm uppercase tracking-[0.2em] text-brass-200 transition hover:bg-brass-400/20 active:scale-[0.99]"
            >
              Unlock
            </button>

            {tries > 0 && (
              <p className="text-center font-letter text-sm italic text-wax-400/90">
                {unlock.hint}
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
