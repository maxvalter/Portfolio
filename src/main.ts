import "./style.css";
import { aboutParagraphs, experienceItems, profile } from "./content";
import profileImage from "../content/img/profile.png";
import { projects } from "./projects";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Missing #app mount point");
}

const monthYear = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
});

const getTimelineSortValue = (item: (typeof experienceItems)[number]) => {
  if (!item.time.end) {
    return Number.POSITIVE_INFINITY;
  }
  return item.time.end.getTime();
};

const sortedExperienceItems = [...experienceItems].sort(
  (a, b) => getTimelineSortValue(b) - getTimelineSortValue(a),
);

const experienceCards = sortedExperienceItems
  .map(
    (item, index) => `
      <article class="experience-card">
        <span class="experience-time">${monthYear.format(item.time.start)} - ${item.time.end ? monthYear.format(item.time.end) : "Present"}</span>
        <div class="experience-meta">
          <span>${item.company}</span>
        </div>
        <h3>${item.role}</h3>
        <p>${item.description}</p>
        <details class="experience-details">
          <summary aria-controls="experience-details-${index}">
            Read more
          </summary>
          <div id="experience-details-${index}" class="experience-details-content">
            ${item.details ? `<p>${item.details}</p>` : ""}
            ${
              item.images?.length
                ? `
              <div class="experience-media">
                ${item.images
                  .map(
                    (image) => `
                      <figure class="experience-media-item">
                        <img src="${image.src}" alt="${image.alt}" loading="lazy" />
                      </figure>
                    `,
                  )
                  .join("")}
              </div>
            `
                : ""
            }
          </div>
        </details>
      </article>
    `,
  )
  .join("");

const aboutMarkup = aboutParagraphs.map((paragraph) => `<p>${paragraph}</p>`).join("");

const setActiveSection = (sectionId: string, navLinks: HTMLAnchorElement[]) => {
  navLinks.forEach((link) => {
    const isActive = link.dataset.sectionLink === sectionId;
    link.classList.toggle("active", isActive);
    link.setAttribute("aria-current", isActive ? "true" : "false");
  });
};

const projectList = projects
  .map(
    (project, index) => `
      <li class="project-list-item">
        <a
          href="#project/${project.slug}"
          data-project-item="${project.slug}"
          class="project-list-link ${index === 0 ? "active" : ""}"
        >
          <span class="project-list-title">${project.shortTitle}</span>
          <span class="project-list-year">${project.year}</span>
        </a>
      </li>
    `,
  )
  .join("");

const getProjectHashSlug = () => {
  const match = window.location.hash.match(/^#project\/([^/]+)$/);
  return match?.[1] ?? null;
};

const renderHome = () => {
  const initialProject = projects[0];
  if (!initialProject) {
    throw new Error("Missing projects");
  }

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

          <div class="social-links" aria-label="Social links">
            <a href="https://www.linkedin.com/in/max-adolfsson-677297195/" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.84v1.7h.06c.53-1 1.83-2.06 3.76-2.06C21.2 8.64 23 10.58 23 14.2V21h-4v-6.02c0-1.43-.02-3.27-1.99-3.27-1.99 0-2.3 1.55-2.3 3.16V21h-4V9Z" />
              </svg>
            </a>
            <a href="https://github.com/maxvalter" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M12 .5C5.65.5.5 5.67.5 12.04c0 5.1 3.3 9.42 7.87 10.95.58.11.79-.25.79-.56v-2.15c-3.2.7-3.88-1.55-3.88-1.55-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.19 1.75 1.19 1.02 1.76 2.68 1.25 3.34.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.3-.51-1.47.11-3.07 0 0 .96-.31 3.14 1.19a10.9 10.9 0 0 1 5.72 0c2.18-1.5 3.13-1.2 3.13-1.2.63 1.61.24 2.78.12 3.08.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.35.78 1.03.78 2.08v3.08c0 .31.21.68.8.56a11.55 11.55 0 0 0 7.86-10.95C23.5 5.67 18.35.5 12 .5Z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/maxadolphsson/" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.9A3.85 3.85 0 0 0 3.9 7.75v8.5a3.85 3.85 0 0 0 3.85 3.85h8.5a3.85 3.85 0 0 0 3.85-3.85v-8.5a3.85 3.85 0 0 0-3.85-3.85h-8.5Zm8.95 1.45a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.9a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2Z" />
              </svg>
            </a>
          </div>
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
          <div class="projects-showcase">
            <a href="#project/${initialProject.slug}" class="project-preview-card active" data-project-card>
              <figure class="project-preview-image-wrap">
                ${
                  initialProject.heroImage
                    ? `<img src="${initialProject.heroImage}" alt="${initialProject.title}" class="project-preview-image" />`
                    : `<div class="project-image-placeholder" aria-hidden="true"></div>`
                }
              </figure>
              <div class="project-preview-content">
                <h3>${initialProject.title}</h3>
                <p>${initialProject.overview}</p>
              </div>
            </a>
            <div class="project-list-column">
              <ul class="project-list">
                ${projectList}
              </ul>
              <p class="project-list-hint">Hover to preview. Click to open full case page.</p>
            </div>
          </div>
        </section>
      </section>
    </main>
  `;
};

const renderProjectDetail = (slug: string) => {
  const project = projects.find((item) => item.slug === slug);
  if (!project) {
    window.location.hash = "#projects";
    return;
  }

  const relatedProjects = projects.filter((item) => item.slug !== project.slug).slice(0, 2);

  app.innerHTML = `
    <main class="project-page">
      <a href="#projects" class="project-back-link">Back to projects</a>

      <section class="project-page-header">
        <p>${project.category} • ${project.year} • ${project.timeframe}</p>
        <h1>${project.title}</h1>
        <p class="project-page-overview">${project.overview}</p>
        <div class="tag-list">
          ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
        </div>
      </section>

      ${
        project.heroImage
          ? `<img src="${project.heroImage}" alt="${project.title} hero" class="project-page-hero" />`
          : `<div class="project-page-hero placeholder" aria-hidden="true"></div>`
      }

      <section class="project-page-details">
        <article class="project-page-detail-card">
          <h2>Teaser</h2>
          <p>${project.teaser}</p>
        </article>
        <article class="project-page-detail-card">
          <h2>Case Story</h2>
          <p>${project.longdesc}</p>
        </article>
      </section>

      <section class="project-page-related">
        <h2>More Projects</h2>
        <div class="project-related-grid">
          ${relatedProjects
            .map(
              (item) => `
                <a href="#project/${item.slug}" class="project-related-link">
                  <h3>${item.title}</h3>
                  <p>${item.teaser}</p>
                </a>
              `,
            )
            .join("")}
        </div>
      </section>
    </main>
  `;
};

const setupHomeInteractions = () => {
  const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-section-link]"));
  const pageSections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleSections[0]) {
        const activeId = visibleSections[0].target.getAttribute("data-section");
        if (activeId) {
          setActiveSection(activeId, navLinks);
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
      setActiveSection(targetId, navLinks);
      history.replaceState(null, "", `#${targetId}`);
    });
  });

  const previewCard = document.querySelector<HTMLAnchorElement>("[data-project-card]");
  const projectItems = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-project-item]"));

  if (!previewCard || projectItems.length === 0) {
    return;
  }

  const setActiveProject = (slug: string) => {
    const project = projects.find((item) => item.slug === slug);
    if (!project) {
      return;
    }

    projectItems.forEach((item) => item.classList.toggle("active", item.dataset.projectItem === slug));
    previewCard.classList.add("active");
    previewCard.setAttribute("href", `#project/${project.slug}`);
    previewCard.innerHTML = `
      <figure class="project-preview-image-wrap">
        ${
          project.heroImage
            ? `<img src="${project.heroImage}" alt="${project.title}" class="project-preview-image" />`
            : `<div class="project-image-placeholder" aria-hidden="true"></div>`
        }
      </figure>
      <div class="project-preview-content">
        <h3>${project.title}</h3>
        <p>${project.overview}</p>
      </div>
    `;
  };

  projectItems.forEach((item) => {
    const slug = item.dataset.projectItem;
    if (!slug) {
      return;
    }

    item.addEventListener("mouseenter", () => setActiveProject(slug));
    item.addEventListener("focus", () => setActiveProject(slug));
  });
};

const renderApp = () => {
  const projectSlug = getProjectHashSlug();
  if (projectSlug) {
    renderProjectDetail(projectSlug);
    return;
  }

  renderHome();
  setupHomeInteractions();

  const hashTarget = window.location.hash.replace("#", "");
  if (hashTarget) {
    const section = document.getElementById(hashTarget);
    section?.scrollIntoView({ block: "start" });
  }
};

window.addEventListener("hashchange", renderApp);
renderApp();

const setupCustomCursor = () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

  if (prefersReducedMotion || hasCoarsePointer) {
    return;
  }

  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  cursor.innerHTML = '<span class="custom-cursor-dot" aria-hidden="true"></span>';

  document.body.appendChild(cursor);
  document.body.classList.add("has-custom-cursor");

  let targetX = window.innerWidth * 0.5;
  let targetY = window.innerHeight * 0.5;
  let currentX = targetX;
  let currentY = targetY;
  let targetScale = 1;
  let currentScale = 1;
  let isPressed = false;
  let isHoveringInteractive = false;
  let isScrolling = false;
  let scrollTimeout = 0;

  const updateScaleTarget = () => {
    if (isPressed) {
      targetScale = 0.78;
      return;
    }

    if (isHoveringInteractive) {
      targetScale = 1.24;
      return;
    }

    targetScale = isScrolling ? 1.1 : 1;
  };

  const animateCursor = () => {
    currentX += (targetX - currentX) * 0.16;
    currentY += (targetY - currentY) * 0.16;
    currentScale += (targetScale - currentScale) * 0.18;

    cursor.style.transform = `translate3d(${currentX - 22}px, ${currentY - 22}px, 0) scale(${currentScale})`;

    requestAnimationFrame(animateCursor);
  };

  requestAnimationFrame(animateCursor);

  const updateInteractiveState = (eventTarget: EventTarget | null) => {
    const element = eventTarget instanceof Element ? eventTarget : null;

    isHoveringInteractive = Boolean(
      element?.closest(
        "a, button, summary, [role='button'], [data-section-link], input, textarea, select, label",
      ),
    );

    cursor.classList.toggle("is-hovering", isHoveringInteractive);
    updateScaleTarget();
  };

  document.addEventListener("pointermove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    cursor.classList.add("is-visible");
    updateInteractiveState(event.target);
  });

  document.addEventListener("pointerdown", () => {
    isPressed = true;
    cursor.classList.add("is-pressed");
    updateScaleTarget();
  });

  document.addEventListener("pointerup", () => {
    isPressed = false;
    cursor.classList.remove("is-pressed");
    updateScaleTarget();
  });

  document.addEventListener("pointerleave", () => {
    cursor.classList.remove("is-visible");
  });

  document.addEventListener(
    "scroll",
    () => {
      isScrolling = true;
      cursor.classList.add("is-scrolling");
      updateScaleTarget();

      window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        isScrolling = false;
        cursor.classList.remove("is-scrolling");
        updateScaleTarget();
      }, 150);
    },
    { passive: true },
  );
};

setupCustomCursor();
