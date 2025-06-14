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
import twitch from "./components/twitch";

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

function init(container = document) {
  const swiper = new Swiper(".swiper-container", {
    slidesPerView: 2,
    spaceBetween: 0,
    centeredSlides: true,
    loop: true,
    lazy: {
      loadPrevNext: true,
      loadOnTransitionStart: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      // when window width is <= 640px
      1024: {
        slidesPerView: 1,
      },
    },
  });

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

stickyHeader(scrollbar);
// pageTransition(init, scrollbar);
//
//
(function () {
  // Zielzeit berechnen: morgen 20:00 Uhr deutscher Zeit
  const now = new Date();

  // Einen Tag hinzufügen
  const target = new Date(now);
  target.setDate(now.getDate() + 1);
  target.setHours(20, 0, 0, 0); // 20:00:00.000

  // In deutscher Zeitzone (Mitteleuropäische Zeit / Sommerzeit)
  // Zielzeit als UTC-Zeitpunkt berechnen
  const germanOffset = -new Date()
    .toLocaleString("en-US", {
      timeZone: "Europe/Berlin",
      timeZoneName: "short",
    })
    .includes("GMT+2")
    ? 2
    : 1;
  const targetUTC = new Date(target.getTime() - germanOffset * 60 * 60 * 1000);

  const timeUntilReload = targetUTC.getTime() - Date.now();

  if (timeUntilReload > 0) {
    console.log(
      `Seite wird in ${Math.round(timeUntilReload / 1000)} Sekunden neu geladen.`,
    );
    setTimeout(() => {
      location.reload();
    }, timeUntilReload);
  } else {
    console.log("Zielzeit ist bereits vergangen. Kein Reload geplant.");
  }
})();
