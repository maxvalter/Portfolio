import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectImage } from "@/components/ProjectImage";
import { getProjectBySlug, projectSlugs, projects } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: `${project.title} — Max Adolfsson`,
    description: project.teaser,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="px-6 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/#projects"
          className="text-sm font-medium text-zinc-500 underline-offset-4 transition-colors hover:text-zinc-900 hover:underline"
        >
          Back to projects
        </Link>

        <section className="mt-8">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            {project.category} • {project.year} • {project.timeframe}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            {project.overview}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        <ProjectImage
          src={project.heroImage}
          alt={`${project.title} hero visual`}
          className="mt-10 h-[420px] w-full rounded-3xl border border-zinc-200 object-cover"
        />

        <section className="mt-14 grid gap-8 sm:grid-cols-3">
          {project.detailSections.map((section) => (
            <article
              key={section.heading}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6"
            >
              <h2 className="text-lg font-semibold text-zinc-900">
                {section.heading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                {section.body}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Gallery
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {project.galleryImages.map((image, index) => (
              <ProjectImage
                key={`${project.slug}-gallery-${index}`}
                src={image}
                alt={`${project.title} gallery image ${index + 1}`}
                className="h-64 w-full rounded-2xl border border-zinc-200 object-cover"
              />
            ))}
          </div>
        </section>

        <section className="mt-14 border-t border-zinc-200 pt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
            More Work
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {projects
              .filter((item) => item.slug !== project.slug)
              .slice(0, 2)
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/projects/${item.slug}`}
                  className="rounded-xl border border-zinc-200 p-4 transition-colors hover:bg-zinc-50"
                >
                  <p className="font-medium text-zinc-900">{item.title}</p>
                  <p className="mt-1 text-sm text-zinc-600">{item.teaser}</p>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
