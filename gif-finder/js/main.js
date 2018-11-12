"using strict";
// 1
window.onload = (e) => {
	document.querySelector("#search").addEventListener("click", getData);
};

// 2
let displayTerm = "";

// 3
function getData () {
	// 1
	const GIPHY_URL = "https://api.giphy.com/v1/gifs/search?";

	// 2
	const GIPHY_KEY = "timIQhXEIAH1TT6COHpQjItDkquzAxCX";

	// 3
	let url = `${GIPHY_URL}api_key=${GIPHY_KEY}`;

	// 4
	let term = document.querySelector("#searchterm").value;
	displayTerm = term;

	// 5
	term = term.trim();

	// 6
	term  = encodeURIComponent(term);

	// 7
	if (term.length < 1) return;

	// 8
	url += `&q=${term}`;

	// 9
	let limit = document.querySelector("#limit").value;
	url += `&limit=${limit}`;

	// 10
	document.querySelector("#content").innerHTML = `<strong>Searching for ${displayTerm}</strong>`;

	// 11
	console.log(url);

	// 12
	$.ajax({
		dataType: "json",
		url: url,
		data: null,
		success: jsonLoaded // 13
	});

	$("#content").fadeOut(100);
}

// 13
function jsonLoaded (obj) {
	// 14
	console.log(`obj = ${obj}`);
	console.log(`Stringified obj = ${JSON.stringify(obj)}`);

	// 15
	if (!obj.data || obj.data.length == 0){
		document.querySelector("#content").innerHTML = `<p><i>No results found for '${displayTerm}'</i></p>`;
		$("#content").fadeIn(500);
		return; // Bail out
	}

	// 16
	let results = obj.data;
	console.log(`results.length = ${results.length}`);
	let bigString = `<p><i>Here are ${results.length} results for '${displayTerm}'</i></p>`;

	// 17
	for (let result of results){
		// 18
		let smallURL = result.images.fixed_width_small.url;
		if (!smallURL) smallURL = "images/no-image-found.png";

		// 19
		let url = result.url;

		// 20
		let line = `<div class='result'><p>Rating: ${result.rating.toUpperCase()}</p><img src='${smallURL}' title='${result.id}'><span><a target='_blank' href='${url}'>View on Giphy</a></span></div>`;

		// 22
		bigString += line;
	}

	// 23
	document.querySelector("#content").innerHTML = bigString;

	// 24
	$("#content").fadeIn(500);
}