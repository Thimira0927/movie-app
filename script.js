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

<img src="${data.Poster}" alt="Movie Poster">

<h2>${data.Title}</h2>

<div class="rating">⭐ IMDb ${data.imdbRating}</div>

<p><b>Year:</b> ${data.Year}</p>
<p><b>Genre:</b> ${data.Genre}</p>
<p><b>Director:</b> ${data.Director}</p>
<p><b>Actors:</b> ${data.Actors}</p>

<p>${data.Plot}</p>

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
"batman",
"spiderman",
"interstellar",
"joker"
];

const container = document.getElementById("trendingMovies");

movies.forEach(movie => {

fetch(`https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`)
.then(res => res.json())
.then(data => {

if(data.Response === "True"){

container.innerHTML += `
<img src="${data.Poster}" title="${data.Title}">
`;

}

});

});

}

/* LOAD TRENDING MOVIES WHEN PAGE LOAD */

loadTrendingMovies();
