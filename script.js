const apiKey = "176d2a6b";

function searchMovie(){

const movie = document.getElementById("movieInput").value;
const result = document.getElementById("movieResult");

// Step 2 - Loading message
result.innerHTML = "Loading...";

fetch(`https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`)

.then(response => response.json())

.then(data => {

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

})

// Step 2 - Error handling
.catch(error => {
result.innerHTML = "Error fetching movie data";
console.log(error);
});

}
