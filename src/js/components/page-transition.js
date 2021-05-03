
import barba from "@barba/core";
import {TweenLite, Expo, Sine, Circ, Power4, TimelineLite, gsap} from "gsap";


export default function pageTransition(init, scrollbar) {
  const transitionElement = document.querySelector(".page-transition");
  const ease = Power4.easeInOut;

  // barba.init({
  //   transitions: [{
  //     name: 'opacity-transition',
  //     leave(data) {
  //       return gsap.to(data.current.container, {
  //         opacity: 0
  //       });
  //     },
  //     enter(data) {
  //       const { container } = data.next;
  //       const video = container.querySelector("video");

  //       if (video) {
  //         video.load();
  //         setTimeout(() => {
  //           video.play();
  //         }, 1000);
  //       }

  //       return gsap.from(container, {
  //         opacity: 0
  //       });
  //     }
  //   }]
  // });

  barba.init({
    cacheIgnore: true,
    transitions: [
      {
        name: "default",
        leave: (data) => {
          const { container } = data.current;
          return new Promise((resolve) => {
            const tl = new TimelineLite({
              onComplete: resolve,
            });
            if ($("#nav-toggle").is(":checked")) {
              $("#nav-toggle").prop("checked", false);
              tl.delay(0.5);
            }
            tl.fromTo(container, 0.5, {
              y: 0,
              opacity: 1
            }, {
              ease,
              opacity: 0,
              y: 100
            }, "start");
            tl.fromTo(transitionElement, 0.8, {
              transform: "scaleY(0)",
              yPercent: 0,
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
        // enter(data) {
        //   const { container } = data.next;
        //   const video = container.querySelector("video");

        //   if (video) {
        //     video.load();
        //     setTimeout(() => {
        //       video.play();
        //     }, 1000);
        //   }

        //   return gsap.from(container, {
        //     opacity: 0
        //   });
        // }
        afterEnter: (data) => {
          const { container } = data.next;
          const video = container.querySelector("video");

          if (video) {
            video.load();
            setTimeout(() => {
              video.play();
            }, 1000);
          }

          const tl = new TimelineLite();
          init();
          tl.to(transitionElement, 0.8, {
            transform: "scaleY(0)",
            yPercent: 100,
            ease,
            onComplete: () => {
              // resolve();
            },
          }, "start");


          tl.from(container, 1.1, {
            ease,
            y: 100,
            opacity: 0
          }, "start");

          if (container.querySelector(".stage__slider__slide__text")) {
            tl.fromTo(container.querySelector(".stage__slider__slide__text"), 1.3, {
              ease,
              opacity: 0,
              y: 150
            }, {
              y: 0,
              opacity: 1,
            }, "start");
          }
          if (container.querySelector(".stage__slider__slide__shape")) {
            tl.fromTo(container.querySelector(".stage__slider__slide__shape"), 0.5, {
              ease,
              opacity: 0,
            }, {
              opacity: 1,
            }, "start=+0.5");
          }
          if (container.querySelector(".notice")) {
            tl.fromTo(container.querySelector(".notice"), 0.5, {
              ease,
              transform: "translateY(-100%)"
            }, {
              transform: "translateY(0)"
            });
          }

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
