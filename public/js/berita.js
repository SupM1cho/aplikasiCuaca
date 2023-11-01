const apiUrl = "http://api.mediastack.com/v1/news?access_key=caac4b704a322973810960c541fa1e0c&languages=en&countries=id&limit=5";
const categorySelect = document.getElementById("category");
const newsContainer = document.getElementById("news-container");

categorySelect.addEventListener("change", function() {
    const category = categorySelect.value;
    const categoryUrl = "http://api.mediastack.com/v1/news?access_key=caac4b704a322973810960c541fa1e0c&languages=en&limit=5&categories=" + category;
    fetchNews(categoryUrl);
});

function fetchNews(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data?.data) {
            const articles = data.data;
            newsContainer.innerHTML = "";

            for (const article of articles) {
                const newsCard = document.createElement("div");
                newsCard.classList.add("news-card");
                const img = document.createElement("img");
                img.src = article?.image;
                const h2 = document.createElement("h2");
                h2.textContent = article?.title;
                const p = document.createElement("p");
                p.textContent = article?.description;
                const a = document.createElement("a");
                a.href = article?.url;
                a.textContent = "Read more";
                newsCard.appendChild(img);
                newsCard.appendChild(h2);
                newsCard.appendChild(p);
                newsCard.appendChild(a);
                newsContainer.appendChild(newsCard);
            }
        } else {
            console.log("Error: Invalid data");
        }
    })
    .catch(error => console.log(error));
}

fetchNews(apiUrl);