import { Link } from 'wouter';

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center p-8">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">Page unavailable</p>
        <h1 className="mt-3 text-3xl font-bold">This route is not in the blueprint.</h1>
        <Link href="/" className="mt-6 inline-block text-sm font-semibold text-primary hover:underline">Return to overview</Link>
      </div>
    </main>
  );
}
