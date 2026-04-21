import "./style.css";
import { projects } from "./projects";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Missing #app mount point");
}

const projectCards = projects
  .map(
    (project) => `
      <article class="project-card">
        <div class="project-meta">
          <span>${project.category}</span>
          <span>${project.timeframe}</span>
          <span>${project.year}</span>
        </div>
        <h3>${project.title}</h3>
        <p>${project.teaser}</p>
        <div class="tag-list">
          ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
        </div>
      </article>
    `,
  )
  .join("");

app.innerHTML = `
  <main class="site-shell">
    <header class="hero">
      <p class="eyebrow">Max Adolfsson</p>
      <h1>Designer ambition, frontend craft, and real project delivery.</h1>
      <p class="intro">
        A clean static portfolio focused on thesis work, client results, and side projects.
      </p>
    </header>

    <section class="projects">
      ${projectCards}
    </section>
  </main>
`;
