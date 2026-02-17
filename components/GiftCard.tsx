'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Gift = {
  id: string;
  title: string;
  image: string;
  loadergiftimage: string;
  message1: string;
  message2: string;
  amount: string;
};

type UnlockResponse = {
  code: string;
  pin: string;
};

export default function GiftCard({ gift }: { gift: Gift }) {
  const [unlockPassword, setUnlockPassword] = useState('');
  const [unlockError, setUnlockError] = useState('');
  const [unlockData, setUnlockData] = useState<UnlockResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUnlock = async () => {
    setLoading(true);
    setUnlockError('');

    try {
      const response = await fetch('/api/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ giftId: gift.id, unlockPassword })
      });

      const payload = await response.json();

      if (!response.ok) {
        setUnlockError(payload.error ?? 'Could not unlock this gift right now.');
        return;
      }

      setUnlockData(payload);
    } catch {
      setUnlockError('Unexpected error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyText = async (value: string) => {
    await navigator.clipboard.writeText(value);
  };

  return (
    <motion.article
      className="glass-panel flex min-h-[48vh] flex-col rounded-3xl p-6 shadow-glass lg:min-h-[52vh]"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.45 }}
    >
      <h2 className="text-center font-[var(--font-heading)] text-3xl text-white">{gift.title} 💖</h2>
      <p className="mx-auto mt-3 w-fit rounded-full bg-emerald-500/85 px-4 py-1 text-sm font-semibold tracking-wide text-white shadow-[0_8px_20px_-12px_rgba(16,185,129,0.95)]">
        {gift.amount}
      </p>
      <div className="relative mt-5 h-56 overflow-hidden rounded-2xl md:h-64">
        <Image src={gift.image} alt={gift.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
      </div>
      <p className="font-cute mt-4 text-center text-lg leading-relaxed text-rose-50/70 md:text-xl">{gift.message1}</p>
      <p className="mt-2 rounded-xl bg-white/10 px-4 py-2 text-sm text-rose-100/90">{gift.message2}</p>

      <div className="mt-5 space-y-3 text-sm">
        <div className="glass-panel flex items-center justify-between rounded-xl p-3">
          <span className="text-rose-100/90">Gift Card Code</span>
          <div className="flex items-center gap-2">
            <motion.span key={unlockData?.code ?? 'masked-code'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono tracking-widest">
              {unlockData?.code ?? 'XXXX XXXX XXXX XXXX'}
            </motion.span>
            {unlockData?.code ? (
              <button onClick={() => copyText(unlockData.code)} className="rounded-md bg-white/20 px-2 py-1 text-xs hover:bg-white/30">
                Copy
              </button>
            ) : null}
          </div>
        </div>

        <div className="glass-panel flex items-center justify-between rounded-xl p-3">
          <span className="text-rose-100/90">Gift Card PIN</span>
          <div className="flex items-center gap-2">
            <motion.span key={unlockData?.pin ?? 'masked-pin'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono tracking-[0.3em]">
              {unlockData?.pin ?? 'XXXXXX'}
            </motion.span>
            {unlockData?.pin ? (
              <button onClick={() => copyText(unlockData.pin)} className="rounded-md bg-white/20 px-2 py-1 text-xs hover:bg-white/30">
                Copy
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center gap-3">
        <input
          type="password"
          value={unlockPassword}
          onChange={(event) => setUnlockPassword(event.target.value)}
          placeholder="Gift unlock password"
          className="w-full rounded-xl border border-white/35 bg-white/10 px-4 py-3 text-white placeholder:text-white/65 focus:border-white focus:outline-none"
        />
        <button
          onClick={handleUnlock}
          disabled={loading}
          className="romantic-btn w-full max-w-xs rounded-xl px-6 py-3 font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Unlocking... 💞' : 'Unlock 💘'}
        </button>
      </div>

      <AnimatePresence>
        {unlockError ? (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="mt-3 text-sm text-rose-100"
          >
            {unlockError}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}
