const hamb = document.querySelector("#hamb");
const popup = document.querySelector("#popup");
const menu = document.querySelector("#menu").cloneNode(true);
const header = document.querySelector("#header");
const body = document.body;

// Открытие/закрытие мобильного меню
hamb.addEventListener("click", () => {
  popup.classList.toggle("open");
  hamb.classList.toggle("active");
  body.classList.toggle("noscroll");
  renderPopup();
});

function renderPopup() {
  popup.appendChild(menu);
}

// Закрытие popup при клике по ссылке
jQuery(function ($) {
  $(document).on("click", ".link", function () {
    $("#popup").removeClass("open");
    $("#hamb").removeClass("active");
    $("#wrapper").removeClass("noscroll");
    $("header").removeClass("header-fixed");
  });
});

// Плавная прокрутка по якорям
function getYOffsetForScreenWidth() {
  const screenWidth = window.innerWidth;
  const headerHeight = document.getElementById("header").offsetHeight;
  if (screenWidth >= 1078) return -50;
  if (screenWidth > 768) return -100;
  if (screenWidth <= 768) return -180;
  return 0;
}

function scrollToAnchor(anchorId) {
  const element = document.getElementById(anchorId);
  if (element) {
    const yOffset = getYOffsetForScreenWidth();
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

const links = document.querySelectorAll('a[href^="#"]');
links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const anchorId = link.getAttribute("href").substring(1);
    scrollToAnchor(anchorId);
  });
});
