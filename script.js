const apiKey = "176d2a6b";

/* SEARCH */

function searchMovie(){
const movie = document.getElementById("movieInput").value.trim();
const result = document.getElementById("movieResult");
const error = document.getElementById("error");

error.innerHTML = "";
result.innerHTML = "";

if(movie === ""){
error.innerHTML = "⚠️ Enter movie name";
return;
}

fetch(`https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`)
.then(res => res.json())
.then(d => {

if(d.Response === "True"){
result.innerHTML = createCard(d);
}else{
error.innerHTML = "❌ Movie not found";
}

});
}


/* 🎬 CREATE CARD (IMDB ID FIX 🔥) */

function createCard(d){

const poster = d.Poster !== "N/A" ? d.Poster : "https://via.placeholder.com/300x450?text=No+Image";

return `
<div class="movie-card">

<img src="${poster}" onclick="openMovie('${d.imdbID}')">

<div class="rating">⭐ ${d.imdbRating}</div>

<div class="movie-overlay">
<h4>${d.Title}</h4>

<button class="fav-btn"
onclick="event.stopPropagation(); addToFavorites('${d.imdbID}')">
❤️
</button>

</div>

</div>
`;
}


/* 🔥 TRENDING MOVIES */

function loadTrendingMovies(){

const movies = ["The Avengers","Avatar","Joker","Interstellar"];

const container = document.getElementById("trendingMovies");
container.innerHTML = "";

movies.forEach(m => {

fetch(`https://www.omdbapi.com/?t=${m}&apikey=${apiKey}`)
.then(r => r.json())
.then(d => {

if(d.Response === "True"){
container.innerHTML += createCard(d);
}

});

});

}


/* 🎬 OPEN MOVIE (USING IMDB ID 💯) */

function openMovie(id){

fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
.then(r => r.json())
.then(d => {

if(d.Response === "True"){

const poster = d.Poster !== "N/A" ? d.Poster : "";
const rating = d.imdbRating || "N/A";
const year = d.Year || "N/A";
const genre = d.Genre || "N/A";
const director = d.Director !== "N/A" ? d.Director : "Not available";
const actors = d.Actors !== "N/A" ? d.Actors : "Not available";
const plot = d.Plot !== "N/A" ? d.Plot : "No description available";

document.getElementById("modalDetails").innerHTML = `

<img src="${poster}">

<h2>${d.Title}</h2>

<div class="rating">⭐ IMDb ${rating}</div>

<p><b>Year:</b> ${year}</p>
<p><b>Genre:</b> ${genre}</p>
<p><b>Director:</b> ${director}</p>
<p><b>Actors:</b> ${actors}</p>

<p>${plot}</p>

<button class="fav-btn" onclick="addToFavorites('${d.imdbID}')">
❤️ Add to Favorites
</button>

<br>

<a href="https://www.youtube.com/results?search_query=${d.Title}+trailer"
target="_blank"
class="trailer-btn">▶ Watch Trailer</a>

`;

document.getElementById("movieModal").style.display = "block";

}else{
alert("❌ Movie not found");
}

});
}


/* ❌ CLOSE MODAL */

function closeModal(){
document.getElementById("movieModal").style.display = "none";
}

window.onclick = function(e){
const modal = document.getElementById("movieModal");
if(e.target === modal){
modal.style.display = "none";
}
};


/******** ❤️ FAVORITES SYSTEM (IMDB ID BASED 🔥) ********/

function addToFavorites(id){

let fav = JSON.parse(localStorage.getItem("fav")) || [];

if(!fav.includes(id)){
fav.push(id);
localStorage.setItem("fav", JSON.stringify(fav));
alert("✅ Added to Favorites");
loadFavorites();
}else{
alert("⚠️ Already added");
}

}


function loadFavorites(){

let fav = JSON.parse(localStorage.getItem("fav")) || [];
const container = document.getElementById("favoriteMovies");

container.innerHTML = "";

fav.forEach(id => {

fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
.then(r => r.json())
.then(d => {

if(d.Response === "True"){
container.innerHTML += createCard(d);
}

});

});

}


/* 🚀 START */

loadTrendingMovies();
loadFavorites();


/* ⌨️ ENTER KEY SEARCH */

document.getElementById("movieInput")
.addEventListener("keypress", function(e){
if(e.key === "Enter"){
searchMovie();
}
});
