/** ScrollToTop Button **/

let scrollToTopBtn = document.querySelector(".scroll-to-the-top-btn");
let rootElement = document.documentElement;

function handleScroll() {
  // Do something on scroll
  let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  if (rootElement.scrollTop / scrollTotal > 0.7) {
    // Show button
    scrollToTopBtn.classList.add("show-btn");
  } else {
    // Hide button
    scrollToTopBtn.classList.remove("show-btn");
  }
}

function scrollToTop() {
  // Scroll to top logic
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

scrollToTopBtn.addEventListener("click", scrollToTop);
document.addEventListener("scroll", handleScroll);