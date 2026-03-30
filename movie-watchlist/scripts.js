const searchInputEl = document.querySelector('#search-el')
const searchActionBtn = document.querySelector('.search-btn')
const movieSectionList = document.querySelector('.movie-section-list')

const API_KEY = 'd9d789cd'
const API_URL = 'https://www.omdbapi.com/?apiKey='

searchActionBtn.addEventListener('click', function(event){

    const searchParams = searchInputEl.value
    
    const requestURL = `${API_URL}${API_KEY}&t=${searchParams}`

    fetchMovieDetails(requestURL)
})

async function fetchMovieDetails(requestURL){

    const response = await fetch(requestURL)
    const movieResults = await response.json()

    if(movieResults.Response === "True" && movieResults.Poster !== "N/A"){
        
        buildMovieSections(movieResults)
    }
    else{
        movieSectionList.textContent = "Unable to find what you’re looking for. Please try another search."
    }
       
}

function buildMovieSections(movie){

    let htmlString = `
        <div class="movie-wrapper">
            <div class="movie-poster">
                <img src="${movie.Poster}">
            </div>
            <div class="movie-overview">
                <div class="movie-header">
                    <h3 class="movie-name">${movie.Title}</h3>
                    <div class="ratings">
                        <i class="fa-solid fa-star" style="color: gold;"></i>
                        <span class="movie-rating">${movie.imdbRating}</span>
                    </div>
                </div>
                <div class="movie-details">
                    <p>${movie.Runtime}</p>
                    <p>${movie.Genre}</p>
                </div>
                <div class="movie-description">
                    <p>${movie.Plot}</p>
                </div>
            </div>
        </div>
    `

    movieSectionList.innerHTML = htmlString
    
}