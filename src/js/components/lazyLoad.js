/**
 * Lazy load component
 * Note: Consider using native loading="lazy" or IntersectionObserver
 */
const lazyLoad = function () {
  const lazyElements = document.querySelectorAll("[data-src]");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (el.dataset.src) {
            el.src = el.dataset.src;
            delete el.dataset.src;
          }
          observer.unobserve(el);
        }
      });
    });

    lazyElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback for older browsers
    lazyElements.forEach((el) => {
      if (el.dataset.src) {
        el.src = el.dataset.src;
      }
    });
  }
};

export default lazyLoad;
