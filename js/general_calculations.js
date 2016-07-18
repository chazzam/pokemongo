
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

function needCatch(evolutionCost, numberEvolved, currentCandy, 
	transferCandy, evolutionCandy, notTransferred, notTransferredEvolved
) {
	var catchCandy = 3;
	var catches = 
		(-1*currentCandy + evolutionCost*numberEvolved -
			evolutionCandy*numberEvolved + evolutionCandy +
			notTransferred*transferCandy + notTransferredEvolved*transferCandy)
			/ (catchCandy + transferCandy);
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

function needCandy(evolutionCost, numberEvolved) {
	var currentPokemon = 0,
		catchCandy = 3,
		notTransferred = 0,
		transferCandy = 1,
		evolutionCandy = 1;
		var notTransferredEvolved = numberEvolved;
	var candy = 
		evolutionCost*numberEvolved + evolutionCandy*(-1*numberEvolved) + 
		evolutionCandy + transferCandy*(notTransferred + numberEvolved);
	return candy;
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
		pokemon = Math.floor(candy/4);
	}
	var evolutions = ["12", "25", "50", "100", "400"];
	var states = ["A", "1"];
	var i=0; var j=0;
	var x; var y;
	var cost; var M;
	var evXfer; var evKeep; var evCatch;
	for (i=0; i< evolutions.length; i++) {
		x = evolutions[i];
		for (j=0; j < states.length; j++) {
			cost = x;
			y = states[j];
			M = 1;
			if (y == "A") {
				cost++;
				M = 0;
			}
			evXfer="";
			evKeep = canEvolve(cost, candy, pokemon, 1,1,M);
			evCatch = toCatch(cost, evKeep + 1, candy, 1,1,M);
			document.getElementById('ev'+x+'-'+y+'C').innerHTML = evCatch;
			document.getElementById('ev'+x+'-'+y+'E').innerHTML = evKeep;
			document.getElementById('ev'+x+'-'+y+'T').innerHTML = evXfer;
		}
	}
}

function candyCatchTable(counts, tid) {
	var evolutions = [12, 25, 50, 100, 400];
	var body = document.body;
	var tbl = document.getElementById(tid);
	var e,n, tr,td, i,j, candy,keep;
	tbl.style.textAlign = "center";
	var header = tbl.createTHead();
	tr = header.insertRow();
	tr.style.fontWeight = "bold";
	td = tr.insertCell();
	td.appendChild(document.createTextNode(""));
	td.setAttribute('rowSpan', '2');
	td = tr.insertCell();
	td.appendChild(document.createTextNode("Pokemon To Evolve"));
	td.setAttribute('colSpan', '' + (counts.length * 2));
	td.style.textAlign = "center";
	var tr1 = header.insertRow();
	tr1.style.fontWeight = "bold";
	tr = header.insertRow();
	tr.style.fontWeight = "bold";
	td = tr.insertCell();
	td.appendChild(document.createTextNode("Cost"));
	for (i=0; i < counts.length; i++) {
		n = counts[i];
		td = tr1.insertCell();
		td.appendChild(document.createTextNode(n));
		td.setAttribute('colSpan', '2');
		td = tr.insertCell();
		td.appendChild(document.createTextNode("C"));
		td = tr.insertCell();
		td.appendChild(document.createTextNode("#"));
	}
	for (i=0; i < evolutions.length; i++) {
		tr = tbl.insertRow();
		e = evolutions[i];
		td = document.createElement("TH");
		td.innerHTML = e;
		tr.appendChild(td);
		for (j=0; j < counts.length; j++) {
			n = counts[j];
			keep = needCatch(e,n,0,1,1,0,n);
			candy = needCandy(e,n);
			td = tr.insertCell();
			td.appendChild(document.createTextNode(candy));
			td = tr.insertCell();
			td.appendChild(document.createTextNode(keep));
		}
	}
}
