import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { vault } from "../content";

function getRemaining(targetIso) {
  const diff = new Date(targetIso).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function FutureVault() {
  const [remaining, setRemaining] = useState(() => getRemaining(vault.unlockDate));

  useEffect(() => {
    if (!remaining) return;
    const id = setInterval(() => setRemaining(getRemaining(vault.unlockDate)), 1000);
    return () => clearInterval(id);
  }, [remaining === null]);

  const isUnlocked = remaining === null;

  return (
    <section id="vault" className="relative overflow-hidden bg-capsule-950 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(201,161,92,0.5), transparent 55%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-brass-300/80">
          {isUnlocked ? "Vault Open" : "Future Us"}
        </p>
        <h2 className="mt-3 font-display text-3xl font-medium text-parchment-100 sm:text-4xl">
          {isUnlocked ? "Right on time." : "Not yet."}
        </h2>

        <div className="mx-auto mt-10 max-w-md rounded-2xl border border-brass-400/25 bg-capsule-900/70 p-8 shadow-[0_0_80px_-20px_rgba(201,161,92,0.2)] sm:p-10">
          {!isUnlocked ? (
            <>
              {/* padlock */}
              <motion.div
                animate={{ rotate: [0, -3, 3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-brass-400/60 text-brass-300"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                  <rect x="5" y="11" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </motion.div>

              <p className="mt-6 select-none font-letter text-base italic text-parchment-200/40 blur-[6px]">
                {vault.message}
              </p>
              <p className="mt-5 font-letter text-parchment-200/70">
                {vault.lockedTeaser}
              </p>

              <div className="mt-8 flex justify-center gap-4 font-sans">
                {[
                  ["Days", remaining?.days],
                  ["Hrs", remaining?.hours],
                  ["Min", remaining?.minutes],
                  ["Sec", remaining?.seconds],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-col items-center">
                    <span className="text-2xl font-medium tabular-nums text-brass-200 sm:text-3xl">
                      {String(value ?? 0).padStart(2, "0")}
                    </span>
                    <span className="mt-1 text-[10px] uppercase tracking-[0.18em] text-parchment-200/40">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-brass-400 text-brass-300">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                  <rect x="5" y="11" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M8 11V9a4 4 0 0 1 7.5-1.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
              <p className="mt-6 font-letter text-lg leading-relaxed text-parchment-100">
                {vault.message}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
