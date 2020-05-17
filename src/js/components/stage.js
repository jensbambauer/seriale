import jQuery from "jquery";
import {TimelineLite, Power4, Power0, TweenLite} from "gsap";
/**
 *
 * @author
 * @description
 *
 */

/*jslint browser: true*/

const stage = function() {
  const $el = $(".stage");
  const duration = 5;
  const tl = new TimelineLite({
    onComplete: () => {
      tl.restart();
    }
  });
  const ease = Power4.easeInOut;
  let current = 0;

  TweenLite.to($el.find(".stage__slider"), 0.5, {
    opacity: 1
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
    tl.fromTo(el, duration, {
      xPercent: "-105",
      ease: Power0.easeNone
    }, {
      xPercent: "0",
    }, index === 0 ? "start" : "-=0.5");
    $el.find(".stage__slider__slide").each((slideIndex, slide) => {
      const svg = slide.querySelector("svg");
      const headline = slide.querySelector(".stage__slider__slide__text");
      const button = slide.querySelector(".button");

      if (slideIndex === index) {
        if (button) {
          tl.to(button, 0.5, {
            y: 100,
            opacity: 0,
            zIndex: 1,
            ease
          });
        }
        tl.to(headline, 0.5, {
          y: 100,
          opacity: 0,
          zIndex: 1,
          ease
        }, "-=0.1");
        tl.to(svg, 0.5, {
          y: 100,
          opacity: 0,
          zIndex: 1,
          ease
        }, "-=0.3");
      }
      if ((slideIndex === index + 1) || slideIndex === 0) {
        tl.fromTo(svg, 0.5, {
          y: -100,
          opacity: 0,
          ease
        }, {
          zIndex: 2,
          y: 0,
          opacity: 1
        }, slideIndex === 0 ? "start" : null);
        tl.fromTo(headline, 0.5, {
          y: -100,
          opacity: 0,
          ease
        }, {
          zIndex: 2,
          y: 0,
          opacity: 1
        }, slideIndex === 0 ? "start" : "-=0.4");
        if (button) {
          tl.fromTo(button, 0.5, {
            y: -100,
            opacity: 0,
            ease
          }, {
            zIndex: 2,
            y: 0,
            opacity: 1
          }, slideIndex === 0 ? "start" : "-=0.8");
        }
      }
    });
    tl.addLabel(`end-${index}`);
  });
  $el.find(".stage__timeline li span").each((index, el) => {
    tl.to(el, 0.2, {
      transform: "translateY(100%)",
      ease
    }, "end");

  });

};

export default stage;
