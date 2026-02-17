import { promises as fs } from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import GiftCard from '@/components/GiftCard';
import { isAuthenticatedCookie, SESSION_COOKIE_NAME } from '@/lib/auth';

type Gift = {
  id: string;
  title: string;
  image: string;
  loadergiftimage: string;
  message1: string;
  message2: string;
  amount: string;
};

async function getGiftCards(): Promise<Gift[]> {
  const filePath = path.join(process.cwd(), 'data', 'gifts.json');
  const file = await fs.readFile(filePath, 'utf8');
  return JSON.parse(file) as Gift[];
}

export default async function GiftsPage() {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (!isAuthenticatedCookie(sessionCookie)) {
    redirect('/');
  }

  const gifts = await getGiftCards();

  return (
    <main className="min-h-screen px-5 py-12 md:px-8">
      <section className="mx-auto w-full max-w-7xl">
        <header className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-rose-100/85">Collection</p>
          <h1 className="mt-2 font-[var(--font-heading)] text-4xl text-white md:text-5xl">I Love You my Shaal ❤️</h1>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {gifts.map((gift) => (
            <GiftCard key={gift.id} gift={gift} />
          ))}
        </div>
      </section>
    </main>
  );
}
