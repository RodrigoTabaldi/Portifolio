"use client";

import { useEffect } from "react";

export function Motion() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]").forEach((node) => {
      node.classList.add("will-reveal");
      observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);
  return null;
}
