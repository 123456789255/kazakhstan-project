document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("eventsList");
    const titleInput = document.getElementById("searchTitle");
    const regionSelect = document.getElementById("regionFilter");
    const dateInput = document.getElementById("dateFilter");
    const resetButton = document.getElementById("resetButton");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Функция для генерации уникальных options по регионам
    function populateRegionOptions() {
        regionSelect.innerHTML = ""; // Очищаем список перед повторным добавлением

        // Создаём Set уникальных регионов
        const uniqueRegions = [...new Set(events.map(event => event.region))];

        // Добавляем пустой option для "все регионы"
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Все регионы";
        regionSelect.appendChild(defaultOption);

        // Добавляем уникальные регионы
        uniqueRegions.forEach(region => {
            const option = document.createElement("option");
            option.value = region;
            option.textContent = region;
            regionSelect.appendChild(option);
        });
    }

    // Функция для отрисовки отфильтрованных событий
    function renderFilteredEvents() {
        const titleQuery = titleInput.value.toLowerCase(); // Получаем запрос по названию
        const selectedRegion = regionSelect.value; // Получаем выбранный регион
        const selectedDate = dateInput.value; // Получаем выбранную дату

        container.innerHTML = ""; // Очистка списка перед отрисовкой

        // Фильтруем события по названию, региону и дате
        const filtered = filterEvents(titleQuery, selectedRegion, selectedDate);

        // Если нет отфильтрованных событий
        if (filtered.length === 0) {
            container.innerHTML = "<p>Мероприятия не найдены.</p>";
            return;
        }

        // Отрисовываем все отфильтрованные мероприятия
        filtered.forEach(event => {
            const card = createEventCard(event);
            container.appendChild(card);
        });
    }

    // Фильтрация событий по всем критериям
    function filterEvents(titleQuery, selectedRegion, selectedDate) {
        return events.filter(event => {
            const matchesTitle = event.title.toLowerCase().includes(titleQuery); // Фильтрация по названию
            const matchesRegion = selectedRegion ? event.region === selectedRegion : true; // Фильтрация по региону
            const matchesDate = selectedDate ? event.date === selectedDate : true; // Фильтрация по дате

            return matchesTitle && matchesRegion && matchesDate;
        }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Сортировка по дате
    }

    // Создание карточки события
    function createEventCard(event) {
        const card = document.createElement("div");
        card.classList.add("event-card");

        const eventDate = new Date(event.date);
        if (eventDate < today) {
            card.classList.add("last"); // Добавляем класс "last" для прошедших мероприятий
        }

        card.innerHTML = `
            <img src="${event.image}" alt="${event.title}" />
            <h2>${event.title}</h2>
            <p class="date"><strong>Дата:</strong> ${new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Место:</strong> ${event.location}</p>
            <p><strong>Регион:</strong> ${event.region}</p>
            <p class="description">${event.description}</p>
        `;

        return card;
    }

    // Слушатели событий для фильтров
    titleInput.addEventListener("input", renderFilteredEvents);  // Фильтрация по названию
    regionSelect.addEventListener("change", renderFilteredEvents);  // Фильтрация по региону
    dateInput.addEventListener("change", renderFilteredEvents);  // Фильтрация по дате

    // Сброс фильтров
    resetButton.addEventListener("click", () => {
        titleInput.value = "";
        regionSelect.value = "";
        dateInput.value = "";

        renderFilteredEvents(); // Перерисовываем все события без фильтров
    });

    // Инициализация
    populateRegionOptions();
    renderFilteredEvents(); // начальная отрисовка всех мероприятий
});
