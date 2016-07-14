

function getCandy() {
	var theForm = document.forms["generalform"];
	var currentCandy = theForm.elements["currentCandy"];
	var howMany = 0;
	if (currentCandy.value != "") {
		howMany = parseInt(currentCandy.value);
	}
	return howMany;
}
function getEvolved() {
	var theForm = document.forms["generalform"];
	var evolve = theForm.elements["evolveCost"];
	var howMany = 0;
	if (evolve.value != "") {
		howMany = parseInt(evolve.value);
	}
	return howMany;
}

function getTotal() {
	var candyPer = (3 + 1);
	var candy = getCandy();
	var evolve = getEvolved();
	var keep = candy + (2 * (candy/evolve - 1)) / evolve;
	var scratch = (evolve + 1)/candyPer;
	var current = ( (evolve - candy) + 1) / candyPer;
	if (current < 0) {
		current = 0;
	}
	if (keep < 0) {
		keep = 0;
	}
	document.getElementById('keep').innerHTML = Math.floor(keep);
	document.getElementById('scratch').innerHTML = Math.ceil(scratch);
	document.getElementById('current').innerHTML = Math.ceil(current);
}
