// js/header.js

export function setupMobileMenu() {
  const hamb = document.getElementById("hamb");
  const popup = document.getElementById("popup");
  const menu = document.getElementById("menu").cloneNode(true);
  const body = document.body;

  hamb.addEventListener("click", () => {
    popup.classList.toggle("open");
    hamb.classList.toggle("active");
    body.classList.toggle("noscroll");
    if (!popup.contains(menu)) popup.appendChild(menu);
  });

  jQuery($ => {
    $(document).on("click", ".link", () => {
      $("#popup").removeClass("open");
      $("#hamb").removeClass("active");
      $("body").removeClass("noscroll");
      $("header").removeClass("header-fixed");
    });
  });
}

export function setupAnchorScroll() {
  function getYOffset() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1078) return -50;
    if (screenWidth > 768) return -100;
    return -180;
  }

  function scrollToAnchor(anchorId) {
    const element = document.getElementById(anchorId);
    if (element) {
      const yOffset = getYOffset();
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const anchorId = link.getAttribute("href").substring(1);
      scrollToAnchor(anchorId);
    });
  });
}
