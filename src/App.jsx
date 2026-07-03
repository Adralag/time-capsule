import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import UnlockScreen from "./components/UnlockScreen";
import Timeline from "./components/Timeline";
import Gallery from "./components/Gallery";
import VintageLetter from "./components/VintageLetter";
import FutureVault from "./components/FutureVault";
import AudioToggle from "./components/AudioToggle";
import { couple } from "./content";

const STORAGE_KEY = "capsule-unlocked";

export default function App() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "true") {
      setUnlocked(true);
    }
  }, []);

  function handleUnlock() {
    localStorage.setItem(STORAGE_KEY, "true");
    setUnlocked(true);
  }

  return (
    <div className="min-h-screen bg-capsule-900">
      <AnimatePresence mode="wait">
        {!unlocked ? (
          <UnlockScreen key="unlock" onUnlock={handleUnlock} />
        ) : (
          <motion.main
            key="capsule"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <header className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-capsule-950 px-6 text-center">
              <div className="grain-overlay" />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="font-sans text-[11px] uppercase tracking-[0.3em] text-brass-300/80"
              >
                Sealed &amp; Opened
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
                className="mt-4 max-w-2xl font-display text-4xl font-medium leading-tight text-parchment-100 sm:text-6xl"
              >
                {couple.you} &amp; {couple.her}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-5 max-w-md font-letter text-lg italic text-parchment-200/60"
              >
                One year of us, kept safe and opened right on time.
              </motion.p>
            </header>

            <Timeline />
            <Gallery />
            <VintageLetter />
            <FutureVault />
            <AudioToggle />

            <footer className="bg-capsule-950 py-10 text-center">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-parchment-200/30">
                Made by {couple.you}, for {couple.her}
              </p>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
