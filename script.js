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
.then(response => response.json())
.then(data => {

loading.style.display = "none";

if(data.Response === "True"){

result.innerHTML = `

<div class="movie-card">

<img src="${data.Poster}" alt="${data.Title}">

<h2>${data.Title}</h2>

<div class="rating">⭐ IMDb ${data.imdbRating}</div>

<p><b>Year:</b> ${data.Year}</p>
<p><b>Genre:</b> ${data.Genre}</p>
<p><b>Director:</b> ${data.Director}</p>
<p><b>Actors:</b> ${data.Actors}</p>

<p>${data.Plot}</p>

<a href="https://www.youtube.com/results?search_query=${data.Title}+trailer"
target="_blank"
class="trailer-btn">▶ Watch Trailer</a>

</div>
`;

}else{

error.innerHTML = "❌ Movie not found";

}

})
.catch(err => {

loading.style.display = "none";
error.innerHTML = "⚠️ Error fetching movie data";

});

}


/* ENTER KEY SEARCH */

document.getElementById("movieInput").addEventListener("keypress", function(event){

if(event.key === "Enter"){
searchMovie();
}

});


/* TRENDING MOVIES */

function loadTrendingMovies(){

const movies = [
"avatar",
"avengers",
"doctor strange",
"spiderman",
"interstellar",
"joker"
];

const container = document.getElementById("trendingMovies");

container.innerHTML = "";

movies.forEach(movie => {

fetch(`https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`)
.then(res => res.json())
.then(data => {

if(data.Response === "True" && data.Poster !== "N/A"){

container.innerHTML += `

<div class="trending-card" onclick="openMovie('${data.Title}')">

<img src="${data.Poster}" alt="${data.Title}">

<p>${data.Title}</p>

</div>

`;

}

});

});

}


/* LOAD TRENDING MOVIES */

loadTrendingMovies();


/* OPEN MOVIE MODAL */

function openMovie(title){

fetch(`https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`)
.then(res => res.json())
.then(data => {

const modal = document.getElementById("movieModal");
const details = document.getElementById("modalDetails");

details.innerHTML = `

<img src="${data.Poster}" alt="${data.Title}">

<h2>${data.Title}</h2>

<div class="rating">⭐ IMDb ${data.imdbRating}</div>

<p><b>Year:</b> ${data.Year}</p>
<p><b>Genre:</b> ${data.Genre}</p>
<p><b>Director:</b> ${data.Director}</p>
<p><b>Actors:</b> ${data.Actors}</p>

<p>${data.Plot}</p>

<a href="https://www.youtube.com/results?search_query=${data.Title}+trailer"
target="_blank"
class="trailer-btn">▶ Watch Trailer</a>

`;

modal.style.display = "block";

});

}


/* CLOSE MODAL */

const closeBtn = document.querySelector(".close");

if(closeBtn){

closeBtn.onclick = function(){
document.getElementById("movieModal").style.display = "none";
};

}


/* CLOSE MODAL WHEN CLICK OUTSIDE */

window.onclick = function(event){

const modal = document.getElementById("movieModal");

if(event.target === modal){
modal.style.display = "none";
}

};


/* NETFLIX STYLE SLIDER */

function scrollLeft(){

document.getElementById("trendingMovies")
.scrollBy({
left:-400,
behavior:"smooth"
});

}

function scrollRight(){

document.getElementById("trendingMovies")
.scrollBy({
left:400,
behavior:"smooth"
});

}
