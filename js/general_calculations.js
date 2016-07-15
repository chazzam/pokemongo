
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

function toEvolve(evolutionCost, currentCandy,
	transferCandy, evolutionCandy, notTransferred
) {
	var evolve = (currentCandy + 
		Math.floor(currentCandy/evolutionCost) * evolutionCandy +
		Math.floor(currentCandy/evolutionCost - notTransferred) * transferCandy)
		/ evolutionCost;
	if (evolve < 0) {
		evolve = 0;
	}
	return Math.floor(evolve);
}
function canEvolve(evolutionCost, currentCandy, currentPokemon,
	transferCandy, evolutionCandy, notTransferredEvolved
) {
	var notTransferred = 0;
	var catchCandy = 3;
	var evolve = (currentCandy + 
		currentPokemon * catchCandy - evolutionCandy - 
		transferCandy * notTransferredEvolved - 
		transferCandy * notTransferred +
		currentPokemon * transferCandy)
		/ (evolutionCost - evolutionCandy);
	if (evolve < 0) {
		evolve = 0;
	}
	return Math.floor(evolve);
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

function getPokemon() {
	var theForm = document.forms["generalform"];
	var currentPokemon = theForm.elements["currentPokemon"];
	var howMany = -1;
	if (currentPokemon.value != "") {
		howMany = parseInt(currentPokemon.value);
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
	//~ var keep = (candy + (2 * (candy/evolve) - 1)) / evolve;
	var keep = toEvolve(evolve, candy, 0,candyEvolve,0);
	var keepNoXfer = (candy + candy/evolve - 1) / evolve;
	var scratch = toCatch(evolve, 1, 0, candyXfer,0,0);
	var scratchNoXfer = toCatch(evolve, 1, 0, 0,0,0);;
	if (keep < 0) {
		keep = 0;
	}
	if (keepNoXfer < 0) {
		keepNoXfer = 0;
	}
	var transfers = evolve - (candy + keep) % evolve;
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
	document.getElementById('scratch').innerHTML = scratch;
	document.getElementById('scratchNoXfer').innerHTML = scratchNoXfer;
	document.getElementById('catches').innerHTML = catches;
	document.getElementById('catchesP1').innerHTML = catchesP1;
	document.getElementById('ev12-AC').innerHTML = catchesP1;
	document.getElementById('catchesAP1').innerHTML = catchesAP1;
}

function getAllTotals() {
	var candyPerCatch = 3;
	var candy = getCandy();
	var pokemon= getPokemon();
	if (pokemon == -1) {
		pokemon = candy/candyPerCatch;
	}
	var evolutions = {12:"12", 25:"25", 50:"50", 100:"100", 400:"400"};
	var states = {A:"A", 1:"1"};
	var x;
	for (x in evolutions) {
		var i;
		for (i in states) {
			var cost = x;
			var M = 1;
			if (i == "A") {
				cost++;
				M = 0;
			}
			var evXfer="";
			var evKeep = canEvolve(cost, candy, pokemon, 1,1,M);
			var evCatch = toCatch(cost, evKeep + 1, candy, 1,1,M);
			document.getElementById('ev'+x+'-'+i+'C').innerHTML = evCatch;
			document.getElementById('ev'+x+'-'+i+'E').innerHTML = evKeep;
			document.getElementById('ev'+x+'-'+i+'T').innerHTML = evXfer;
		}
	}
}
			//~ <td id="ev12-AE"></td>
			//~ <td id="ev12-AT"></td>
			//~ <td id="ev12-AC"></td>
			//~ <td id="ev12-1E"></td>
			//~ <td id="ev12-1T"></td>
			//~ <td id="ev12-1C"></td>
			//~ <td id="ev12-0E"></td>
			//~ <td id="ev12-0T"></td>
			//~ <td id="ev12-0C"></td>
