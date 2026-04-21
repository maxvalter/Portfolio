(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`I am a frontend engineer focused on inclusive interfaces, clean architecture, and practical product outcomes. My work sits at the intersection of design and engineering, where polish and usability are first-class goals.
`,t=`I enjoy taking products from rough idea to stable release through thoughtful implementation, strong collaboration, and a details-first approach that keeps user experience central.
`,n=`Maintaining and evolving a design system through reusable components, tooling, and accessibility-first standards.
`,r=`Delivered product experiences across startups and client projects with attention to detail, performance, and maintainability.
`,i=e=>e.trim(),a={name:`Max Adolfsson`,title:`Frontend Engineer`,tagline:`Building thoughtful, accessible web experiences.`},o=[i(e),i(t)],s=[{role:`Frontend Engineer`,company:`Klaviyo`,period:`2024 - Present`,description:i(n)},{role:`Product-Focused Frontend Collaborator`,company:`Freelance + Team Projects`,period:`2022 - 2024`,description:i(r)}],c=`/assets/profile-DBS6jvTB.png`,l=`For the bicycle store And-The-Revolution I have made cleaned up the wordpress site to use styling according to the design system, redesigned product pages to extend interaction, and given their bicycle builder a quick improvement in user experience.

`,u=`A playful API experiment that explores listening patterns and presents music identity snapshots in a more personal, visual way.
`,d=`A mobile web application to assist the tracking of workouts within the StrongLift weight-lifting program. Features progress tracking within each workout, and saves data for viewing progress in weights over time. 

`,f=`A research-driven thesis project from discovery to concept, focused on improving first-use confidence and clarity in complex service experiences.
`,p=e=>e.trim(),m=[{title:`Thesis Work`,category:`Research + Product Design`,timeframe:`12 weeks`,year:`2024`,tags:[`academic`,`ux`,`service design`],teaser:p(f)},{title:`Bike Shop WordPress Site`,category:`Web Design + WordPress`,timeframe:`6 weeks`,year:`2023`,tags:[`client work`,`wordpress`,`frontend`],teaser:p(l)},{title:`Stronglift Assistant`,category:`Side Project`,timeframe:`Ongoing`,year:`2023`,tags:[`side project`,`fitness`,`personal growth`],teaser:p(d)},{title:`Recordfreak`,category:`Spotify API Experiment`,timeframe:`WIP`,year:`WIP`,tags:[`side project`,`entertainment`,`api`],teaser:p(u)}],h=document.querySelector(`#app`);if(!h)throw Error(`Missing #app mount point`);var g=m.map(e=>`
      <article class="project-card">
        <div class="project-meta">
          <span>${e.category}</span>
          <span>${e.timeframe}</span>
          <span>${e.year}</span>
        </div>
        <h3>${e.title}</h3>
        <p>${e.teaser}</p>
        <div class="tag-list">
          ${e.tags.map(e=>`<span>${e}</span>`).join(``)}
        </div>
      </article>
    `).join(``),_=s.map(e=>`
      <article class="experience-card">
        <div class="experience-meta">
          <span>${e.company}</span>
          <span>${e.period}</span>
        </div>
        <h3>${e.role}</h3>
        <p>${e.description}</p>
      </article>
    `).join(``),v=o.map(e=>`<p>${e}</p>`).join(``);h.innerHTML=`
  <main class="layout">
    <aside class="left-rail">
      <div class="left-inner">
        <div>
          <h1 class="name">${a.name}</h1>
          <p class="title">${a.title}</p>
          <p class="tagline">${a.tagline}</p>
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
          <img src="${c}" alt="${a.name}" class="profile-image" />
        </figure>
        <h2>About</h2>
        <div class="about-copy">${v}</div>
      </section>

      <section id="experience" class="content-section" data-section="experience">
        <h2>Experience</h2>
        <div class="experience-grid">
          ${_}
        </div>
      </section>

      <section id="projects" class="content-section" data-section="projects">
        <h2>Projects</h2>
        <div class="projects">
          ${g}
        </div>
      </section>
    </section>
  </main>
`;var y=Array.from(document.querySelectorAll(`[data-section-link]`)),b=Array.from(document.querySelectorAll(`[data-section]`)),x=e=>{y.forEach(t=>{let n=t.dataset.sectionLink===e;t.classList.toggle(`active`,n),t.setAttribute(`aria-current`,n?`true`:`false`)})},S=new IntersectionObserver(e=>{let t=e.filter(e=>e.isIntersecting).sort((e,t)=>t.intersectionRatio-e.intersectionRatio);if(t[0]){let e=t[0].target.getAttribute(`data-section`);e&&x(e)}},{threshold:[.35,.55,.75],rootMargin:`-15% 0px -40% 0px`});b.forEach(e=>S.observe(e)),y.forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=e.dataset.sectionLink;if(!n)return;let r=document.querySelector(`[data-section="${n}"]`);r&&(r.scrollIntoView({behavior:`smooth`,block:`start`}),x(n),history.replaceState(null,``,`#${n}`))})});