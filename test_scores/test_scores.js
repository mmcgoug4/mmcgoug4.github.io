var names = ["Ben", "Joel", "Judy", "Anne"];
var scores = [88, 98, 77, 88];

var $ = function (id) { return document.getElementById(id); };

function addScore(){
	var name = $("name").value;
	var score = $("score").value;
	names.push(name);
	scores.push(score);
}

function displayResults(){
	var average = 0.0;
	highest = 0;
	for(var i=0;i<scores.length;i++){
		average += parseFloat(scores[i]);
		if(scores[highest]<scores[i])
			highest = i;
	}
	average = average / scores.length;
	$("results").innerHTML = "Average score = " + average + "<br/>";
	$("results").innerHTML += "High score = " + names[highest] + " with a score of " + scores[highest];
}

function displayScores(){
	var str = "<table>";
	str += "<tr align='left'><th>Name</th><th>Score</th></tr>";
	for (var i = 0; i < scores.length; i++){
		str += "<tr><td>" + names[i] + "</td><td>" + scores[i] + "</td></tr>";
	}
	str += "</table>";
	$("scores_table").innerHTML = str;
}

window.onload = function () {
	$("add").onclick = addScore;
	$("display_results").onclick = displayResults;
	$("display_scores").onclick = displayScores;
};


