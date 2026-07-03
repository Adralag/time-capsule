import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { letter, couple } from "../content";

export default function VintageLetter() {
  const [open, setOpen] = useState(false);

  return (
    <section id="letter" className="relative overflow-hidden bg-capsule-900 py-24 sm:py-32">
      <div className="grain-overlay" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-brass-300/80">
          For You
        </p>
        <h2 className="mt-3 font-display text-3xl font-medium text-parchment-100 sm:text-4xl">
          A letter, sealed for {couple.her}
        </h2>
        <p className="mt-3 font-letter text-parchment-200/60">
          {open ? "" : "Click the seal to open it."}
        </p>
      </div>

      <div className="relative mx-auto mt-12 flex max-w-xl justify-center px-6">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              key="envelope"
              type="button"
              onClick={() => setOpen(true)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="group relative w-full max-w-sm focus:outline-none"
              aria-label="Open the letter"
            >
              {/* envelope body */}
              <div className="relative aspect-[3/2] w-full rounded-md bg-brass-300 shadow-2xl shadow-black/50">
                <div className="absolute inset-0 rounded-md bg-gradient-to-b from-brass-200/60 to-brass-400/40" />
                {/* envelope flap */}
                <div
                  className="absolute left-0 top-0 h-full w-full origin-top transition-transform duration-500 ease-out group-hover:-translate-y-1"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 58%)",
                  }}
                >
                  <div className="h-full w-full bg-brass-400" />
                </div>
                {/* wax seal */}
                <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-wax-500 shadow-lg shadow-black/40 ring-2 ring-wax-600 transition-transform duration-300 group-hover:scale-105">
                  <span className="font-display text-lg font-medium text-parchment-200/90">
                    {couple.you?.[0]}
                    {couple.her?.[0]}
                  </span>
                </div>
              </div>
              <p className="mt-4 font-sans text-xs uppercase tracking-[0.2em] text-brass-300/70">
                Tap to break the seal
              </p>
            </motion.button>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 24, rotateX: -8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-lg rounded-sm bg-parchment-100 p-8 shadow-2xl shadow-black/50 sm:p-12"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(139,111,71,0.05), transparent 40%), radial-gradient(circle at 80% 70%, rgba(139,111,71,0.06), transparent 45%)",
              }}
            >
              <p className="font-letter text-lg text-ink sm:text-xl">
                {letter.salutation}
              </p>
              <div className="mt-5 space-y-4">
                {letter.paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                    className="font-letter text-[16px] leading-[1.9] text-ink/90 sm:text-[17px]"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
              <p className="mt-8 font-letter italic text-ink/80">
                {letter.signoff}
                <br />
                <span className="font-letter text-lg">{letter.signature}</span>
              </p>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-8 font-sans text-xs uppercase tracking-[0.2em] text-ink/40 underline decoration-dotted underline-offset-4 hover:text-ink/70"
              >
                Seal it back up
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
