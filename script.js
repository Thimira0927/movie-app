const apiKey = "176d2a6b";

/* SEARCH */

function searchMovie(){
const movie = document.getElementById("movieInput").value.trim();
const result = document.getElementById("movieResult");
const error = document.getElementById("error");

error.innerHTML = "";
result.innerHTML = "";

if(movie===""){
error.innerHTML="⚠️ Enter movie name";
return;
}

fetch(`https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`)
.then(res=>res.json())
.then(d=>{
if(d.Response==="True"){
result.innerHTML=createCard(d);
}else{
error.innerHTML="❌ Movie not found";
}
});
}

/* CARD */

function createCard(d){

const poster = d.Poster !== "N/A" ? d.Poster : "https://via.placeholder.com/300x450?text=No+Image";

return `
<div class="movie-card" onclick="openMovie('${d.Title}')">

<img src="${poster}">

<div class="rating">⭐ ${d.imdbRating}</div>

<div class="movie-overlay">
<h4>${d.Title}</h4>

<button class="fav-btn"
onclick="event.stopPropagation(); addToFavorites('${d.Title}')">
❤️
</button>

</div>

</div>
`;
}

/* TRENDING */

function loadTrendingMovies(){

const movies = ["The Avengers","Avatar","Joker","Interstellar"]; // 🔥 FIXED TITLES

const container = document.getElementById("trendingMovies");
container.innerHTML = "";

movies.forEach(m=>{

fetch(`https://www.omdbapi.com/?t=${m}&apikey=${apiKey}`)
.then(r=>r.json())
.then(d=>{

if(d.Response==="True"){
container.innerHTML+=createCard(d);
}

});

});
}

/* MODAL (FULL DETAILS 🔥) */

function openMovie(title){

fetch(`https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`)
.then(r=>r.json())
.then(d=>{

if(d.Response==="True"){

const poster = d.Poster !== "N/A" ? d.Poster : "";
const actors = d.Actors !== "N/A" ? d.Actors : "Not available";
const director = d.Director !== "N/A" ? d.Director : "Not available";
const genre = d.Genre || "N/A";
const year = d.Year || "N/A";
const rating = d.imdbRating || "N/A";
const plot = d.Plot !== "N/A" ? d.Plot : "No description available";

document.getElementById("modalDetails").innerHTML=`

<img src="${poster}">

<h2>${d.Title}</h2>

<div class="rating">⭐ IMDb ${rating}</div>

<p><b>Year:</b> ${year}</p>
<p><b>Genre:</b> ${genre}</p>
<p><b>Director:</b> ${director}</p>
<p><b>Actors:</b> ${actors}</p>

<p>${plot}</p>

<button class="fav-btn" onclick="addToFavorites('${d.Title}')">
❤️ Add to Favorites
</button>

<br>

<a href="https://www.youtube.com/results?search_query=${d.Title}+trailer"
target="_blank"
class="trailer-btn">▶ Watch Trailer</a>

`;

document.getElementById("movieModal").style.display="block";

}else{
alert("❌ Movie not found");
}

});
}

/* CLOSE */

function closeModal(){
document.getElementById("movieModal").style.display="none";
}

window.onclick = function(e){
const modal = document.getElementById("movieModal");
if(e.target === modal){
modal.style.display="none";
}
};

/* FAVORITES */

function addToFavorites(title){
let fav=JSON.parse(localStorage.getItem("fav"))||[];

if(!fav.includes(title)){
fav.push(title);
localStorage.setItem("fav",JSON.stringify(fav));
alert("✅ Added");
loadFavorites();
}else{
alert("⚠️ Already added");
}
}

function loadFavorites(){
let fav=JSON.parse(localStorage.getItem("fav"))||[];
const container=document.getElementById("favoriteMovies");

container.innerHTML="";

fav.forEach(m=>{
fetch(`https://www.omdbapi.com/?t=${m}&apikey=${apiKey}`)
.then(r=>r.json())
.then(d=>{
if(d.Response==="True"){
container.innerHTML+=createCard(d);
}
});
});
}

/* START */

loadTrendingMovies();
loadFavorites();

/* ENTER KEY */

document.getElementById("movieInput")
.addEventListener("keypress",function(e){
if(e.key==="Enter"){
searchMovie();
}
});
