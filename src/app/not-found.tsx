import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-lg rounded-[28px] border border-slate-700/60 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-10 text-center shadow-card">
        <h1 className="text-3xl font-bold text-slate-100">Page not found</h1>
        <p className="mt-4 text-base leading-7 text-slate-300">
          The page you are looking for could not be found.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

