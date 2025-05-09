import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">HDW-TRAINING-NEXTJS</h2>
        <p className="max-w-xl text-gray-600">
          Thank you so much for taking the time to guide me. I really appreciate your support and
          I&apos;ll do my best to improve every day.
        </p>
        <Link
          href="/todo-list"
          className="mt-4 inline-block rounded bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
        >
          Get Started
        </Link>
      </main>
    </div>
  );
}
