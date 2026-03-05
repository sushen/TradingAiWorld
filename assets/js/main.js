const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = Array.from(document.querySelectorAll(".nav-menu a"));
const revealElements = document.querySelectorAll(".reveal");
const sectionTargets = document.querySelectorAll("main section[id]");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("in-view"));
}

if ("IntersectionObserver" in window && sectionTargets.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const currentId = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${currentId}`;
          link.classList.toggle("is-active", isActive);
        });
      });
    },
    {
      rootMargin: "-40% 0px -45% 0px",
      threshold: 0.1
    }
  );

  sectionTargets.forEach((section) => sectionObserver.observe(section));
}
