"use strict";
// Elements have global scope for easy access
let typeSelect;
let participantsRange;
let priceRangeMin;
let priceRangeMax;
let accessRangeMin;
let accessRangeMax;

// Local storage variables
const storedActivity = localStorage.getItem("btg5907-activity");
const storedType = localStorage.getItem("btg5907-type");
const storedNumParticipants = localStorage.getItem("btg5907-numParticipants");
const storedPriceLower = localStorage.getItem("btg5907-priceLower");
const storedPriceHigher = localStorage.getItem("btg5907-priceHigher");
const storedAccessLower = localStorage.getItem("btg5907-accessLower");
const storedAccessHigher = localStorage.getItem("btg5907-accessHigher");

window.onload = (e) => 
{
	// Grab all elements from activity form
	document.querySelector("#submit-search").addEventListener("click", getActivity);
	typeSelect = document.querySelector("#type-selector");
	participantsRange = document.querySelector("#participants-range");
	priceRangeMin = document.querySelector("#price-range-min");
	priceRangeMax = document.querySelector("#price-range-max");
	accessRangeMin = document.querySelector("#access-range-min");
	accessRangeMax = document.querySelector("#access-range-max");

	// Set search values on screen equal to stored values if they exist
	if (storedActivity) document.querySelector("#outActivity").innerHTML = storedActivity;
	if (storedType) typeSelect.value = storedType;
	if (storedNumParticipants) participantsRange.value = storedNumParticipants;
	if (storedPriceLower) priceRangeMin.value = storedPriceLower;
	if (storedPriceHigher) priceRangeMax.value = storedPriceHigher;
	if (storedAccessLower) accessRangeMin.value = storedAccessLower;
	if (storedAccessHigher) accessRangeMax.value = storedAccessHigher;
}

function getActivity () 
{
	// Store search values in local storage
	storeValues();

	// Show loading
	document.querySelector("#outActivity").innerHTML = "Finding activities...";

	// Default URL, returns a random activity if not affected
	let queryURL = "https://cors-anywhere.herokuapp.com/https://boredapi.com/api/activity?";
	let queryParams = "";

	// Set type of activity
	if (typeSelect.value != "any")
	{
		queryParams += `type=${typeSelect.value}`;
	}

	// Set number of participants
	if (participantsRange.value != 0)
	{
		if (queryParams.length > 0)
		{
			queryParams += "&";
		}
		queryParams += `participants=${participantsRange.value}`;
	}

	// Set price range
	if ((priceRangeMin.value > 0 || priceRangeMax.value < 0.6) && priceRangeMin.value <= priceRangeMax.value)
	{
		if (queryParams.length > 0)
		{
			queryParams += "&";
		}
		queryParams += `minprice=${priceRangeMin.value}&maxprice=${priceRangeMax.value}`;
	}

	// Set accessibility range
	if ((accessRangeMin.value > 0 || priceRangeMax.value < 0.6) && accessRangeMin.value <= accessRangeMax.value)
	{
		if (queryParams.length > 0)
		{
			queryParams += "&";
		}
		queryParams += `minaccessibility=${accessRangeMin.value}&maxaccessibility=${accessRangeMax.value}`;
	}

	queryURL += queryParams;
	console.log(queryURL);
	$.ajax({
		dataType: "json",
		url: queryURL,
		data: null,
		success: displayActivity,
		error: displayFailure
	});
}

function displayActivity (obj) 
{
	// Store query response
	localStorage.setItem("btg5907-activity", `You should <span class="output">${obj.activity.toLowerCase()}</span>!`);

	// Log the object response
	console.log(JSON.stringify(obj));

	// Display an error or the activity
	if (obj.error)
	{
		document.querySelector("#outActivity").innerHTML = `ERROR: ${obj.error}</span>!`;
	}
	else
	{
		document.querySelector("#outActivity").innerHTML = `You should <span class="output">${obj.activity.toLowerCase()}</span>!`;
	}
}

function displayFailure () {
	document.querySelector("#outActivity").innerHTML = `Connection to Bored API could not be established.`;
}

// Only stores search values, activity is stored under response
function storeValues () {
	localStorage.setItem("btg5907-type", typeSelect.value);
	localStorage.setItem("btg5907-numParticipants", participantsRange.value);
	localStorage.setItem("btg5907-priceLower", priceRangeMin.value);
	localStorage.setItem("btg5907-priceHigher", priceRangeMax.value);
	localStorage.setItem("btg5907-accessLower", accessRangeMin.value);
	localStorage.setItem("btg5907-accessHigher", accessRangeMax.value);
}










