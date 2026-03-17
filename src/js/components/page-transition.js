import barba from "@barba/core";
import { gsap } from "gsap";

export default function pageTransition(init, scrollbar) {
  const transitionElement = document.querySelector(".page-transition");
  const ease = "power4.inOut";

  barba.init({
    cacheIgnore: true,
    transitions: [
      {
        name: "default",
        leave: (data) => {
          const { container } = data.current;
          return new Promise((resolve) => {
            const tl = gsap.timeline({
              onComplete: resolve,
            });

            if ($("#nav-toggle").is(":checked")) {
              $("#nav-toggle").prop("checked", false);
              tl.delay(0.5);
            }

            tl.fromTo(
              container,
              {
                y: 0,
                opacity: 1,
              },
              {
                duration: 0.5,
                ease,
                opacity: 0,
                y: 100,
              },
              "start"
            );

            tl.fromTo(
              transitionElement,
              {
                transform: "scaleY(0)",
                yPercent: 0,
              },
              {
                duration: 0.8,
                transform: "scaleY(1)",
                ease,
                onComplete: () => {
                  scrollbar.scrollTo(0, 0, 1);
                  $(".nav__items a.active").removeClass("active");
                  $(`.nav__items a[href="${data.next.url.path}"]`).addClass("active");
                  $(".nav").removeClass("seriale-pro");
                  if (data.next.url.path.indexOf("seriale-pro") > -1) {
                    $(".nav").addClass("seriale-pro");
                  }
                },
              },
              "start"
            );
          });
        },
        afterEnter: (data) => {
          const { container } = data.next;
          const video = container.querySelector("video");

          if (video) {
            video.load();
            setTimeout(() => {
              video.play();
            }, 1000);
          }

          const tl = gsap.timeline();
          init();

          tl.to(
            transitionElement,
            {
              duration: 0.8,
              transform: "scaleY(0)",
              yPercent: 100,
              ease,
            },
            "start"
          );

          tl.from(
            container,
            {
              duration: 1.1,
              ease,
              y: 100,
              opacity: 0,
            },
            "start"
          );

          if (container.querySelector(".stage__slider__slide__text")) {
            tl.fromTo(
              container.querySelector(".stage__slider__slide__text"),
              {
                opacity: 0,
                y: 150,
              },
              {
                duration: 1.3,
                ease,
                y: 0,
                opacity: 1,
              },
              "start"
            );
          }

          if (container.querySelector(".stage__slider__slide__shape")) {
            tl.fromTo(
              container.querySelector(".stage__slider__slide__shape"),
              {
                opacity: 0,
              },
              {
                duration: 0.5,
                ease,
                opacity: 1,
              },
              "start+=0.5"
            );
          }

          if (container.querySelector(".notice")) {
            tl.fromTo(
              container.querySelector(".notice"),
              {
                transform: "translateY(-100%)",
              },
              {
                duration: 0.5,
                ease,
                transform: "translateY(0)",
              }
            );
          }
        },
      },
    ],
  });
}
