document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get("id");
    const article = articles.find(a => a.id === articleId);
    const container = document.getElementById("articleContent");
    const container1 = document.getElementById("articleContent1");

    if (!container) return;
    if (!article) {
        container.innerHTML = "<p>Статья не найдена.</p>";
        return;
    }

    container1.innerHTML = `
        <a href="blog.html" class="back" data-tooltip="Назад">&lt;======</a>
        <p>🕓 ${new Date(article.date).toLocaleDateString()}</p>
        <p>🇰🇿 ${article.region}</p>
        <p>🗺️📌 ${article.city}</p>
    `;

    // Генерируем HTML из Markdown
    const htmlContent = marked.parse(article.content);
    container.innerHTML = `
        <img src="${article.image}" alt="${article.title}">
        ${htmlContent}
    `;


    // container.innerHTML = htmlContent;
});