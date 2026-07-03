import { motion } from "framer-motion";
import { timeline } from "../content";

function Card({ item, align }) {
  const fromSide = align === "left" ? -32 : 32;
  return (
    <motion.div
      initial={{ opacity: 0, x: fromSide, y: 12 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-xl border border-brass-400/20 bg-capsule-800/60 p-5 shadow-lg shadow-black/20 sm:p-6"
    >
      <div className="overflow-hidden rounded-lg border border-brass-400/20 bg-capsule-950">
        <img
          src={item.image}
          alt={item.title}
          className="aspect-[4/3] w-full object-cover"
          loading="lazy"
        />
      </div>
      <h3 className="mt-4 font-display text-xl font-medium text-parchment-100">
        {item.title}
      </h3>
      <p className="mt-2 font-letter text-[15px] leading-relaxed text-parchment-200/75">
        {item.body}
      </p>
    </motion.div>
  );
}

export default function Timeline() {
  return (
    <section id="timeline" className="relative bg-capsule-900 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-brass-300/80">
          Our Year
        </p>
        <h2 className="mt-3 font-display text-3xl font-medium text-parchment-100 sm:text-4xl">
          A timeline of us
        </h2>
      </div>

      <div className="relative mx-auto mt-16 max-w-4xl px-6">
        {/* the center line */}
        <div className="absolute left-8 top-0 h-full w-px bg-brass-400/25 sm:left-1/2 sm:-translate-x-1/2" />

        <ol className="space-y-16">
          {timeline.map((item, i) => {
            const align = i % 2 === 0 ? "left" : "right";
            return (
              <li
                key={item.title + i}
                className="relative flex flex-col gap-6 sm:flex-row sm:items-start"
              >
                {/* postmark date stamp, centered on the line */}
                <div className="absolute left-8 -translate-x-1/2 sm:left-1/2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5 }}
                    className="postmark"
                  >
                    <span className="rotate-[-8deg] text-center font-sans text-[10px] font-medium leading-tight text-brass-300">
                      {item.date}
                    </span>
                  </motion.div>
                </div>

                {/* spacer for the stamp on mobile */}
                <div className="pl-24 sm:hidden" />

                {align === "left" ? (
                  <>
                    <div className="hidden sm:block sm:w-1/2 sm:pr-14">
                      <Card item={item} align="left" />
                    </div>
                    <div className="pl-24 sm:hidden">
                      <Card item={item} align="left" />
                    </div>
                    <div className="hidden sm:block sm:w-1/2" />
                  </>
                ) : (
                  <>
                    <div className="hidden sm:block sm:w-1/2" />
                    <div className="hidden sm:block sm:w-1/2 sm:pl-14">
                      <Card item={item} align="right" />
                    </div>
                    <div className="pl-24 sm:hidden">
                      <Card item={item} align="right" />
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
