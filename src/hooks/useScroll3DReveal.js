import { useEffect } from "react";

export function useScroll3DReveal() {
  useEffect(() => {
    // Select all cards, headers, and key interactive blocks
    const targetSelectors = [
      ".section-header",
      ".about-bio-card",
      ".highlight-card",
      ".experience-card",
      ".skill-category-card",
      ".project-card",
      ".contact-info-panel",
      ".contact-form-panel",
      ".hero-metrics",
    ];

    const elements = document.querySelectorAll(targetSelectors.join(", "));

    elements.forEach((el, index) => {
      el.classList.add("scroll-3d-reveal");
      // Add staggered transition delay based on position
      const staggerDelay = (index % 4) * 0.08;
      el.style.transitionDelay = `${staggerDelay}s`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-3d-revealed");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);
}

export default useScroll3DReveal;
