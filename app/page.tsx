'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName })
      });

      if (!response.ok) {
        const payload = await response.json();
        setError(payload.error ?? 'Name verification failed.');
        return;
      }

      router.push('/surprise');
      router.refresh();
    } catch {
      setError('Unexpected error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center px-5">
      <motion.section
        className="glass-panel w-full max-w-xl rounded-3xl p-8 shadow-glass md:p-10"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <motion.div
          className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500/95 to-indigo-500/95 text-4xl shadow-[0_0_45px_-16px_rgba(236,72,153,0.9)]"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.25, repeat: Infinity, ease: 'easeInOut' }}
        >
          💗
        </motion.div>
        <p className="mb-2 text-center text-sm uppercase tracking-[0.28em] text-rose-100/80">Private Entrance</p>
        <h1 className="text-center font-[var(--font-heading)] text-3xl leading-tight text-white md:text-5xl">
          Hello, Beautiful ⚡️
        </h1>
        <p className="mt-3 text-center text-lg text-rose-100/85">Prove that you are her by writing your full name ❤️</p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Idhar likho, Hint ni dunga 😤"
            className="w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/65 focus:border-white focus:outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="romantic-btn mx-auto block w-full max-w-xs rounded-xl px-4 py-3 text-center font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Verifying... 💕' : 'See what\'s inside 💖'}
          </button>
        </form>

        <AnimatePresence>
          {error ? (
            <motion.p
              className="mt-4 text-center text-sm text-rose-100"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
            >
              {error}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </motion.section>
    </main>
  );
}
