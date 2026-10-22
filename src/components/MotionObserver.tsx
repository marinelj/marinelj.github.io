"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ANIMATED = ".reveal, .reveal-soft, .pop, .countup, .grow-x, .wipe, .deal";

/**
 * Entrance animations start in CSS at first paint. Ones below the fold would finish
 * before anyone sees them, so this rewinds them to their first frame and plays each
 * one as it scrolls into view. Runs again after every client-side navigation.
 */
export function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).style.animationPlayState = "running";
          observer.unobserve(entry.target);
        }
      },
      // Fire as soon as the top edge is comfortably on screen, however tall the element is.
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );

    const fold = window.innerHeight;
    for (const element of document.querySelectorAll<HTMLElement>(ANIMATED)) {
      if (element.getBoundingClientRect().top < fold) continue;
      element.style.animation = "none";
      void element.offsetWidth; // restart from the first frame…
      element.style.animation = "";
      element.style.animationPlayState = "paused"; // …and hold it until it is visible
      observer.observe(element);
    }
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
