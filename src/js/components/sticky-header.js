import { gsap } from "gsap";

export default function stickyHeader(scrollbar) {
  const el = document.querySelector(".nav");
  if (!el) return;

  const tl = gsap.timeline();

  tl.fromTo(
    el.querySelector(".nav__container"),
    { y: 0 },
    { y: 58 },
    "start"
  );

  tl.fromTo(
    el.querySelector(".logo"),
    { x: 0 },
    { x: -110 },
    "start+=0.3"
  );

  tl.fromTo(
    el.querySelectorAll(".logo__symbol"),
    { scale: 1, opacity: 1 },
    { scale: 0.6, opacity: 0 },
    "start"
  );

  tl.pause();

  scrollbar.addListener((status) => {
    const percentTransition = status.offset.y / 300;
    if (window.innerWidth > 1023) {
      tl.progress(percentTransition);
    }

    const y = status.offset.y - 135 * Math.min(percentTransition, 1);

    gsap.set(el, {
      y: window.innerWidth > 1023 ? y : status.offset.y,
    });
  });
}
