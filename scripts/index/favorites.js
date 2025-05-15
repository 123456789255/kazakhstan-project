// js/favorites.js

export let favorites = [];

export function loadFavorites() {
  const saved = localStorage.getItem("favorites");
  if (saved) favorites = JSON.parse(saved);
}

export function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

export function isFavorite(placeId) {
  return favorites.some(fav => fav.id === placeId);
}

export function toggleFavorite(place) {
  if (!isFavorite(place.id)) {
    favorites.push(place);
    saveFavorites();
    alert(`${place.title} добавлено в избранное!`);
  } else {
    alert(`${place.title} уже в избранном.`);
  }
}

export function removeFavorite(placeId) {
  favorites = favorites.filter(fav => fav.id !== placeId);
  saveFavorites();
}

export function renderFavorites(container, onDetailsClick) {
  container.innerHTML = favorites.length === 0
    ? "<p>Пока нет избранных мест.</p>"
    : "";

  favorites.forEach(place => {
    const card = document.createElement("div");
    card.className = "place-card";
    card.innerHTML = `
      <img src="${place.image}" alt="${place.title}" />
      <h3>${place.title}</h3>
      <p><strong>Регион:</strong> ${place.region}</p>
      <p><strong>Категория:</strong> ${place.type}</p>
      <p><strong>Рейтинг:</strong> ⭐ ${place.rating}</p>
      <button class="details-btn">Подробнее</button>
      <button class="remove-btn">Удалить</button>
    `;

    card.querySelector(".details-btn").addEventListener("click", () => onDetailsClick(place));
    card.querySelector(".remove-btn").addEventListener("click", () => {
      removeFavorite(place.id);
      renderFavorites(container, onDetailsClick);
    });

    container.appendChild(card);
  });
}
