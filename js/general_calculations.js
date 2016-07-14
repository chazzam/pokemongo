
function toCatch(evolutionCost, numberEvolved, currentCandy, 
	transferCandy, evolutionCandy, notTransferred
) {
	var catchCandy = 3;
	var catches = 
		(-1*currentCandy + evolutionCost*numberEvolved - 
			evolutionCandy*numberEvolved + evolutionCandy + 
			transferCandy*notTransferred + numberEvolved*transferCandy
		) / ( catchCandy + transferCandy );
	if (catches < 0) {
		catches=0;
	}
	return Math.ceil(catches);
}

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
	var candyXfer = 1;
	var candyEvolve = 1;
	var candy = getCandy();
	var evolve = getEvolved();
	var keep = (candy + (2 * (candy/evolve) - 1)) / evolve;
	var keepNoXfer = (candy + candy/evolve - 1) / evolve;
	var transfers = evolve - candy % evolve;
	var scratch = toCatch(evolve, 1, 0, candyXfer,0,0);
	var scratchNoXfer = toCatch(evolve, 1, 0, 0,0,0);;
	if (keep < 0) {
		keep = 0;
	}
	if (keepNoXfer < 0) {
		keepNoXfer = 0;
	}
	var keepP1 = keep + 1;
	//var catches = (evolve - candy + 1) / (candyPer + 1);
	var catches = toCatch(evolve, 1, candy, candyXfer,candyEvolve,0);;
	if (catches < 0 || candy === evolve || candy == 0) {
		catches = 0;
	}
	//var catchesP1 = (-1*candy + evolve * keepP1 - keepP1 + 2) / (candyPer + 1);
	var catchesAP1 = toCatch(evolve, keepP1, candy, candyXfer,candyEvolve,1);
	var catchesP1  = toCatch(evolve, keepP1, candy, candyXfer,candyEvolve,0);

	document.getElementById('keep').innerHTML = Math.floor(keep);
	document.getElementById('keepNoXfer').innerHTML = Math.floor(keepNoXfer);
	document.getElementById('transfers').innerHTML = Math.ceil(transfers);
	document.getElementById('scratch').innerHTML = Math.ceil(scratch);
	document.getElementById('scratchNoXfer').innerHTML = Math.ceil(scratchNoXfer);
	document.getElementById('catches').innerHTML = Math.ceil(catches);
	document.getElementById('catchesP1').innerHTML = Math.floor(catchesP1);
	document.getElementById('catchesAP1').innerHTML = Math.floor(catchesAP1);
}
