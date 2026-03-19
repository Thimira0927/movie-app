const apiKey = "176d2a6b";

/* SEARCH MOVIE */

function searchMovie(){

const movie = document.getElementById("movieInput").value.trim();

const result = document.getElementById("movieResult");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

error.innerHTML = "";
result.innerHTML = "";

if(movie === ""){
error.innerHTML = "⚠️ Please enter a movie name";
return;
}

loading.style.display = "block";

fetch(`https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`)
.then(res => res.json())
.then(data => {

loading.style.display = "none";

if(data.Response === "True"){

result.innerHTML = createMovieCard(data);

}else{
error.innerHTML = "❌ Movie not found";
}

})
.catch(() => {
loading.style.display = "none";
error.innerHTML = "⚠️ Error fetching movie data";
});

}


/* 🎬 CREATE MOVIE CARD (NEW 🔥) */

function createMovieCard(data){
return `
<div class="movie-card" onclick="openMovie('${data.Title}')">

<img src="${data.Poster}" alt="${data.Title}">

<div class="rating">⭐ ${data.imdbRating}</div>

<div class="movie-overlay">
  <h4>${data.Title}</h4>
  <button class="fav-btn" onclick="event.stopPropagation(); addToFavorites('${data.Title}')">
  ❤️ Favorite
  </button>
</div>

</div>
`;
}


/* ENTER KEY SEARCH */

document.getElementById("movieInput").addEventListener("keypress", function(e){
if(e.key === "Enter"){
searchMovie();
}
});


/* LOAD MOVIES */

function loadMovies(movieList){

const container = document.getElementById("trendingMovies");
container.innerHTML = "";

movieList.forEach(movie => {

fetch(`https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`)
.then(res => res.json())
.then(data => {

if(data.Response === "True" && data.Poster !== "N/A"){

container.innerHTML += `
<div class="trending-card" onclick="openMovie('${data.Title}')">

<img src="${data.Poster}">
<p>${data.Title}</p>

</div>
`;

}

});

});

}


/* TRENDING */

function loadTrendingMovies(){

const movies = [
"avatar","avengers","doctor strange","spiderman",
"interstellar","joker"
];

loadMovies(movies);

}


/* CATEGORIES */

function loadCategory(type){

let movies = [];

if(type === "trending"){
movies = ["avatar","avengers","joker","spiderman","interstellar","batman"];
}

if(type === "popular"){
movies = ["titanic","inception","gladiator","dark knight","fight club","matrix"];
}

if(type === "top"){
movies = ["shawshank redemption","godfather","pulp fiction","forrest gump","lord of the rings"];
}

if(type === "action"){
movies = ["john wick","mad max","mission impossible","terminator","die hard"];
}

if(type === "comedy"){
movies = ["the mask","hangover","superbad","home alone","ted","mr bean"];
}

loadMovies(movies);

}


/* LOAD TRENDING */

loadTrendingMovies();


/* 🎬 OPEN MODAL (UPGRADED 🔥) */

function openMovie(title){

fetch(`https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`)
.then(res => res.json())
.then(data => {

const modal = document.getElementById("movieModal");
const details = document.getElementById("modalDetails");

details.innerHTML = `
<img src="${data.Poster}">

<h2>${data.Title}</h2>

<div class="rating">⭐ IMDb ${data.imdbRating}</div>

<p><b>Year:</b> ${data.Year}</p>
<p><b>Genre:</b> ${data.Genre}</p>
<p><b>Director:</b> ${data.Director}</p>
<p><b>Actors:</b> ${data.Actors}</p>

<p>${data.Plot}</p>

<button onclick="addToFavorites('${data.Title}')" class="fav-btn">
❤️ Add to Favorites
</button>

<br>

<a href="https://www.youtube.com/results?search_query=${data.Title}+trailer"
target="_blank"
class="trailer-btn">▶ Watch Trailer</a>
`;

modal.style.display = "block";

});

}


/* CLOSE MODAL */

function closeModal(){
document.getElementById("movieModal").style.display = "none";
}

window.onclick = function(e){
const modal = document.getElementById("movieModal");
if(e.target === modal){
modal.style.display = "none";
}
};


/* SLIDER */

function scrollLeft(){
document.getElementById("trendingMovies")
.scrollBy({ left:-400, behavior:"smooth" });
}

function scrollRight(){
document.getElementById("trendingMovies")
.scrollBy({ left:400, behavior:"smooth" });
}


/* ❤️ FAVORITES */

function addToFavorites(title){

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

if(!favorites.includes(title)){
favorites.push(title);
localStorage.setItem("favorites", JSON.stringify(favorites));
alert("✅ Added to Favorites");
loadFavorites();
}else{
alert("⚠️ Already in Favorites");
}

}


/* LOAD FAVORITES */

function loadFavorites(){

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
const container = document.getElementById("favoriteMovies");

if(!container) return;

container.innerHTML = "";

favorites.forEach(movie => {

fetch(`https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`)
.then(res => res.json())
.then(data => {

if(data.Response === "True"){

container.innerHTML += `
<div class="trending-card" onclick="openMovie('${data.Title}')">
<img src="${data.Poster}">
<p>${data.Title}</p>
</div>
`;

}

});

});

}


/* LOAD FAVORITES ON START */

loadFavorites();
