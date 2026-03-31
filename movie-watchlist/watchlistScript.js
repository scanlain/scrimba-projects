const watchMoviesEl = document.querySelector('.watch-movie-section-list')

let watchListMovies = JSON.parse(localStorage.getItem('watchlist')) || []

export function addToWatchlist(movie){

    const alreadyAdded = watchListMovies.some((m) => m.imdbID == movie.imdbID)

    if(!alreadyAdded){

        watchListMovies.push(movie)

        localStorage.setItem('watchlist', JSON.stringify(watchListMovies))
    
        console.log("watchlist : ", watchListMovies)
        
    }    
}

if(watchMoviesEl){
   
    renderWatchListMovies()

}

function renderWatchListMovies(){

    if(watchListMovies.length === 0){
        watchMoviesEl.innerHTML = `
             <p class="intro-text">Your watchlist is looking a little empty</p>
            <a href="./index.html" class="redirect-add-movies">
            <i class="fa-solid fa-plus"></i>
            <p>Let's add some movies</p>
            </a>
        `
    }
    else{

        watchMoviesEl.innerHTML = watchListMovies.map(movie => `
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
                     <div class="remove-movie-btn" data-imdbid="${movie.imdbID}">
                        <i class="fa-solid fa-minus"></i>
                        <p>Remove from watchlist</p>
                    </div>
                    <div class="movie-description">
                        <p>${movie.Plot}</p>
                    </div>
                </div>
            </div>
            `).join('')
    
    
        watchMoviesEl.addEventListener('click', function(event){
    
            const removeBtn = event.target.closest('.remove-movie-btn')
    
            console.log(removeBtn)
    
            if(removeBtn){
                removeFromWatchlist(removeBtn.dataset.imdbid)
            }
        })
    
    }

}

function removeFromWatchlist(imdbID){
    watchListMovies = watchListMovies.filter(movie => movie.imdbID !== imdbID)
    localStorage.setItem('watchlist', JSON.stringify(watchListMovies))
    renderWatchListMovies()
}

    