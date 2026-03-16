const apiKey = "176d2a6b";

function searchMovie(){

const movie = document.getElementById("movieInput").value;

fetch(`https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`)

.then(response => response.json())

.then(data => {

const result = document.getElementById("movieResult");

if(data.Response == "True"){

result.innerHTML = `
<div class="movie-card">

<img src="${data.Poster}">

<h2>${data.Title}</h2>

<p>Year: ${data.Year}</p>

<p>IMDb Rating: ${data.imdbRating}</p>

<p>${data.Plot}</p>

</div>
`;

}else{

result.innerHTML = "Movie not found";

}

});

}
