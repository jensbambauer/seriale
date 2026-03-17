import { gsap } from "gsap";

export default function overlay() {
  const $overlay = $(".overlay-container");

  if (!$overlay.length) return;

  $overlay.hide();

  const showOverlay = ($content, variant) => {
    const tl = gsap.timeline();
    const $iframe = $content.find("iframe");

    $iframe.wrap('<div class="overlay-video"></div>');
    $overlay.addClass(variant);
    $overlay
      .find(".overlay-content")
      .empty()
      .append(`<div class="overlay-content__inner">${$content.html()}</div>`);

    $overlay.find(".overlay-content__inner img").unwrap();

    gsap.set($overlay.find(".overlay-content"), {
      opacity: 0,
    });

    gsap.set($overlay.find(".overlay-content__mask"), {
      scaleY: 0,
    });

    tl.to($overlay.find(".overlay-content__mask"), {
      duration: 0.5,
      transformOrigin: "0 0",
      scaleY: 1,
      ease: "power4.inOut",
    });

    tl.set($overlay.find(".overlay-content"), {
      opacity: 1,
    });

    tl.fromTo(
      $overlay.find(".overlay-content__mask"),
      {
        transformOrigin: "100% 100%",
      },
      {
        duration: 0.5,
        scaleY: 0,
        ease: "power4.inOut",
      }
    );

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
    const tl = gsap.timeline();

    tl.fromTo(
      $overlay.find(".overlay-content__mask"),
      {
        transformOrigin: "100% 100%",
      },
      {
        duration: 0.4,
        scaleY: 1,
        ease: "power4.inOut",
      }
    );

    tl.set($overlay.find(".overlay-content"), {
      opacity: 0,
    });

    tl.to($overlay.find(".overlay-content__mask"), {
      duration: 0.4,
      transformOrigin: "0 0",
      scaleY: 0,
      ease: "power4.inOut",
    });

    tl.to($overlay, {
      duration: 0.3,
      opacity: 0,
      onComplete: () => {
        $overlay.find(".overlay-content").empty();
        $overlay.hide();
        $overlay.removeClass("overlay-wide");
      },
    });
  };

  const handleCloseClick = () => {
    hideOverlay();
  };

  const showLoading = () => {
    $overlay.addClass("loading");
    gsap.fromTo(
      $overlay,
      { opacity: 0 },
      {
        duration: 0.5,
        display: "flex",
        opacity: 1,
      }
    );
  };

  const handleClick = (e) => {
    e.preventDefault();
    const $el = $(e.currentTarget);

    showLoading();

    $.get($el.attr("href"), (data) => {
      showOverlay(
        $(data).find('[data-barba="container"] .container'),
        $el.data().role
      );
    });
  };

  $overlay.find(".overlay__close").on("click", handleCloseClick);
  $('[data-role*="overlay"]').on("click", handleClick);
}
