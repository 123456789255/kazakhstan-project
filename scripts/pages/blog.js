document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("blogContainer");
    const searchInput = document.getElementById("searchInput");
    const regionSelect = document.getElementById("regionSelect");
    const citySelect = document.getElementById("citySelect");
    const resetBtn = document.getElementById("resetFilters");

    // Функция для рендеринга статей
    function renderArticles(filtered) {
        container.innerHTML = "";

        if (filtered.length === 0) {
            container.innerHTML = "<p>Статей не найдено.</p>";
            return;
        }

        filtered.forEach(article => {
            const card = createArticleCard(article);
            container.appendChild(card);
        });
    }

    // Функция для создания карточки статьи
    function createArticleCard(article) {
        const card = document.createElement("div");
        card.classList.add("blog-card");

        card.innerHTML = `
            <img src="${article.image}" alt="${article.title}">
            <h2>${article.title}</h2>
            <p>${article.summary}</p>
            <a href="blog_item.html?id=${article.id}">Читать далее</a>
        `;

        return card;
    }

    // Функция для применения фильтров
    function applyFilters() {
        const searchText = searchInput.value.trim().toLowerCase();
        const selectedRegion = regionSelect.value;
        const selectedCity = citySelect.value;

        const filtered = filterArticles(searchText, selectedRegion, selectedCity);
        renderArticles(filtered);
    }

    // Фильтрация статей по всем критериям
    function filterArticles(searchText, selectedRegion, selectedCity) {
        return articles.filter(article => {
            const matchesTitle = article.title.toLowerCase().includes(searchText);
            const matchesRegion = selectedRegion === "" || article.region === selectedRegion;
            const matchesCity = selectedCity === "" || article.city === selectedCity;

            return matchesTitle && matchesRegion && matchesCity;
        });
    }

    // Обработчик для сброса фильтров
    function resetFilters() {
        searchInput.value = "";
        regionSelect.value = "";
        citySelect.value = "";

        // Обновляем списки городов и регионов и отображаем все статьи
        updateCitySelect();
        updateRegionSelect();
        renderArticles(articles);
    }

    // Обновление списка городов на основе выбранного региона
    function updateCitySelect() {
        const selectedRegion = regionSelect.value;
        const cities = getCitiesForRegion(selectedRegion);

        // Очистка и наполнение списка городов
        citySelect.innerHTML = '<option value="">Все города</option>';
        cities.forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }

    // Получение уникальных городов для выбранного региона
    function getCitiesForRegion(region) {
        const cities = new Set();

        articles.forEach(article => {
            if (region === "" || article.region === region) {
                cities.add(article.city);
            }
        });

        return Array.from(cities).sort();
    }

    // Обновление списка регионов на основе выбранного города
    function updateRegionSelect() {
        const selectedCity = citySelect.value;
        const regions = getRegionsForCity(selectedCity);

        // Очистка и наполнение списка регионов
        regionSelect.innerHTML = '<option value="">Все регионы</option>';
        regions.forEach(region => {
            const option = document.createElement("option");
            option.value = region;
            option.textContent = region;
            regionSelect.appendChild(option);
        });
    }

    // Получение уникальных регионов для выбранного города
    function getRegionsForCity(city) {
        const regions = new Set();

        articles.forEach(article => {
            if (city === "" || article.city === city) {
                regions.add(article.region);
            }
        });

        return Array.from(regions).sort();
    }

    // Инициализация событий
    searchInput.addEventListener("input", applyFilters);
    regionSelect.addEventListener("change", () => {
        updateCitySelect();
        applyFilters();
    });
    citySelect.addEventListener("change", applyFilters);

    resetBtn.addEventListener("click", resetFilters);

    // Инициализация списка городов и регионов
    updateCitySelect();
    updateRegionSelect();
    renderArticles(articles); // Начальный рендер
});


/*
Что даст Блог с Markdown? И как мне его подключить если blog\_item.html выглядит так

<!DOCTYPE html>

<html lang="ru">

<head>
    <meta charset="UTF-8">
    <title>Статья</title>
    <link rel="stylesheet" href="css/blog.css">
    <link rel="stylesheet" href="../style.css">

</head>

<body>
    <main id="main">
        <section class="article-section">
            <div class="container">
                <a href="blog.html" class="back">&laquo;&laquo;&laquo;&laquo;&laquo;&laquo;&laquo;&laquo;</a>
                <div id="articleContent"></div>
            </div>
        </section>
    </main>

```
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="js/header.js"></script>
<script src="data/blog_item.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById('content').innerHTML = marked(articleMarkdown);
        const params = new URLSearchParams(window.location.search);
        const articleId = params.get("id");
        const article = articles.find(a => a.id === articleId);
        const container = document.getElementById("articleContent");

        if (!container) {
            console.error("Элемент #articleContent не найден!");
            return;
        }

        if (!article) {
            container.innerHTML = "<p>Статья не найдена.</p>";
            return;
        }

        container.innerHTML = article.content;
    });
</script>
```

</body>

</html>

а blog\_item.js выглядит так
const articles = \[
{
id: "1",
date: "2025-05-01",
title: "Наурыз — праздник весны",
image: "../images/borovoe1305252002.webp",
summary: "Наурыз — древний праздник, отмечаемый в день весеннего равноденствия...",
region: "Вся страна",
city: "",
content: `       <img src="../images/borovoe1305252002.webp" alt="Наурыз">       <h1>Наурыз — праздник весны</h1>       <p>Наурыз — древний праздник, отмечаемый в день весеннего равноденствия...</p>
    `
},
{
id: "2",
date: "2025-05-02",
title: "Казахские традиции гостеприимства",
image: "../images/borovoe1305252002.webp",
summary: "Гостеприимство — одна из главных традиций казахского народа...",
region: "Вся страна",
city: "",
content: `       <img src="../images/borovoe1305252002.webp" alt="Гостеприимство">       <h1>Казахские традиции гостеприимства</h1>       <p>Гостеприимство — одна из главных традиций казахского народа...</p>
    `
}
];

blog.html:

<!DOCTYPE html>

<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Блог</title>
    <link rel="stylesheet" href="css/blog.css">
    <link rel="stylesheet" href="../style.css">
</head>

<body>
    <main id="main">
        <section class="blog-section">
            <div class="container">
                <div id="filters">
                    <input type="text" id="searchInput" placeholder="Поиск по названию..." />
                    <select id="regionSelect"></select>
                    <select id="citySelect"></select>
                    <button id="resetFilters">Сбросить фильтры</button>
                </div>
                <div id="blogContainer" class="blog-grid"></div>
            </div>
        </section>
        <!-- <section class="ooo">
            <h1>Блог в разработке...</h1>
            <a href="../index.html">Вернуться назад</a>
        </section> -->
    </main>
    <!-- Сначала данные -->
    <script src="data/blog_item.js"></script>

```
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<!-- Потом логика -->
<script src="js/header.js"></script>
<script src="js/blog.js"></script>
```

</body>

</html>

blog.js:
document.addEventListener("DOMContentLoaded", () => {
const container = document.getElementById("blogContainer");
const searchInput = document.getElementById("searchInput");
const regionSelect = document.getElementById("regionSelect");
const citySelect = document.getElementById("citySelect");
const resetBtn = document.getElementById("resetFilters");

```
// Функция для рендеринга статей
function renderArticles(filtered) {
    container.innerHTML = "";

    if (filtered.length === 0) {
        container.innerHTML = "<p>Статей не найдено.</p>";
        return;
    }

    filtered.forEach(article => {
        const card = createArticleCard(article);
        container.appendChild(card);
    });
}

// Функция для создания карточки статьи
function createArticleCard(article) {
    const card = document.createElement("div");
    card.classList.add("blog-card");

    card.innerHTML = `
        <img src="${article.image}" alt="${article.title}">
        <h2>${article.title}</h2>
        <p>${article.summary}</p>
        <a href="blog_item.html?id=${article.id}">Читать далее</a>
    `;

    return card;
}

// Функция для применения фильтров
function applyFilters() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedRegion = regionSelect.value;
    const selectedCity = citySelect.value;

    const filtered = filterArticles(searchText, selectedRegion, selectedCity);
    renderArticles(filtered);
}

// Фильтрация статей по всем критериям
function filterArticles(searchText, selectedRegion, selectedCity) {
    return articles.filter(article => {
        const matchesTitle = article.title.toLowerCase().includes(searchText);
        const matchesRegion = selectedRegion === "" || article.region === selectedRegion;
        const matchesCity = selectedCity === "" || article.city === selectedCity;

        return matchesTitle && matchesRegion && matchesCity;
    });
}

// Обработчик для сброса фильтров
function resetFilters() {
    searchInput.value = "";
    regionSelect.value = "";
    citySelect.value = "";

    // Обновляем списки городов и регионов и отображаем все статьи
    updateCitySelect();
    updateRegionSelect();
    renderArticles(articles);
}

// Обновление списка городов на основе выбранного региона
function updateCitySelect() {
    const selectedRegion = regionSelect.value;
    const cities = getCitiesForRegion(selectedRegion);

    // Очистка и наполнение списка городов
    citySelect.innerHTML = '<option value="">Все города</option>';
    cities.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
}

// Получение уникальных городов для выбранного региона
function getCitiesForRegion(region) {
    const cities = new Set();

    articles.forEach(article => {
        if (region === "" || article.region === region) {
            cities.add(article.city);
        }
    });

    return Array.from(cities).sort();
}

// Обновление списка регионов на основе выбранного города
function updateRegionSelect() {
    const selectedCity = citySelect.value;
    const regions = getRegionsForCity(selectedCity);

    // Очистка и наполнение списка регионов
    regionSelect.innerHTML = '<option value="">Все регионы</option>';
    regions.forEach(region => {
        const option = document.createElement("option");
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
    });
}

// Получение уникальных регионов для выбранного города
function getRegionsForCity(city) {
    const regions = new Set();

    articles.forEach(article => {
        if (city === "" || article.city === city) {
            regions.add(article.region);
        }
    });

    return Array.from(regions).sort();
}

// Инициализация событий
searchInput.addEventListener("input", applyFilters);
regionSelect.addEventListener("change", () => {
    updateCitySelect();
    applyFilters();
});
citySelect.addEventListener("change", applyFilters);

resetBtn.addEventListener("click", resetFilters);

// Инициализация списка городов и регионов
updateCitySelect();
updateRegionSelect();
renderArticles(articles); // Начальный рендер
```

});
*/


















/*
У меня есть ТЗ, по нему уже сделано не мало. Сделан основной функционал, избранное, отзывы (без хранения их в админке, они хранятся в local storage), афиша, блог (без Простой markdown-парсер или HTML-редактор (если подключаешь админку)).
Система файлов выглядит следующим образом
kazakhstan\_project/
│
├── index.html
├── style.css
│
├── data/
│   └── places.js
│
├── images/
│   └── ... (фотографии)
│
├── pages/
│   ├── blog.html
│   ├── blog\_item.html
│   ├── event.html
│   ├── css/
│   │   ├── afisha.css
│   │   └── blog.css
│   ├── data/
│   │   ├── blog\_item.js
│   │   └── events.js
│   └── js/
│       ├── afisha.js
│       ├── blog.js
│       └── header.js
│
├── scripts/
│   ├── favorites.js
│   ├── filters.js
│   ├── header.js
│   ├── main.js
│   └── modal.js

Что можно еще сделать если я хочу выложить проект на netlify?

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
// Вдохновляться сайтами типа [https://culturetrip.com](https://culturetrip.com)
// Цветовая палитра: земляные и этнические оттенки
// UI-компоненты: карточки, табы, модальные окна, звездочные рейтинги

// 🧠 Прототип (в текстовом виде)
// \`\`\`
// \[Главная страница]
// - Хедер: логотип | Каталог | Афиша | Блог | Избранное
// - Поисковая строка + фильтры (регион, тип, рейтинг)
// - Карточки достопримечательностей (фото, название, рейтинг, кнопка "Подробнее" / "☆ В избранное")

// \[Модалка/страница достопримечательности]
// - Большое фото
// - Название, регион, категория, рейтинг
// - Описание
// - Список отзывов
// - Форма добавления отзыва

// \[Избранное]
// - Отображаются только добавленные в избранное карточки

// \[Афиша]
// - Список событий (фильтр по дате или региону)
// - Карточки с датой и местом

// \[Блог]
// - Список статей
// - Чтение статьи (отдельная страница)

// \[Админка] (опционально)
// - Форма входа
// - Панель добавления/редактирования карточек, событий, статей
// \`\`\`
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
*/



















/*
🧩 3. Что можно добавить как "бонус" (для портфолио)

🔐 Простая "админка" (даже если на JS и localStorage)
Добавь admin.html с авторизацией (например, пароль hardcoded в JS)
Сделай формы для добавления достопримечательности, статьи, события (с сохранением в LocalStorage или файл)
Это украсит проект как демонстрация полного цикла: CRUD + UI
*/