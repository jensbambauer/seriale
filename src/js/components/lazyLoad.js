/**
 *
 * @author
 * @description
 *
 */

/*jslint browser: true*/

const lazyLoad = function() {

  $("[data-src]").each((index, el) => {
    console.log(el);
  });
};

export default lazyLoad;
