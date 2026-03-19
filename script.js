const apiKey = "176d2a6b";

function searchMovie(){
const movie = document.getElementById("movieInput").value;
fetch(`https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`)
.then(res=>res.json())
.then(data=>{
if(data.Response==="True"){
document.getElementById("movieResult").innerHTML=createCard(data);
}
});
}

function createCard(data){
return `
<div class="movie-card" onclick="openMovie('${data.Title}')">
<img src="${data.Poster}">
<div class="rating">⭐ ${data.imdbRating}</div>
<div class="movie-overlay">
<h4>${data.Title}</h4>
<button class="fav-btn" onclick="event.stopPropagation(); addToFavorites('${data.Title}')">❤️</button>
</div>
</div>`;
}

function loadTrendingMovies(){
["avatar","avengers","joker","interstellar"].forEach(m=>{
fetch(`https://www.omdbapi.com/?t=${m}&apikey=${apiKey}`)
.then(r=>r.json())
.then(d=>{
document.getElementById("trendingMovies").innerHTML+=`
<div class="trending-card" onclick="openMovie('${d.Title}')">
<img src="${d.Poster}">
</div>`;
});
});
}

function openMovie(title){
fetch(`https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`)
.then(r=>r.json())
.then(d=>{
document.getElementById("modalDetails").innerHTML=`
<img src="${d.Poster}">
<h2>${d.Title}</h2>
<p>${d.Plot}</p>`;
document.getElementById("movieModal").style.display="block";
});
}

function closeModal(){
document.getElementById("movieModal").style.display="none";
}

function scrollLeft(){
document.getElementById("trendingMovies").scrollBy({left:-400,behavior:"smooth"});
}

function scrollRight(){
document.getElementById("trendingMovies").scrollBy({left:400,behavior:"smooth"});
}

function addToFavorites(title){
alert("Added: "+title);
}

loadTrendingMovies();
