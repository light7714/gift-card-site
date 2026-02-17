'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gifts from '@/data/gifts.json';
import ConfettiBurst from '@/components/ConfettiBurst';

export default function SurpriseContent() {
  const firstGift = gifts[0];
  const surpriseImage = firstGift.loadergiftimage || firstGift.image;

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-14 md:px-8">
      <ConfettiBurst />

      <motion.section
        className="glass-panel relative mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-3xl p-6 shadow-glass md:p-8"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div>
          <p className="text-center text-sm uppercase tracking-[0.25em] text-rose-100/85">Your Surprise</p>
          <h1 className="mt-2 text-center font-[var(--font-heading)] text-4xl text-white md:text-5xl">A Gift Card 👉🏻👈🏻</h1>
        </div>

        <article className="glass-panel rounded-2xl p-4 md:p-5">
          <h2 className="text-center font-[var(--font-heading)] text-2xl text-white">{firstGift.title}</h2>
          <p className="mx-auto mt-3 w-fit rounded-full bg-emerald-500/85 px-4 py-1 text-sm font-semibold tracking-wide text-white shadow-[0_8px_20px_-12px_rgba(16,185,129,0.95)]">
            {firstGift.amount}
          </p>
          <div className="relative mt-4 h-64 overflow-hidden rounded-2xl">
            <Image src={surpriseImage} alt={firstGift.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 900px" priority />
          </div>
          <p className="font-cute mt-4 text-center text-lg leading-relaxed text-rose-50/70 md:text-xl">{firstGift.message1}</p>
          <p className="mt-2 rounded-xl bg-white/10 px-4 py-2 text-sm text-rose-100/90">{firstGift.message2}</p>
        </article>

        <Link
          href="/gifts"
          className="romantic-btn mx-auto inline-flex rounded-xl px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition"
        >
          See All 💌
        </Link>
      </motion.section>
    </main>
  );
}
