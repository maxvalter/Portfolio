import "./style.css";
import { aboutParagraphs, experienceItems, profile } from "./content";
import profileImage from "../content/img/profile.png";
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

const experienceCards = experienceItems
  .map(
    (item) => `
      <article class="experience-card">
        <div class="experience-meta">
          <span>${item.company}</span>
          <span>${item.period}</span>
        </div>
        <h3>${item.role}</h3>
        <p>${item.description}</p>
      </article>
    `,
  )
  .join("");

const aboutMarkup = aboutParagraphs.map((paragraph) => `<p>${paragraph}</p>`).join("");

app.innerHTML = `
  <main class="layout">
    <aside class="left-rail">
      <div class="left-inner">
        <div>
          <h1 class="name">${profile.name}</h1>
          <p class="title">${profile.title}</p>
          <p class="tagline">${profile.tagline}</p>
        </div>

        <nav class="section-nav" aria-label="Page sections">
          <a href="#about" class="nav-link active" data-section-link="about">About</a>
          <a href="#experience" class="nav-link" data-section-link="experience">Experience</a>
          <a href="#projects" class="nav-link" data-section-link="projects">Projects</a>
        </nav>
      </div>
    </aside>

    <section class="content" aria-label="Portfolio content">
      <section id="about" class="content-section" data-section="about">
        <figure class="profile-collage" aria-label="Profile image collage">
          <span class="collage-layer collage-layer-soft"></span>
          <img src="${profileImage}" alt="${profile.name}" class="profile-image" />
        </figure>
        <h2>About</h2>
        <div class="about-copy">${aboutMarkup}</div>
      </section>

      <section id="experience" class="content-section" data-section="experience">
        <h2>Experience</h2>
        <div class="experience-grid">
          ${experienceCards}
        </div>
      </section>

      <section id="projects" class="content-section" data-section="projects">
        <h2>Projects</h2>
        <div class="projects">
          ${projectCards}
        </div>
      </section>
    </section>
  </main>
`;

const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-section-link]"));
const pageSections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));

const setActiveSection = (sectionId: string) => {
  navLinks.forEach((link) => {
    const isActive = link.dataset.sectionLink === sectionId;
    link.classList.toggle("active", isActive);
    link.setAttribute("aria-current", isActive ? "true" : "false");
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    const visibleSections = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visibleSections[0]) {
      const activeId = visibleSections[0].target.getAttribute("data-section");
      if (activeId) {
        setActiveSection(activeId);
      }
    }
  },
  {
    threshold: [0.35, 0.55, 0.75],
    rootMargin: "-15% 0px -40% 0px",
  },
);

pageSections.forEach((section) => observer.observe(section));

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const targetId = link.dataset.sectionLink;
    if (!targetId) {
      return;
    }

    const targetSection = document.querySelector<HTMLElement>(`[data-section="${targetId}"]`);
    if (!targetSection) {
      return;
    }

    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(targetId);
    history.replaceState(null, "", `#${targetId}`);
  });
});
