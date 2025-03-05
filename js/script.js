// Update navigation logic
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

// Smooth scroll to section
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    // Update active class
    navLinks.forEach((nav) => nav.classList.remove("active-nav"));
    link.classList.add("active-nav");

    // Scroll to section
    targetSection.scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Update active nav on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          const linkId = link.getAttribute("href").slice(1);
          link.classList.remove("active-nav");
          if (linkId === id) {
            link.classList.add("active-nav");
          }
        });
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach((section) => observer.observe(section));

// Handle browser history
window.addEventListener("popstate", () => {
  const hash = window.location.hash;
  if (hash) {
    const section = document.querySelector(hash);
    section?.scrollIntoView();
  }
});
// Add dynamic position adjustments
document.addEventListener("DOMContentLoaded", () => {
  const dotsContainer = document.createElement("div");
  dotsContainer.className = "gradient-dots-container";

  const positions = [
    { top: "20%", left: "10%", color: "var(--dot-color-1)" },
    { top: "60%", right: "15%", color: "var(--dot-color-2)" },
    { bottom: "10%", left: "30%", color: "var(--dot-color-3)" },
  ];

  positions.forEach((pos, index) => {
    const dot = document.createElement("div");
    dot.className = "gradient-dot";
    dot.dataset.dot = index + 1;
    Object.assign(dot.style, pos);
    dotsContainer.appendChild(dot);
  });

  document.body.insertBefore(
    dotsContainer,
    document.querySelector(".bg-blur").nextSibling
  );
});
