
import {TweenLite, Expo, Sine, Circ, Power4, TimelineLite} from "gsap";

export default function overlay() {
  const $overlay = $(".overlay-container");

  $overlay.hide();

  const showOverlay = ($content, variant) => {
    const tl = new TimelineLite();
    const $iframe = $content.find("iframe");

    $iframe.wrap('<div class="overlay-video"></div>');
    $overlay.addClass(variant);
    $overlay.find(".overlay-content")
      .empty()
      .append(`<div class="overlay-content__inner">${$content.html()}</div>`);

    $overlay.find(".overlay-content__inner img").unwrap();

    TweenLite.set($overlay.find(".overlay-content"), {
      opacity: 0
    });

    TweenLite.set($overlay.find(".overlay-content__mask"), {
      scaleY: 0,
    });

    tl.to($overlay.find(".overlay-content__mask"), 0.5, {
      transformOrigin: "0 0",
      scaleY: 1,
      ease: Power4.easeInOut
    });

    tl.set($overlay.find(".overlay-content"), {
      opacity: 1
    });

    tl.fromTo($overlay.find(".overlay-content__mask"), 0.5, {
      transformOrigin: "100% 100%",
    }, {
      scaleY: 0,
      ease: Power4.easeInOut
    });

    tl.pause();

    $overlay.find("iframe").on("load", () => {
      $overlay.removeClass("loading");
      tl.play();
    });

    if ($iframe.length === 0) {
      $overlay.removeClass("loading");
      tl.play();
    }
  };

  const hideOverlay = () => {
    const tl = new TimelineLite();

    tl.fromTo($overlay.find(".overlay-content__mask"), 0.4, {
      transformOrigin: "100% 100%",
    }, {
      scaleY: 1,
      ease: Power4.easeInOut
    });

    tl.set($overlay.find(".overlay-content"), {
      opacity: 0
    });

    tl.to($overlay.find(".overlay-content__mask"), 0.4, {
      transformOrigin: "0 0",
      scaleY: 0,
      ease: Power4.easeInOut
    });

    tl.to($overlay, 0.3, {
      opacity: 0,
      onComplete: () => {
        $overlay.find(".overlay-content")
          .empty();
        $overlay.hide();
        $overlay.removeClass("overlay-wide");
      }
    });
  };

  const handleCloseClick = () => {
    hideOverlay();
  };

  const showLoading = () => {
    $overlay.addClass("loading");
    const tl = new TimelineLite();

    tl.fromTo($overlay, 0.5, {
      opacity: 0
    }, {
      display: "flex",
      opacity: 1
    });

  };

  const handleClick = (e) => {
    e.preventDefault();
    const $el = $(e.currentTarget);

    showLoading();

    $.get($el.attr("href"), (data) => {
      showOverlay($(data).find('[data-barba="container"] .container'), $el.data().role);
    });
  };

  $overlay.find(".overlay__close").on("click", handleCloseClick);
  $('[data-role*="overlay"]').on("click", handleClick);
}
