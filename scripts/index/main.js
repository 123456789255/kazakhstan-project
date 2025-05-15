// js/main.js
import { favorites, loadFavorites, renderFavorites } from './favorites.js';
import { setupFilters, applyFilters, populateFilters } from './filters.js';
import { openModal, closeModal, loadReviews } from './modal.js';
import { setupMobileMenu, setupAnchorScroll } from './header.js';

// Предполагается, что placesData определён глобально
let filteredPlaces = placesData.slice();

document.addEventListener("DOMContentLoaded", () => {
  const placesContainer = document.getElementById("places-container");
  const favoritesContainer = document.getElementById("favorites-container");

  loadFavorites();
  loadReviews();
  populateFilters(placesData);
  setupFilters(() => {
    filteredPlaces = applyFilters(placesData);
    renderPlaces(filteredPlaces);
  }, () => {
    filteredPlaces = placesData.slice();
    renderPlaces(filteredPlaces);
  });

  setupMobileMenu();
  setupAnchorScroll();

  renderPlaces(filteredPlaces);
  renderFavorites(favoritesContainer, (place) => openModal(place, favoritesContainer));

  // Закрытие модального окна
  document.querySelector(".close-btn").addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target.id === "modal") {
      closeModal();
    }
  });
});

function renderPlaces(data) {
  const container = document.getElementById("places-container");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>По данным категориям нет мест.</p>";
    return;
  }

  data.forEach(place => {
    const card = document.createElement("div");
    card.classList.add("place-card");
    card.innerHTML = `
      <img src="${place.image}" alt="${place.title}" />
      <h3>${place.title}</h3>
      <p><strong>Регион:</strong> ${place.region}</p>
      <p><strong>Категория:</strong> ${place.type}</p>
      <p><strong>Рейтинг:</strong> ⭐ ${place.rating}</p>
      <button class="details-btn">Подробнее</button>
      <button class="favorite-btn">В избранное</button>
    `;

    card.querySelector(".details-btn").addEventListener("click", () => {
      openModal(place, document.getElementById("favorites-container"));
    });

    card.querySelector(".favorite-btn").addEventListener("click", () => {
      const exists = favorites.some(fav => fav.id === place.id);
      if (!exists) {
        favorites.push(place);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        renderFavorites(document.getElementById("favorites-container"), (p) => openModal(p, document.getElementById("favorites-container")));
        alert(`${place.title} добавлено в избранное!`);
      } else {
        alert(`${place.title} уже в избранном.`);
      }
    });

    container.appendChild(card);
  });
}

















// // ------------------------------------------------------------------
// // 🌍 Глобальные переменные и DOM-элементы
// // ------------------------------------------------------------------
// let filteredPlaces = placesData;
// let favorites = [];
// let reviews = {};

// const container = document.getElementById("places-container");
// const favoritesContainer = document.getElementById("favorites-container");
// const header = document.getElementById("header");
// const body = document.body;

// // Модальное окно
// const modal = document.getElementById("modal");
// const modalImg = document.getElementById("modal-img");
// const modalTitle = document.getElementById("modal-title");
// const modalDescription = document.getElementById("modal-description");
// const modalRegion = document.getElementById("modal-region");
// const modalCategory = document.getElementById("modal-category");
// const modalRating = document.getElementById("modal-rating");
// const addToFavoritesBtn = document.getElementById("addToFavorites");
// const removeFromFavoritesBtn = document.getElementById("removeFromFavorites");
// const closeBtn = document.querySelector(".close-btn");

// // Фильтры
// const searchInput = document.getElementById("searchInput");
// const regionFilter = document.getElementById("regionFilter");
// const typeFilter = document.getElementById("typeFilter");
// const ratingFilter = document.getElementById("ratingFilter");

// // Хэдер и меню
// const hamb = document.querySelector("#hamb");
// const popup = document.querySelector("#popup");
// const menu = document.querySelector("#menu").cloneNode(true);

// // ------------------------------------------------------------------
// // 🚀 Инициализация после загрузки DOM
// // ------------------------------------------------------------------
// document.addEventListener("DOMContentLoaded", () => {
//   loadFavorites();
//   loadReviews();
//   renderPlaces(filteredPlaces);
//   updateFavoritesUI();
//   populateFilters();
//   setupFilters();
// });

// // ------------------------------------------------------------------
// // 🧩 Загрузка данных из localStorage
// // ------------------------------------------------------------------
// function loadFavorites() {
//   const saved = localStorage.getItem("favorites");
//   if (saved) favorites = JSON.parse(saved);
// }

// function loadReviews() {
//   const saved = localStorage.getItem("reviews");
//   if (saved) reviews = JSON.parse(saved);
// }

// // ------------------------------------------------------------------
// // 🖼 Отображение карточек мест
// // ------------------------------------------------------------------
// function renderPlaces(data) {
//   container.innerHTML = "";
//   if (data.length === 0) {
//     container.innerHTML = "<p>По данным категориям нет мест.</p>";
//     return;
//   }

//   data.forEach((place) => {
//     const card = document.createElement("div");
//     card.className = "place-card";
//     card.innerHTML = `
//       <img src="${place.image}" alt="${place.title}" />
//       <h3>${place.title}</h3>
//       <p><strong>Регион:</strong> ${place.region}</p>
//       <p><strong>Категория:</strong> ${place.type}</p>
//       <p><strong>Рейтинг:</strong> ⭐ ${place.rating}</p>
//       <button class="details-btn">Подробнее</button>
//       <button class="favorite-btn">В избранное</button>
//     `;

//     card.querySelector(".favorite-btn").addEventListener("click", () => toggleFavorite(place));
//     card.querySelector(".details-btn").addEventListener("click", () => openModal(place));

//     container.appendChild(card);
//   });
// }

// // ------------------------------------------------------------------
// // ⭐ Работа с избранным
// // ------------------------------------------------------------------
// function toggleFavorite(place) {
//   const exists = favorites.some(fav => fav.id === place.id);
//   if (!exists) {
//     favorites.push(place);
//     saveFavorites();
//     updateFavoritesUI();
//     alert(`${place.title} добавлено в избранное!`);
//   } else {
//     alert(`${place.title} уже в избранном.`);
//   }
// }

// function saveFavorites() {
//   localStorage.setItem("favorites", JSON.stringify(favorites));
// }

// function updateFavoritesUI() {
//   favoritesContainer.innerHTML = favorites.length === 0
//     ? "<p>Пока нет избранных мест.</p>"
//     : "";

//   favorites.forEach(place => {
//     const card = document.createElement("div");
//     card.className = "place-card";
//     card.innerHTML = `
//       <img src="${place.image}" alt="${place.title}" />
//       <h3>${place.title}</h3>
//       <p><strong>Регион:</strong> ${place.region}</p>
//       <p><strong>Категория:</strong> ${place.type}</p>
//       <p><strong>Рейтинг:</strong> ⭐ ${place.rating}</p>
//       <button class="details-btn">Подробнее</button>
//       <button class="remove-btn">Удалить</button>
//     `;

//     card.querySelector(".remove-btn").addEventListener("click", () => {
//       favorites = favorites.filter(fav => fav.id !== place.id);
//       saveFavorites();
//       updateFavoritesUI();
//     });

//     card.querySelector(".details-btn").addEventListener("click", () => openModal(place));
//     favoritesContainer.appendChild(card);
//   });
// }

// // ------------------------------------------------------------------
// // 🪟 Модальное окно
// // ------------------------------------------------------------------
// function openModal(place) {
//   body.classList.add("noscroll");

//   Object.assign(modalImg, { src: place.image, alt: place.title });
//   modalTitle.textContent = place.title;
//   modalDescription.textContent = place.description || "Описание пока недоступно.";
//   modalRegion.textContent = place.region;
//   modalCategory.textContent = place.type;
//   modalRating.textContent = place.rating;

//   const isFavorite = favorites.some(fav => fav.id === place.id);
//   addToFavoritesBtn.classList.toggle("hidden", isFavorite);
//   removeFromFavoritesBtn.classList.toggle("hidden", !isFavorite);

//   addToFavoritesBtn.onclick = () => {
//     toggleFavorite(place);
//     closeModal();
//   };

//   removeFromFavoritesBtn.onclick = () => {
//     favorites = favorites.filter(fav => fav.id !== place.id);
//     saveFavorites();
//     updateFavoritesUI();
//     alert(`${place.title} удалено из избранного.`);
//     closeModal();
//   };

//   setupReviewForm(place.id);
//   renderReviews(place.id);
//   modal.classList.remove("hidden");
// }

// function closeModal() {
//   modal.classList.add("hidden");
//   body.classList.remove("noscroll");
// }

// closeBtn.addEventListener("click", closeModal);
// window.addEventListener("click", e => { if (e.target === modal) closeModal(); });

// // ------------------------------------------------------------------
// // 💬 Отзывы
// // ------------------------------------------------------------------
// function setupReviewForm(placeId) {
//   const reviewForm = document.getElementById("reviewForm");
//   const reviewAuthor = document.getElementById("reviewAuthor");
//   const reviewText = document.getElementById("reviewText");
//   const reviewRating = document.getElementById("reviewRating");

//   reviewForm.onsubmit = (e) => {
//     e.preventDefault();

//     const author = reviewAuthor.value.trim();
//     const text = reviewText.value.trim();
//     const rating = parseInt(reviewRating.value, 10);

//     if (!author || !text) return;

//     const newReview = {
//       author, text, rating,
//       date: new Date().toLocaleDateString()
//     };

//     if (!reviews[placeId]) reviews[placeId] = [];
//     reviews[placeId].push(newReview);
//     localStorage.setItem("reviews", JSON.stringify(reviews));

//     renderReviews(placeId);
//     reviewForm.reset();
//   };
// }

// function renderReviews(placeId) {
//   const reviewsList = document.getElementById("reviewsList");
//   reviewsList.innerHTML = "";

//   const placeReviews = reviews[placeId] || [];

//   if (placeReviews.length === 0) {
//     reviewsList.innerHTML = "<p>Пока нет отзывов.</p>";
//     return;
//   }

//   placeReviews.forEach((review, index) => {
//     const div = document.createElement("div");
//     div.className = "review-item";
//     div.innerHTML = `
//       <p><strong>${review.author}</strong><br />(${review.date})</p>
//       <span>${"⭐️".repeat(review.rating)}</span>
//       <p>${review.text}</p>
//       <button class="delete-review" data-index="${index}">Удалить</button>
//     `;

//     div.querySelector(".delete-review").addEventListener("click", () => {
//       reviews[placeId].splice(index, 1);
//       localStorage.setItem("reviews", JSON.stringify(reviews));
//       renderReviews(placeId);
//     });

//     reviewsList.appendChild(div);
//   });
// }

// // ------------------------------------------------------------------
// // 🔍 Фильтры
// // ------------------------------------------------------------------

// function setupFilters() {
//   [searchInput, regionFilter, typeFilter, ratingFilter].forEach(input => {
//     input.addEventListener("input", applyFilters);
//   });

//   document.getElementById("resetButton").addEventListener("click", () => {
//     searchInput.value = "";
//     regionFilter.selectedIndex = 0;
//     typeFilter.selectedIndex = 0;
//     ratingFilter.selectedIndex = 0;
//     applyFilters();
//   });
// }

// function applyFilters() {
//   const searchValue = searchInput.value.toLowerCase();
//   const regionValue = regionFilter.value;
//   const typeValue = typeFilter.value;
//   const ratingValue = parseFloat(ratingFilter.value);

//   filteredPlaces = placesData.filter(place => {
//     const matchesSearch = place.title.toLowerCase().includes(searchValue);
//     const matchesRegion = !regionValue || place.region === regionValue;
//     const matchesType = !typeValue || place.type === typeValue;
//     const matchesRating = isNaN(ratingValue) || place.rating >= ratingValue;

//     return matchesSearch && matchesRegion && matchesType && matchesRating;
//   });

//   renderPlaces(filteredPlaces);
// }

// function populateFilters() {
//   const regions = new Set();
//   const types = new Set();

//   placesData.forEach(place => {
//     regions.add(place.region);
//     types.add(place.type);
//   });

//   regionFilter.innerHTML = '<option value="">Все регионы</option>';
//   typeFilter.innerHTML = '<option value="">Все категории</option>';

//   regions.forEach(region => {
//     const option = document.createElement("option");
//     option.value = region;
//     option.textContent = region;
//     regionFilter.appendChild(option);
//   });

//   types.forEach(type => {
//     const option = document.createElement("option");
//     option.value = type;
//     option.textContent = type;
//     typeFilter.appendChild(option);
//   });
// }

// // ------------------------------------------------------------------
// // 🧭 Прокрутка к якорям
// // ------------------------------------------------------------------

// function getYOffsetForScreenWidth() {
//   const screenWidth = window.innerWidth;
//   const headerHeight = header.offsetHeight;

//   if (screenWidth >= 1078) return -50;
//   if (screenWidth > 768) return -100;
//   return -180;
// }

// function scrollToAnchor(anchorId) {
//   const element = document.getElementById(anchorId);
//   if (element) {
//     const yOffset = getYOffsetForScreenWidth();
//     const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
//     window.scrollTo({ top: y, behavior: "smooth" });
//   }
// }

// document.querySelectorAll('a[href^="#"]').forEach(link => {
//   link.addEventListener("click", e => {
//     e.preventDefault();
//     const anchorId = link.getAttribute("href").substring(1);
//     scrollToAnchor(anchorId);
//   });
// });


// // ------------------------------------------------------------------
// // 📱 Popup (мобильное меню)
// // ------------------------------------------------------------------

// hamb.addEventListener("click", () => {
//   popup.classList.toggle("open");
//   hamb.classList.toggle("active");
//   body.classList.toggle("noscroll");
//   renderPopup();
// });

// function renderPopup() {
//   if (!popup.contains(menu)) {
//     popup.appendChild(menu);
//   }
// }

// // Закрытие popup при клике на ссылку (jQuery)
// jQuery($ => {
//   $(document).on("click", ".link", function () {
//     $("#popup").removeClass("open");
//     $("#hamb").removeClass("active");
//     $("body").removeClass("noscroll");
//     $("header").removeClass("header-fixed");
//   });
// });











// 📋 Техническое задание

// 1. Цель проекта
// Создать адаптивный веб-сайт, который представляет собой интерактивный каталог культурных достопримечательностей Казахстана, с возможностью поиска, фильтрации, отзывов и сохранения избранных мест.

// 2. Основной функционал
// 🔹Каталог достопримечательностей
//  Карточки объектов (название, фото, краткое описание, категория, регион, рейтинг).
//  Кнопка "Подробнее" — открывает модальное окно или отдельную страницу.
//  Фильтрация по:
//  Региону (области)
//  Типу (природа, музей, фестиваль и т.д.)
// Рейтингу
// Поиск по названию

// 🔹Избранное
// Пользователь может сохранить достопримечательность в избранное
// Хранение через LocalStorage

// 🔹Отзывы и рейтинги
// Каждый объект имеет отзывы
// Форма отправки отзыва (имя, оценка, текст)
// Отзывы сохраняются в PHP-базе или локально (на этапе без бэкенда)
// 🔹Афиша
// Отдельный раздел с мероприятиями (фестивали, праздники)
// Карточки с датой, местом, описанием

// 🔹Блог
// Статьи о культуре и традициях
// Простой markdown-парсер или HTML-редактор (если подключаешь админку)

// 🔹Админ-панель (дополнительно)
// Добавление/удаление достопримечательностей, событий, статей
// Авторизация администратора (простая форма логина)
// Реализация на PHP + SQLite или JSON


// 3. Технические требования
// Язык: HTML5, CSS3, JavaScript (Vanilla), PHP (если нужен сервер)
// Адаптивность: Да (мобильная версия обязана быть удобной)
// SEO: Семантическая верстка
// Скорость: Быстрая загрузка, оптимизированные изображения
// Хостинг: Netlify, GitHub Pages или любой с поддержкой PHP

// 4. Дизайн
// Минималистичный, чистый UI
// Вдохновляться сайтами типа https://culturetrip.com
// Цветовая палитра: земляные и этнические оттенки
// UI-компоненты: карточки, табы, модальные окна, звездочные рейтинги


// 🧠 Прототип (в текстовом виде)
// ```
// [Главная страница]
// - Хедер: логотип | Каталог | Афиша | Блог | Избранное
// - Поисковая строка + фильтры (регион, тип, рейтинг)
// - Карточки достопримечательностей (фото, название, рейтинг, кнопка "Подробнее" / "☆ В избранное")

// [Модалка/страница достопримечательности]
// - Большое фото
// - Название, регион, категория, рейтинг
// - Описание
// - Список отзывов
// - Форма добавления отзыва

// [Избранное]
// - Отображаются только добавленные в избранное карточки

// [Афиша]
// - Список событий (фильтр по дате или региону)
// - Карточки с датой и местом

// [Блог]
// - Список статей
// - Чтение статьи (отдельная страница)

// [Админка] (опционально)
// - Форма входа
// - Панель добавления/редактирования карточек, событий, статей
// ```
// 🧭 План реализации по шагам

// 🔹 Шаг 1: Подготовка
//  Создай репозиторий на GitHub
//  Сверстай каркас проекта: index.html, style.css, scripts.js
//  Подключи базовый шаблон с навигацией и футером
// 🔹 Шаг 2: Каталог достопримечательностей
//  Создай JSON-файл или JS-массив с тестовыми данными (название, описание, фото, тип, регион, рейтинг)
//  Реализуй отрисовку карточек через JavaScript
//  Добавь фильтрацию и поиск
//  Реализуй избранное через LocalStorage
//  Открой карточку в модалке или на отдельной странице
// 🔹 Шаг 3: Отзывы
//  Добавь форму добавления отзыва
//  Сохраняй отзывы в LocalStorage или в JSON-массив
//  (Опционально) Добавь PHP-обработку с записью в файл
// 🔹 Шаг 4: Афиша и блог
//  Сделай отдельную страницу "Афиша" — события, даты
//  Сделай страницу "Блог" — статьи, категории
//  Используй карточки для визуала
// 🔹 Шаг 5: Адаптивность и анимации
//  Добавь мобильную верстку (media queries)
//  Добавь анимации (например, scroll reveal, hover эффекты)
// 🔹 Шаг 6: Админка (опционально)
//  Простая авторизация (логин/пароль)
//  Формы добавления достопримечательностей/событий/статей
//  Сохранение данных в JSON-файл или SQLite
// 🔹 Шаг 7: Завершение и деплой
//  Проверь адаптивность, производительность, SEO
//  Сделай favicon и social preview image
//  Задеплой на Netlify или Vercel
//  Поделись ссылкой в портфолио