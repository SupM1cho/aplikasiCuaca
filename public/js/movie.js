const apiKey = '73b2be20';
const searchParams = new URLSearchParams(window.location.search);
const searchQuery = searchParams.get('search');

if (searchQuery) {
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
            const searchResults = data.Search;
            const container = document.querySelector('.container');
            container.innerHTML = '';

            searchResults.forEach(result => {
                const imdbID = result.imdbID;
                const poster = result.Poster;
                const title = result.Title;
                const year = result.Year;

                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <a href="?id=${imdbID}">
                        <img src="${poster}" alt="${title} Poster">
                        <div class="card-body">
                            <h2 class="card-title">${title} (${year})</h2>
                        </div>
                    </a>
                `;

                container.appendChild(card);
            });
        })
        .catch(error => console.log(error));
} else {
    const imdbID = searchParams.get('id');

    if (imdbID) {
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
            .then(response => response.json())
            .then(data => {
                const poster = data.Poster;
                const title = data.Title;
                const plot = data.Plot;
                const director = data.Director;
                const actors = data.Actors;
                const genre = data.Genre;
                const released = data.Released;
                const runtime = data.Runtime;
                const imdbRating = data.imdbRating;

                const posterImg = document.querySelector('.card img');
                const titleEl = document.querySelector('.card-title');
                const plotEl = document.querySelector('.card-text:nth-of-type(1)');
                const directorEl = document.querySelector('.card-text:nth-of-type(2)');
                const actorsEl = document.querySelector('.card-text:nth-of-type(3)');
                const genreEl = document.querySelector('.card-text:nth-of-type(4)');
                const releasedEl = document.querySelector('.card-text:nth-of-type(5)');
                const runtimeEl = document.querySelector('.card-text:nth-of-type(6)');
                const imdbRatingEl = document.querySelector('.card-text:nth-of-type(7)');

                posterImg.src = poster;
                titleEl.textContent = title;
                plotEl.textContent = plot;
                directorEl.textContent += director;
                actorsEl.textContent += actors;
                genreEl.textContent += genre;
                releasedEl.textContent += released;
                runtimeEl.textContent += runtime;
                imdbRatingEl.textContent += imdbRating;
            })
            .catch(error => console.log(error));
    }
}

const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', event => {
    event.preventDefault();
    const searchInput = searchForm.querySelector('input[type="text"]');
    const searchValue = searchInput.value.trim();
    if (searchValue) {
        window.location.href = `?search=${searchValue}`;
    }
});

const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', event => {
        const imdbID = card.querySelector('a').getAttribute('href').split('=')[1];
        window.location.href = `?id=${imdbID}`;
    });
});