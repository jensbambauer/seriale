import Masonry from "masonry-layout";

const instances = [];

/**
 * Masonry grid component
 */
const masonryGrid = function () {
  const grids = document.querySelectorAll('[data-role="masonry"]');

  grids.forEach((el) => {
    const msnry = new Masonry(el, {
      itemSelector: ".list-columns__item",
      columnWidth: ".list-columns__item",
      transitionDuration: 0,
    });
    instances.push(msnry);
  });
};

/**
 * Refresh all masonry layouts (e.g. after tab change)
 */
export const refreshMasonry = function () {
  instances.forEach((msnry) => msnry.layout());
};

export default masonryGrid;
