// GSAP v3+ uses different imports
import { gsap } from "gsap";

/**
 * Stage component - handles animated stage/hero sections
 */
const stage = function (el) {
  const $el = $(el);
  const duration = 5;

  // Create timeline with GSAP 3 syntax
  const tl = gsap.timeline({
    onComplete: () => {
      tl.restart();
    },
  });

  const ease = "power4.inOut";
  let current = 0;

  gsap.to($el.find(".stage__slider"), {
    duration: 0.5,
    opacity: 1,
  });

  const handleClick = (e, index) => {
    tl.pause();
    tl.seek(`end-${index}-=1.8`);
  };

  $el.on("mouseleave", () => {
    tl.play();
  });

  $el.find(".stage__timeline li span").each((index, el) => {
    el.parentNode.addEventListener("click", (e) => {
      handleClick(e, index);
    });

    tl.add(() => {
      current = index;
    });

    tl.fromTo(
      el,
      {
        xPercent: -105,
        ease: "none",
      },
      {
        duration: duration,
        xPercent: 0,
      },
      index === 0 ? "start" : "-=0.5"
    );

    $el.find(".stage__slider__slide").each((slideIndex, slide) => {
      const svg = slide.querySelector("svg");
      const headline = slide.querySelector(".stage__slider__slide__text");
      const button = slide.querySelector(".button");

      if (slideIndex === index) {
        if (button) {
          tl.to(button, {
            duration: 0.5,
            y: 100,
            opacity: 0,
            zIndex: 1,
            ease,
          });
        }
        tl.to(
          headline,
          {
            duration: 0.5,
            y: 100,
            opacity: 0,
            zIndex: 1,
            ease,
          },
          "-=0.1"
        );
        tl.to(
          svg,
          {
            duration: 0.5,
            y: 100,
            opacity: 0,
            zIndex: 1,
            ease,
          },
          "-=0.3"
        );
      }

      if (slideIndex === index + 1 || slideIndex === 0) {
        tl.fromTo(
          svg,
          {
            y: -100,
            opacity: 0,
          },
          {
            duration: 0.5,
            zIndex: 2,
            y: 0,
            opacity: 1,
            ease,
          },
          slideIndex === 0 ? "start" : null
        );

        tl.fromTo(
          headline,
          {
            y: -100,
            opacity: 0,
          },
          {
            duration: 0.5,
            zIndex: 2,
            y: 0,
            opacity: 1,
            ease,
          },
          slideIndex === 0 ? "start" : "-=0.4"
        );

        if (button) {
          tl.fromTo(
            button,
            {
              y: -100,
              opacity: 0,
            },
            {
              duration: 0.5,
              zIndex: 2,
              y: 0,
              opacity: 1,
              ease,
            },
            slideIndex === 0 ? "start" : "-=0.8"
          );
        }
      }
    });

    tl.addLabel(`end-${index}`);
  });

  $el.find(".stage__timeline li span").each((index, el) => {
    tl.to(
      el,
      {
        duration: 0.2,
        transform: "translateY(100%)",
        ease,
      },
      "end"
    );
  });
};

export default stage;
