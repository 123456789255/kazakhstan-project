// js/filters.js

export function setupFilters(applyFilters, resetCallback) {
  const searchInput = document.getElementById("searchInput");
  const regionFilter = document.getElementById("regionFilter");
  const typeFilter = document.getElementById("typeFilter");
  const ratingFilter = document.getElementById("ratingFilter");

  [searchInput, regionFilter, typeFilter, ratingFilter].forEach(input =>
    input.addEventListener("input", applyFilters)
  );

  document.getElementById("resetButton").addEventListener("click", () => {
    searchInput.value = "";
    regionFilter.selectedIndex = 0;
    typeFilter.selectedIndex = 0;
    ratingFilter.selectedIndex = 0;
    resetCallback();
  });
}

export function applyFilters(data) {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const regionValue = document.getElementById("regionFilter").value;
  const typeValue = document.getElementById("typeFilter").value;
  const ratingValue = parseFloat(document.getElementById("ratingFilter").value);

  return data.filter(place => {
    const matchesSearch = place.title.toLowerCase().includes(searchValue);
    const matchesRegion = !regionValue || place.region === regionValue;
    const matchesType = !typeValue || place.type === typeValue;
    const matchesRating = isNaN(ratingValue) || place.rating >= ratingValue;
    return matchesSearch && matchesRegion && matchesType && matchesRating;
  });
}

export function populateFilters(data) {
  const regionFilter = document.getElementById("regionFilter");
  const typeFilter = document.getElementById("typeFilter");

  const regions = new Set();
  const types = new Set();

  data.forEach(place => {
    regions.add(place.region);
    types.add(place.type);
  });

  regionFilter.innerHTML = '<option value="">Все регионы</option>';
  typeFilter.innerHTML = '<option value="">Все категории</option>';

  regions.forEach(region => {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    regionFilter.appendChild(option);
  });

  types.forEach(type => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    typeFilter.appendChild(option);
  });
}
