export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <span className="text-sm font-semibold tracking-tight">Max Adolfsson</span>
        <nav className="flex gap-6 text-sm text-zinc-500">
          <a href="#projects" className="hover:text-zinc-900 transition-colors">Work</a>
          <a href="#about" className="hover:text-zinc-900 transition-colors">About</a>
        </nav>
      </div>
    </header>
  );
}
