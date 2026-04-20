import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_35%),linear-gradient(180deg,#f8fafc_0%,#eef4fb_100%)] px-6">
      <div className="ui-card max-w-lg rounded-[28px] border border-slate-200 bg-white p-10 text-center shadow-[0_24px_80px_-44px_rgba(15,23,42,0.16)]">
        <h1 className="text-3xl font-bold text-slate-950">Page not found</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          The page you are looking for could not be found.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-2xl bg-[#0055FF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#004be0]"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

