import Masonry from "masonry-layout";

/**
 * Masonry grid component
 */
const masonryGrid = function () {
  const grids = document.querySelectorAll('[data-role="masonry"]');

  grids.forEach((el) => {
    new Masonry(el, {
      itemSelector: ".list-columns__item",
      columnWidth: ".list-columns__item",
    });
  });
};

export default masonryGrid;
