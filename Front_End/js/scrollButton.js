// -------------------------------------------------------------------------------------------------
/// Get the scroll to the top button element.
let scrollToTopBtn = document.querySelector(".scroll-to-the-top-btn");
let rootElement = document.documentElement;

// -------------------------------------------------------------------------------------------------
/// Manage the button: Show or hide it.
function handleScroll() {
  let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  if (rootElement.scrollTop / scrollTotal > 0.7) {
    scrollToTopBtn.classList.add("show-btn");
  } else {
    scrollToTopBtn.classList.remove("show-btn");
  }
}

// -------------------------------------------------------------------------------------------------
/// Scroll to the top logic.
function scrollToTop() {
  rootElement.scrollTo({ top: 0, behavior: "smooth" });
}

// -------------------------------------------------------------------------------------------------
/// Click and scroll events.
scrollToTopBtn.addEventListener("click", scrollToTop);
document.addEventListener("scroll", handleScroll);
