import "./style.css";
import { aboutText, experienceItems, profile } from "./content";
import profileImage from "../content/img/maxproffsigt.jpg";
import { projects } from "./projects";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Missing #app mount point");
}

const monthYear = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
});

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const formatTagsPiped = (tags: string[]) => tags.map(escapeHtml).join(" | ");

/** Lines like `- item` or `* item` (one block = separated by a blank line). */
const bulletLine = /^\s*[-*]\s+(.+)$/;

const renderParagraphBlock = (block: string): string => {
  const trimmed = block.trim();
  const lines = trimmed
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length === 0) {
    return "";
  }
  const allBullets = lines.every((line) => bulletLine.test(line));
  if (allBullets) {
    const items = lines
      .map((line) => {
        const match = line.match(bulletLine);
        return match ? `<li>${escapeHtml(match[1])}</li>` : "";
      })
      .filter(Boolean)
      .join("");
    return `<ul>${items}</ul>`;
  }
  return `<p>${escapeHtml(trimmed)}</p>`;
};

const renderParagraphs = (value: string) =>
  value
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map(renderParagraphBlock)
    .join("");

const aboutMarkup = aboutText
  .split(/\n\s*\n/)
  .map((block) => block.trim())
  .filter(Boolean)
  .map(renderParagraphBlock)
  .join("");

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
      <div class="experience-entry">
        <span class="experience-time">${monthYear.format(item.time.start)} - ${item.time.end ? monthYear.format(item.time.end) : "Present"}</span>
        <article class="experience-card">
          <div class="experience-meta">
            <span>${item.company}</span>
          </div>
          <h3>${item.role}</h3>
          <details class="experience-details">
            <summary aria-controls="experience-details-${index}" aria-label="Toggle experience details">
              <svg class="experience-details-toggle" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                <path d="M5 7.5L10 12.5L15 7.5" />
              </svg>
            </summary>
            <div id="experience-details-${index}" class="experience-details-content">
              <p>${item.description}</p>
              ${item.details ? `<p>${item.details}</p>` : ""}
            </div>
          </details>
        </article>
      </div>
    `,
  )
  .join("");

const setActiveSection = (sectionId: string, navLinks: HTMLAnchorElement[]) => {
  navLinks.forEach((link) => {
    const isActive = link.dataset.sectionLink === sectionId;
    link.classList.toggle("active", isActive);
    link.setAttribute("aria-current", isActive ? "true" : "false");
  });
};

const projectCards = projects
  .map(
    (project) => `
      <a href="#project/${project.slug}" class="project-card project-card--${escapeHtml(project.slug)}">
        <figure class="project-card-thumb" aria-hidden="true">
          ${project.previewImage
            ? `<img src="${project.previewImage}" alt="" class="project-card-img" loading="lazy" />`
            : `<div class="project-card-img-placeholder"></div>`
          }
        </figure>
        <div class="project-card-body">
          <div class="project-card-meta">
            <span class="project-card-year">${escapeHtml(project.year)}</span>
          </div>
          <h3 class="project-card-title">${escapeHtml(project.title)}</h3>
          <p class="project-card-desc">${escapeHtml(project.overview)}</p>
          ${project.tags.length > 0 ? `<p class="project-card-tags-line">${formatTagsPiped(project.tags)}</p>` : ""}
        </div>
      </a>
    `,
  )
  .join("");

const getProjectHashSlug = () => {
  const match = window.location.hash.match(/^#project\/([^/]+)$/);
  return match?.[1] ?? null;
};

const renderHome = () => {
  app.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="sidebar-inner">
          <div class="sidebar-top">
            <h1 class="name">${profile.name}</h1>
            <p class="title">${profile.title}</p>
            <p class="tagline">${profile.tagline}</p>
          </div>

          <nav class="section-nav" aria-label="Page sections">
            <a href="#projects" class="nav-link active" data-section-link="projects">Projects</a>
            <a href="#experience" class="nav-link" data-section-link="experience">Experience</a>
            <a href="#about" class="nav-link" data-section-link="about">About</a>
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
            <a href="mailto:maxvadolfsson@gmail.com" class="social-link" aria-label="Email">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2.75" y="5" width="18.5" height="14" rx="1.5" fill="none" />
                <path d="M3.5 6.5 L12 12.5 L20.5 6.5" fill="none" />
              </svg>
            </a>
          </div>
        </div>
      </aside>

      <main class="content-area" aria-label="Portfolio content">
        <section id="projects" class="content-section" data-section="projects">
          <h2>Projects</h2>
          <div class="project-cards-list">
            ${projectCards}
          </div>
        </section>

        <section id="experience" class="content-section" data-section="experience">
          <h2>Experience</h2>
          <div class="experience-grid">
            ${experienceCards}
          </div>
        </section>

        <section id="about" class="content-section" data-section="about">
          <h2>About</h2>
          <div class="about-card">
            <figure class="about-card-figure" aria-label="Profile photo">
              <img src="${profileImage}" alt="${profile.name}" class="profile-image" />
            </figure>
            <div class="about-card-body">
              <div class="about-copy">${aboutMarkup}</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  `;
};

const setupBeforeAfterZoom = () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

  if (prefersReducedMotion || hasCoarsePointer) {
    return;
  }

  const ZOOM_SCALE = 3;

  document.querySelectorAll<HTMLImageElement>(".before-after-figure img").forEach((img) => {
    if (img.parentElement?.dataset.zoom !== undefined) {
      return;
    }

    const zoom = document.createElement("div");
    zoom.className = "before-after-zoom";
    zoom.dataset.zoom = "";
    img.parentNode?.insertBefore(zoom, img);
    zoom.appendChild(img);

    const reset = () => {
      zoom.classList.remove("is-zooming");
      img.style.transform = "";
      img.style.transformOrigin = "";
    };

    const updateZoom = (clientX: number, clientY: number) => {
      const rect = zoom.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      img.style.transformOrigin = `${x}% ${y}%`;
      img.style.transform = `scale(${ZOOM_SCALE})`;
    };

    zoom.addEventListener("pointerenter", (event) => {
      zoom.classList.add("is-zooming");
      updateZoom(event.clientX, event.clientY);
    });

    zoom.addEventListener("pointermove", (event) => {
      updateZoom(event.clientX, event.clientY);
    });

    zoom.addEventListener("pointerleave", reset);
  });
};

const setupBeforeAfterCarousels = () => {
  document.querySelectorAll<HTMLElement>("[data-carousel]").forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll<HTMLElement>("[data-slide]"));
    if (slides.length === 0) {
      return;
    }

    const titleEl = carousel.querySelector<HTMLElement>("[data-carousel-title]");
    const descriptionEl = carousel.querySelector<HTMLElement>("[data-carousel-description]");
    const counterEl = carousel.querySelector<HTMLElement>("[data-carousel-counter]");
    const prevBtn = carousel.querySelector<HTMLButtonElement>("[data-carousel-prev]");
    const nextBtn = carousel.querySelector<HTMLButtonElement>("[data-carousel-next]");
    const labels = slides.map((slide) => slide.dataset.carouselLabel ?? "");
    const descriptions = slides.map((slide) => slide.dataset.carouselDescription ?? "");

    let current = slides.findIndex((slide) => slide.classList.contains("before-after-slide--active"));
    if (current < 0) {
      current = 0;
    }

    const goTo = (index: number) => {
      slides[current].classList.remove("before-after-slide--active");
      slides[current].setAttribute("aria-hidden", "true");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("before-after-slide--active");
      slides[current].setAttribute("aria-hidden", "false");
      if (titleEl) {
        titleEl.textContent = labels[current];
      }
      if (descriptionEl) {
        const description = descriptions[current];
        descriptionEl.textContent = description;
        descriptionEl.hidden = description.length === 0;
      }
      if (counterEl) {
        counterEl.textContent = `${current + 1} / ${slides.length}`;
      }
    };

    goTo(current);

    if (prevBtn) {
      prevBtn.disabled = slides.length <= 1;
      prevBtn.addEventListener("click", () => goTo(current - 1));
    }
    if (nextBtn) {
      nextBtn.disabled = slides.length <= 1;
      nextBtn.addEventListener("click", () => goTo(current + 1));
    }
  });
};

const renderProjectDetail = (slug: string) => {
  const project = projects.find((item) => item.slug === slug);
  if (!project) {
    window.location.hash = "#projects";
    return;
  }

  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  app.innerHTML = `
    <main class="project-page project-page--${escapeHtml(project.slug)}">
      <header class="project-page-header">
        <a href="#projects" class="project-back-link">← Back to projects</a>
      </header>

      <div class="project-content">
        ${project.bodyHtml}
      </div>

      <footer class="project-page-footer">
        <nav class="project-page-sibling-nav" aria-label="Project navigation">
          ${prevProject
            ? `<a href="#project/${prevProject.slug}" class="project-sibling-link">← Previous Project</a>`
            : `<span></span>`
          }
          ${nextProject
            ? `<a href="#project/${nextProject.slug}" class="project-sibling-link project-sibling-link--next">Next Project →</a>`
            : `<span></span>`
          }
        </nav>
      </footer>
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

  document.querySelectorAll<HTMLElement>(".experience-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest("summary")) {
        return;
      }

      const details = card.querySelector<HTMLDetailsElement>(".experience-details");
      if (details) {
        details.open = !details.open;
      }
    });
  });

};

const renderApp = () => {
  const projectSlug = getProjectHashSlug();
  if (projectSlug) {
    renderProjectDetail(projectSlug);
    setupBeforeAfterCarousels();
    setupBeforeAfterZoom();
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
  cursor.innerHTML =
    '<span class="custom-cursor-inner"><span class="custom-cursor-dot" aria-hidden="true"></span></span>';

  document.body.appendChild(cursor);
  document.body.classList.add("has-custom-cursor");

  const cursorSize = 28;
  const cursorOffset = cursorSize / 2;
  let pointerX = window.innerWidth * 0.5;
  let pointerY = window.innerHeight * 0.5;
  let isPressed = false;
  let isHoveringInteractive = false;
  let scrollTimeout = 0;

  const updateCursorPosition = () => {
    const scale = isPressed ? 0.85 : 1;

    cursor.style.transform = `translate3d(${pointerX - cursorOffset}px, ${pointerY - cursorOffset}px, 0) scale(${scale})`;
  };

  updateCursorPosition();

  const updateInteractiveState = (eventTarget: EventTarget | null) => {
    const element = eventTarget instanceof Element ? eventTarget : null;

    isHoveringInteractive = Boolean(
      element?.closest(
        "a, button, summary, [role='button'], [data-section-link], input, textarea, select, label",
      ),
    );

    cursor.classList.toggle("is-hovering", isHoveringInteractive);
    updateCursorPosition();
  };

  document.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    cursor.classList.add("is-visible");
    updateInteractiveState(event.target);
  });

  document.addEventListener("pointerdown", () => {
    isPressed = true;
    cursor.classList.add("is-pressed");
    updateCursorPosition();
  });

  document.addEventListener("pointerup", () => {
    isPressed = false;
    cursor.classList.remove("is-pressed");
    updateCursorPosition();
  });

  document.addEventListener("pointerleave", () => {
    cursor.classList.remove("is-visible");
  });

  document.addEventListener(
    "scroll",
    () => {
      cursor.classList.add("is-scrolling");

      window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        cursor.classList.remove("is-scrolling");
      }, 150);
    },
    { passive: true },
  );
};

setupCustomCursor();
