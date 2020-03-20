import Scrollbar from "smooth-scrollbar";
import Swiper from "swiper";
import newsletterForm from "./components/newsletter-form";
import jQuery from "jquery";
import pageTransition from "./components/page-transition";
import overlay from "./components/overlay";
import stickyHeader from "./components/sticky-header";
import stage from "./components/stage";
import masonryGrid from "./components/masonry";
import lazyLoad from "./components/lazyLoad";

// export for others scripts to use
window.$ = jQuery;
window.jQuery = jQuery;

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

const scrollbar = Scrollbar.init(document.querySelector("[data-scrollbar]"));

function init() {
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
    },
    breakpoints: {
      // when window width is <= 640px
      1024: {
        slidesPerView: 1
      }
    }
  });

  newsletterForm();
  stage();
  masonryGrid();
  overlay();
  lazyLoad();
}

init();

if (location.href.indexOf("seriale-pro") > -1) {
  $(".nav").addClass("seriale-pro");
}

stickyHeader(scrollbar);
pageTransition(init, scrollbar);

