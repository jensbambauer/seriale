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

  const msnry = new Masonry('[data-role="masonry"]', {
    itemSelector: ".list-columns__item",
    columnWidth: ".list-columns__item"
  });
};

export default masonryGrid;
