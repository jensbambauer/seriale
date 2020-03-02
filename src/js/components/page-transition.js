
import barba from "@barba/core";
import {TweenLite, Expo, Sine, Circ, Power4, TimelineLite} from "gsap";


export default function pageTransition(init, scrollbar) {
  const transitionElement = document.querySelector(".page-transition");
  const ease = Power4.easeInOut;

  barba.init({
    cacheIgnore: true,
    transitions: [
      {
        name: "default",
        leave: (data) => {
          const container = document.querySelector('[data-barba="container"]');
          return new Promise((resolve) => {
            const tl = new TimelineLite({
              onComplete: resolve,
            });
            if ($("#nav-toggle").is(":checked")) {
              $("#nav-toggle").prop("checked", false);
              tl.delay(0.5);
            }
            tl.fromTo(container, 1.1, {
              y: 0,
              opacity: 1
            }, {
              ease,
              opacity: 0,
              y: 100
            }, "start");
            tl.fromTo(transitionElement, 1.1, {
              transform: "scaleY(0)",
            }, {
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
                // resolve();
              },
            }, "start");
          });
        },
        enter: (data) => {
          const video = document.querySelector("video");
          const container = document.querySelector('[data-barba="container"]');

          if (video) {
            video.load();
            setTimeout(() => {
              video.play();
            }, 1000);
          }

          return new Promise((resolve) => {
            const tl = new TimelineLite({onComplete: resolve});
            init();
            tl.fromTo(container, 1.1, {
              ease,
              y: -100,
              opacity: 0
            }, {
              y: 0,
              opacity: 1
            }, "start");
            tl.to(transitionElement, 1.1, {
              transform: "scaleY(0)",
              ease,
              onComplete: () => {
                // resolve();
              },
            }, "start");

            if (document.querySelector(".stage__slider__slide__text")) {
              tl.fromTo(document.querySelector(".stage__slider__slide__text"), 1.3, {
                ease,
                opacity: 0,
                y: 150
              }, {
                y: 0,
                opacity: 1,
              }, "start");
            }
            if (document.querySelector(".stage__slider__slide__shape")) {
              tl.fromTo(document.querySelector(".stage__slider__slide__shape"), 0.5, {
                ease,
                opacity: 0,
              }, {
                opacity: 1,
              }, "start=+0.5");
            }
            if (document.querySelector(".notice")) {
              tl.fromTo(document.querySelector(".notice"), 0.5, {
                ease,
                transform: "translateY(-100%)"
              }, {
                transform: "translateY(0)"
              });
            }
          });
        }
      }
    ]
  });
  // barba.init({
  //   transitions: [{

  //     // basic style
  //     leave: (data) => {
  //       console.log(data);
  //       TweenLite(transitionElement, 1, {
  //         transform: "translateY(0)",
  //         onComplete: () => {
  //           this.async();
  //         }
  //       });
  //     }
  //   }]

  // });
}
