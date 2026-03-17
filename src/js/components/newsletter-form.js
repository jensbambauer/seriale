/**
 * Newsletter form component
 * Handles Mailchimp form submissions
 */
const newsletterForm = function () {
  const forms = document.querySelectorAll('[data-role="mailchimp-form"]');

  forms.forEach((form) => {
    form.addEventListener("submit", onSubmit);
  });

  function onSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const errorResponse = form.querySelector(".error-response");
    const emailInput = form.querySelector(".email");

    if (errorResponse) {
      errorResponse.textContent = "";
    }

    const url = new URL(form.getAttribute("action"));
    url.searchParams.set("EMAIL", emailInput?.value || "");

    fetch(url.toString())
      .then((response) => response.json())
      .then((data) => {
        if (data.result === "error") {
          onError(form, data);
        } else {
          onSuccess(form, data);
        }
      })
      .catch((err) => {
        console.error("Newsletter subscription error:", err);
      });
  }

  function onError(form, data) {
    const errorResponse = form.querySelector(".error-response");
    if (errorResponse) {
      errorResponse.innerHTML = data.msg;
    }
  }

  function onSuccess(form, data) {
    const newsletter = form.closest(".newsletter");
    if (!newsletter) return;

    const formCols = newsletter.querySelector(".form-cols");
    const success = newsletter.querySelector(".success");

    if (formCols) {
      formCols.style.display = "none";
    }
    if (success) {
      success.textContent = data.msg;
      success.style.display = "block";
    }
  }
};

export default newsletterForm;
