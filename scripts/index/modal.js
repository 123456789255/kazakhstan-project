// js/modal.js

import { isFavorite, toggleFavorite, removeFavorite, saveFavorites, renderFavorites } from './favorites.js';

let reviews = {};

export function loadReviews() {
  const saved = localStorage.getItem("reviews");
  if (saved) reviews = JSON.parse(saved);
}

export function openModal(place, favoritesContainer) {
  const modal = document.getElementById("modal");
  const body = document.body;

  document.getElementById("modal-img").src = place.image;
  document.getElementById("modal-title").textContent = place.title;
  document.getElementById("modal-description").textContent = place.description || "Описание пока недоступно.";
  document.getElementById("modal-region").textContent = place.region;
  document.getElementById("modal-category").textContent = place.type;
  document.getElementById("modal-rating").textContent = place.rating;

  const addBtn = document.getElementById("addToFavorites");
  const removeBtn = document.getElementById("removeFromFavorites");

  const favorite = isFavorite(place.id);
  addBtn.classList.toggle("hidden", favorite);
  removeBtn.classList.toggle("hidden", !favorite);

  addBtn.onclick = () => {
    toggleFavorite(place);
    renderFavorites(favoritesContainer, (p) => openModal(p, favoritesContainer));
    closeModal();
  };

  removeBtn.onclick = () => {
    removeFavorite(place.id);
    renderFavorites(favoritesContainer, (p) => openModal(p, favoritesContainer));
    closeModal();
  };

  setupReviewForm(place.id);
  renderReviews(place.id);
  modal.classList.remove("hidden");
  body.classList.add("noscroll");
}

export function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
  document.body.classList.remove("noscroll");
}

function setupReviewForm(placeId) {
  const form = document.getElementById("reviewForm");
  const author = document.getElementById("reviewAuthor");
  const text = document.getElementById("reviewText");
  const rating = document.getElementById("reviewRating");

  form.onsubmit = (e) => {
    e.preventDefault();
    if (!author.value || !text.value) return;

    const newReview = {
      author: author.value.trim(),
      text: text.value.trim(),
      date: new Date().toLocaleDateString(),
      rating: parseInt(rating.value, 10)
    };

    if (!reviews[placeId]) reviews[placeId] = [];
    reviews[placeId].push(newReview);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    renderReviews(placeId);
    form.reset();
  };
}

function renderReviews(placeId) {
  const list = document.getElementById("reviewsList");
  list.innerHTML = "";

  const placeReviews = reviews[placeId] || [];
  if (placeReviews.length === 0) {
    list.innerHTML = "<p>Пока нет отзывов.</p>";
    return;
  }

  placeReviews.forEach((r, i) => {
    const div = document.createElement("div");
    div.className = "review-item";
    div.innerHTML = `
      <p><strong>${r.author}</strong><br />(${r.date})</p>
      <span>${"⭐️".repeat(r.rating)}</span>
      <p>${r.text}</p>
      <button class="delete-review" data-index="${i}">Удалить</button>
    `;
    div.querySelector(".delete-review").onclick = () => {
      reviews[placeId].splice(i, 1);
      localStorage.setItem("reviews", JSON.stringify(reviews));
      renderReviews(placeId);
    };
    list.appendChild(div);
  });
}



// kazakhstan_project/
// │
// ├── index.html
// ├── style.css          
// │
// ├── data/
// │   └── places.js
// │
// ├── images/
// │   └── ... (фотографии)
// │
// ├── pages/
// │   ├── blog.html
// │   ├── blog_item.html
// │   ├── event.html
// │   ├── css/
// │   │   ├── afisha.css
// │   │   └── blog.css
// │   ├── data/
// │   │   ├── blog_item.js
// │   │   └── events.js
// │   └── js/
// │       ├── afisha.js
// │       ├── blog.js
// │       └── header.js
// │
// ├── scripts/
// │   ├── favorites.js
// │   ├── filters.js
// │   ├── header.js
// │   ├── main.js
// │   └── modal.js            
