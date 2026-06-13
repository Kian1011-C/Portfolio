export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="border-t border-white/6 py-8 px-6 lg:px-12"
      role="contentinfo"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-mono text-slate-600">
          &copy; {year} Khai Nguyen Phuong. All rights reserved.
        </p>
        <p className="text-xs font-mono text-slate-700">
          Built with Next.js &middot; TypeScript &middot; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
