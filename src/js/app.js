import Scrollbar from "smooth-scrollbar";
import Swiper from "swiper";

// JS Goes here - ES6 supported
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", (user) => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

Scrollbar.initAll();

const swiper = new Swiper(".swiper-container", {
  slidesPerView: 2,
  spaceBetween: 0,
  centeredSlides: true,
  loop: true,
  lazy: {
    loadPrevNext: true,
    loadOnTransitionStart: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});
