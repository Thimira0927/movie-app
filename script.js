const apiKey = "176d2a6b";

/* SEARCH */
function searchMovie(){
const movie = document.getElementById("movieInput").value.trim();
const result = document.getElementById("movieResult");
const error = document.getElementById("error");

error.innerHTML="";
result.innerHTML="";

if(movie===""){
error.innerHTML="⚠️ Enter movie name";
return;
}

fetch(`https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`)
.then(r=>r.json())
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
return `
<div class="movie-card">
<img src="${d.Poster}" onclick="openMovie('${d.imdbID}')">
<div class="rating">⭐ ${d.imdbRating}</div>
<div class="movie-overlay">
<h4>${d.Title}</h4>
<button class="fav-btn" onclick="event.stopPropagation(); addToFavorites('${d.imdbID}')">❤️</button>
</div>
</div>`;
}

/* TRENDING */
function loadTrendingMovies(){
["The Avengers","Avatar","Joker","Interstellar"].forEach(m=>{
fetch(`https://www.omdbapi.com/?t=${m}&apikey=${apiKey}`)
.then(r=>r.json())
.then(d=>{
if(d.Response==="True"){
document.getElementById("trendingMovies").innerHTML+=createCard(d);
}
});
});
}

/* CATEGORY */
function loadCategory(type){
let movies=[];

if(type==="popular") movies=["Titanic","Inception","Gladiator"];
if(type==="top") movies=["The Godfather","Forrest Gump"];
if(type==="action") movies=["John Wick","Mad Max"];
if(type==="comedy") movies=["Mr Bean","Home Alone"];
if(type==="trending") movies=["The Avengers","Avatar"];

const container=document.getElementById("trendingMovies");
container.innerHTML="";

movies.forEach(m=>{
fetch(`https://www.omdbapi.com/?t=${m}&apikey=${apiKey}`)
.then(r=>r.json())
.then(d=>{
container.innerHTML+=createCard(d);
});
});
}

/* MODAL */
function openMovie(id){
fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
.then(r=>r.json())
.then(d=>{

document.getElementById("modalDetails").innerHTML=`
<img src="${d.Poster}">
<h2>${d.Title}</h2>
<p><b>Year:</b> ${d.Year}</p>
<p><b>Genre:</b> ${d.Genre}</p>
<p><b>Director:</b> ${d.Director}</p>
<p><b>Actors:</b> ${d.Actors}</p>
<p>${d.Plot}</p>
`;

document.getElementById("movieModal").style.display="block";
});
}

/* CLOSE */
function closeModal(){
document.getElementById("movieModal").style.display="none";
}

/* FAVORITES */
function addToFavorites(id){
let fav=JSON.parse(localStorage.getItem("fav"))||[];
if(!fav.includes(id)){
fav.push(id);
localStorage.setItem("fav",JSON.stringify(fav));
loadFavorites();
}
}

function loadFavorites(){
let fav=JSON.parse(localStorage.getItem("fav"))||[];
const container=document.getElementById("favoriteMovies");
container.innerHTML="";
fav.forEach(id=>{
fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
.then(r=>r.json())
.then(d=>{
container.innerHTML+=createCard(d);
});
});
}

/* SCROLL */
function scrollLeft(){
document.getElementById("trendingMovies").scrollBy({left:-400,behavior:"smooth"});
}
function scrollRight(){
document.getElementById("trendingMovies").scrollBy({left:400,behavior:"smooth"});
}

/* START */
loadTrendingMovies();
loadFavorites();

/* ENTER */
document.getElementById("movieInput")
.addEventListener("keypress",e=>{
if(e.key==="Enter") searchMovie();
});
