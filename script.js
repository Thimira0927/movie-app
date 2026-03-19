const apiKey = "176d2a6b";

/* SEARCH MOVIE */

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
.then(res=>res.json())
.then(data=>{

if(data.Response==="True"){
result.innerHTML = createCard(data);
}else{
error.innerHTML = "❌ Movie not found";
}

});

}


/* 🎬 CREATE CARD */

function createCard(data){
return `
<div class="movie-card" onclick="openMovie('${data.Title}')">

<img src="${data.Poster}">

<div class="rating">⭐ ${data.imdbRating}</div>

<div class="movie-overlay">
<h4>${data.Title}</h4>

<button class="fav-btn"
onclick="event.stopPropagation(); addToFavorites('${data.Title}')">
❤️ Favorite
</button>

</div>

</div>
`;
}


/* TRENDING MOVIES */

function loadTrendingMovies(){

const movies = ["avatar","avengers","joker","interstellar"];

const container = document.getElementById("trendingMovies");
container.innerHTML = "";

movies.forEach(m=>{

fetch(`https://www.omdbapi.com/?t=${m}&apikey=${apiKey}`)
.then(r=>r.json())
.then(d=>{

if(d.Response==="True"){

container.innerHTML += `
<div class="trending-card" onclick="openMovie('${d.Title}')">
<img src="${d.Poster}">
<p>${d.Title}</p>
</div>
`;

}

});

});

}


/* 🎬 OPEN MOVIE (FULL DETAILS 🔥) */

function openMovie(title){

fetch(`https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`)
.then(r=>r.json())
.then(d=>{

document.getElementById("modalDetails").innerHTML = `

<img src="${d.Poster}">

<h2>${d.Title}</h2>

<div class="rating">⭐ IMDb ${d.imdbRating}</div>

<p><b>Year:</b> ${d.Year}</p>
<p><b>Genre:</b> ${d.Genre}</p>
<p><b>Director:</b> ${d.Director}</p>
<p><b>Actors:</b> ${d.Actors}</p>

<p>${d.Plot}</p>

<button class="fav-btn" onclick="addToFavorites('${d.Title}')">
❤️ Add to Favorites
</button>

<br>

<a href="https://www.youtube.com/results?search_query=${d.Title}+trailer"
target="_blank"
class="trailer-btn">▶ Watch Trailer</a>

`;

document.getElementById("movieModal").style.display="block";

});

}


/* CLOSE MODAL */

function closeModal(){
document.getElementById("movieModal").style.display="none";
}

window.onclick = function(e){
const modal = document.getElementById("movieModal");
if(e.target === modal){
modal.style.display="none";
}
};


/* SLIDER */

function scrollLeft(){
document.getElementById("trendingMovies")
.scrollBy({left:-400,behavior:"smooth"});
}

function scrollRight(){
document.getElementById("trendingMovies")
.scrollBy({left:400,behavior:"smooth"});
}


/******** ❤️ FAVORITES SYSTEM ********/

function addToFavorites(title){

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

if(!favorites.includes(title)){
favorites.push(title);
localStorage.setItem("favorites", JSON.stringify(favorites));
alert("✅ Added to Favorites");
loadFavorites();
}else{
alert("⚠️ Already added");
}

}


/* LOAD FAVORITES */

function loadFavorites(){

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
const container = document.getElementById("favoriteMovies");

if(!container) return;

container.innerHTML = "";

favorites.forEach(movie=>{

fetch(`https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`)
.then(res=>res.json())
.then(d=>{

if(d.Response==="True"){

container.innerHTML += `
<div class="trending-card" onclick="openMovie('${d.Title}')">
<img src="${d.Poster}">
<p>${d.Title}</p>
</div>
`;

}

});

});

}


/* LOAD ON START */

loadTrendingMovies();
loadFavorites();


/* ENTER KEY SEARCH */

document.getElementById("movieInput")
.addEventListener("keypress", function(e){
if(e.key==="Enter"){
searchMovie();
}
});
