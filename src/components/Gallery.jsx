import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gallery } from "../content";

// deterministic slight rotation per photo so it reads as "scattered prints"
// rather than randomly jittering on every re-render
const ROTATIONS = [-3, 2, -2, 3, -1.5, 1.5, -2.5, 2.5];

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <section id="gallery" className="relative bg-capsule-950 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-brass-300/80">
          Kept Safe
        </p>
        <h2 className="mt-3 font-display text-3xl font-medium text-parchment-100 sm:text-4xl">
          The best of us, in pictures
        </h2>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-10 px-6 sm:grid-cols-3 md:gap-x-10">
        {gallery.map((item, i) => (
          <motion.button
            key={item.image + i}
            type="button"
            onClick={() => setActive(item)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
            whileHover={{ rotate: 0, scale: 1.04, zIndex: 10 }}
            style={{ rotate: `${ROTATIONS[i % ROTATIONS.length]}deg` }}
            className="group relative rounded-sm bg-parchment-100 p-2.5 pb-6 shadow-lg shadow-black/40 transition-shadow hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brass-300"
          >
            <div className="aspect-square w-full overflow-hidden bg-capsule-800">
              <img
                src={item.image}
                alt={item.caption || "A memory together"}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            {item.caption && (
              <span className="mt-2 block truncate px-1 text-center font-letter text-xs italic text-ink/70">
                {item.caption}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-capsule-950/90 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-lg overflow-hidden rounded-md bg-parchment-100 p-3"
            >
              <img
                src={active.image}
                alt={active.caption || "A memory together"}
                className="max-h-[75vh] w-full rounded-sm object-contain"
              />
              {active.caption && (
                <p className="mt-2 text-center font-letter italic text-ink/70">
                  {active.caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
