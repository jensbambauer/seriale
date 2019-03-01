import jQuery from "jquery";
/**
 *
 * @author
 * @description
 *
 */

/*jslint browser: true*/

const newsletterForm = function(newsletterForm, $, undefined) {
  function NewsletterForm($el) {

    $el.on("submit", onSubmit);


    function onSubmit(e) {
      e.preventDefault();

      var $form = jQuery(this);
      $form.find(".error-response").text("");

    		jQuery.getJSON($form.attr("action"), {EMAIL: $form.find(".email").val()}).done(function(data) {

    			if (data.result === "error") {
    				onError($form, data);
    			} else {
    				onSuccess($form, data);
    			}

    		});
    }

    function onError($form, data) {
      $form.find(".error-response").html(data.msg);
    }

    function onSuccess($form, data) {

      $form.parents(".newsletter").find(".form-cols").fadeOut(300, function() {
        $form.parents(".newsletter").find(".success").text(data.msg).fadeIn(300);
      });

    }

  }

  var init = function() {
    jQuery('[data-role="mailchimp-form"]').each(function() {
      new NewsletterForm(jQuery(this));
    });

  };

  init();

};

export default newsletterForm;
