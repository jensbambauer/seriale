import {TweenLite, TimelineLite} from "gsap";


export default function stickyHeader(scrollbar) {
  const el = document.querySelector(".nav");
  const tl = new TimelineLite();

  tl.fromTo(el.querySelector(".nav__container"), 1, {
    y: 0
  }, {
    y: 58
  }, "start");

  tl.fromTo(el.querySelector(".logo"), 0.5, {
    x: 0
  }, {
    x: -110
  }, "start+=0.3");

  tl.fromTo(el.querySelector(".logo__symbol"), 0.5, {
    scale: 1,
    opacity: 1
  }, {
    scale: 0.6,
    opacity: 0
  }, "start");

  tl.pause();

  scrollbar.addListener((status) => {
    const percentTransition = status.offset.y / 300;
    tl.progress(percentTransition);

    const y = status.offset.y - (135 * Math.min(percentTransition, 1));

    TweenLite.set(el, {
      y: y
    });
  });
}
