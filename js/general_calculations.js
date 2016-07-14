

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
	var candyPer = 3;
	var candy = getCandy();
	var evolve = getEvolved();
	var keep = (candy + (2 * (candy/evolve) - 1)) / evolve;
	var keepNoXfer = (candy + candy/evolve - 1) / evolve;
	var scratch = (evolve + 1)/(candyPer + 1);
	var scratchNoXfer = evolve/candyPer;
	var catches = (evolve - candy + 1) / (candyPer + 1);
	if (catches < 0 || candy === evolve || candy == 0) {
		catches = 0;
	}
	if (keep < 0) {
		keep = 0;
	}
	document.getElementById('keep').innerHTML = Math.floor(keep);
	document.getElementById('keepNoXfer').innerHTML = Math.floor(keepNoXfer);
	document.getElementById('scratch').innerHTML = Math.ceil(scratch);
	document.getElementById('scratchNoXfer').innerHTML = Math.ceil(scratchNoXfer);
	document.getElementById('catches').innerHTML = Math.ceil(catches);
}
