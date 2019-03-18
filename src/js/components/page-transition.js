
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
              onComplete: resolve
            });
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
                resolve();
              },
            }, "start");
          });
        },
        enter: (data) => {
          const container = document.querySelector('[data-barba="container"]');
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
                resolve();
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
