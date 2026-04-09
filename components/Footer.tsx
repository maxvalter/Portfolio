export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 px-6 py-8">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between text-sm text-zinc-400">
        <span>Max Adolfsson</span>
        <span>{new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
