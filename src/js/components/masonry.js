import jQuery from "jquery";
import Masonry from "masonry-layout";
/**
 *
 * @author
 * @description
 *
 */

/*jslint browser: true*/

const masonryGrid = function() {

  $('[data-role="masonry"]').each((index, el) => {
    console.log(el);
    const msnry = new Masonry(el, {
      itemSelector: ".list-columns__item",
      columnWidth: ".list-columns__item"
    });
  });
};

export default masonryGrid;
