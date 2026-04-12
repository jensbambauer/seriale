// Main app entry point
import Scrollbar from "smooth-scrollbar";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Import our CSS
import "../css/main.css";

// Components
import newsletterForm from "./components/newsletter-form";
import pageTransition from "./components/page-transition";
import overlay from "./components/overlay";
import stickyHeader from "./components/sticky-header";
import stage from "./components/stage";
import masonryGrid, { refreshMasonry } from "./components/masonry";
import lazyLoad from "./components/lazyLoad";
import twitch from "./components/twitch";

// Note: jQuery is still used in some components
// TODO: Consider migrating away from jQuery in future
import jQuery from "jquery";
window.$ = jQuery;
window.jQuery = jQuery;

// Initialize smooth-scrollbar
const scrollbarElement = document.querySelector("[data-scrollbar]");
const scrollbar = scrollbarElement ? Scrollbar.init(scrollbarElement) : null;

function init(container = document) {
  // Initialize Swiper with modules (Swiper 11 syntax)
  const swiperElement = container.querySelector
    ? container.querySelector(".swiper-container")
    : document.querySelector(".swiper-container");

  if (swiperElement) {
    const swiper = new Swiper(".swiper-container", {
      modules: [Navigation],
      slidesPerView: 1,
      spaceBetween: 0,
      centeredSlides: true,
      loop: true,
      // Swiper 11+ uses native lazy loading via loading="lazy" attribute
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        // Ab 768px: 2 Slides sichtbar (mit Anschnitten links/rechts)
        768: {
          slidesPerView: 2,
        },
      },
    });
  }

  newsletterForm();

  $(container)
    .find(".stage")
    .each((index, el) => {
      stage(el);
    });

  masonryGrid();
  overlay();
  lazyLoad();
  twitch();
}

init();

if (location.href.indexOf("seriale-pro") > -1) {
  $(".nav").addClass("seriale-pro");
}

$(".nav__items a.active").removeClass("active");
$(`.nav__items a[href="${location.pathname}"]`).addClass("active");

if (scrollbar) {
  stickyHeader(scrollbar);
}
// pageTransition(init, scrollbar);

// Tab change listener - refresh masonry layouts when switching tabs
document.querySelectorAll('input[name="tabs"]').forEach((input) => {
  input.addEventListener("change", () => {
    setTimeout(refreshMasonry, 50);
  });
});
