export default function Hero() {
  return (
    <section className="flex min-h-screen flex-col justify-center px-6 pt-14">
      <div className="mx-auto w-full max-w-5xl">
        <p className="mb-4 text-sm uppercase tracking-widest text-zinc-400">Designer & Developer</p>
        <h1 className="max-w-2xl text-5xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-6xl">
          Building with care for visuals and functionality.
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-500">
          A collection of projects spanning design, development, and everything in between.
        </p>
        <a
          href="#projects"
          className="mt-10 inline-block text-sm font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-500 transition-colors"
        >
          See the work
        </a>
      </div>
    </section>
  );
}
