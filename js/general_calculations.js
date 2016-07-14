

function getCandy12() {
	var theForm = document.forms["generalform"];
	var currentCandy = theForm.elements["currentCandy12"];
	var howMany = 0;
	if (currentCandy.value != "") {
		howMany = parseInt(currentCandy.value);
	}
	return howMany;
}

function getTotal() {
	var candy = (3 + 1);
	var scratch12 = (12 + 1)/candy;
	var current12 = ( (12 - getCandy12()) + 1) / candy;
	if (current12 < 0) {
		current12 = 0;
	}
	document.getElementById('scratch12').innerHTML = scratch12;
	document.getElementById('current12').innerHTML = current12;
}
