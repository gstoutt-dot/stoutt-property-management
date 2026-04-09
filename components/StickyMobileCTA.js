export default function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-slate-950/95 p-3 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-7xl gap-3">
        <a
          href="/proposal"
          className="flex-1 inline-flex items-center justify-center rounded-full bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          Request a Proposal
        </a>
        <a
          href="https://glennstoutt.com"
          target="_blank"
          rel="noreferrer"
          className="flex-1 inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
        >
          Founder Story
        </a>
      </div>
    </div>
  );
}
