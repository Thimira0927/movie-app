const apiKey = "176d2a6b";

/* SEARCH */

function searchMovie(){
const movie = document.getElementById("movieInput").value.trim();
const result = document.getElementById("movieResult");
const error = document.getElementById("error");

error.innerHTML = "";
result.innerHTML = "";

if(movie===""){
error.innerHTML="Enter movie name";
return;
}

fetch(`https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`)
.then(res=>res.json())
.then(d=>{
if(d.Response==="True"){
result.innerHTML=createCard(d);
}else{
error.innerHTML="Movie not found";
}
});
}

/* CARD */

function createCard(d){
return `
<div class="movie-card" onclick="openMovie('${d.Title}')">
<img src="${d.Poster}">
<div class="rating">${d.imdbRating}</div>
<div class="movie-overlay">
<h4>${d.Title}</h4>
<button class="fav-btn" onclick="event.stopPropagation(); addToFavorites('${d.Title}')">❤️</button>
</div>
</div>`;
}

/* TRENDING */

function loadTrendingMovies(){
["avatar","avengers","joker","interstellar"].forEach(m=>{
fetch(`https://www.omdbapi.com/?t=${m}&apikey=${apiKey}`)
.then(r=>r.json())
.then(d=>{
document.getElementById("trendingMovies").innerHTML+=createCard(d);
});
});
}

/* MODAL */

function openMovie(title){
fetch(`https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`)
.then(r=>r.json())
.then(d=>{

const actors = d.Actors!=="N/A"?d.Actors:"Not available";
const director = d.Director!=="N/A"?d.Director:"Not available";

document.getElementById("modalDetails").innerHTML=`
<img src="${d.Poster}">
<h2>${d.Title}</h2>
<p><b>Actors:</b> ${actors}</p>
<p><b>Director:</b> ${director}</p>
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

function addToFavorites(title){
let fav=JSON.parse(localStorage.getItem("fav"))||[];
if(!fav.includes(title)){
fav.push(title);
localStorage.setItem("fav",JSON.stringify(fav));
loadFavorites();
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
container.innerHTML+=createCard(d);
});
});
}

/* START */

loadTrendingMovies();
loadFavorites();
