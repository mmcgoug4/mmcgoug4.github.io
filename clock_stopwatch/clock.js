"use strict";
var $ = function(id) { return document.getElementById(id); };

//global stop watch timer variable and elapsed time object
var stopwatchTimer;
var elapsedMinutes = 0;
var elapsedSeconds = 0;
var elapsedMilliseconds = 0;

var displayCurrentTime = function() {
	var time = new Date();
	var hr = time.getHours();
	var min = time.getMinutes();
	var sec = time.getSeconds();
	var am_pm = "AM";
	
	if(hr > 12){
		hr -= 12;
		am_pm = "PM";
	}
	if(hr == 0)
		hr = 12;
		hr = padSingleDigit(hr);
		min = padSingleDigit(min);
		sec = padSingleDigit(sec);
		document.getElementById("hours").innerHTML = hr;
		document.getElementById("minutes").innerHTML = min;
		document.getElementById("seconds").innerHTML = sec;
		document.getElementById("ampm").innerHTML = am_pm;
		
};

var padSingleDigit = function(num) {
	if (num < 10) {	return "0" + num; }
	else { return num; }
};

var tickStopwatch = function() {    
    // increment milliseconds by 10 milliseconds
    
    // if milliseconds total 1000, increment seconds by one and reset milliseconds to zero
    
    // if seconds total 60, increment minutes by one and reset seconds to zero
    
    //display new stopwatch time
    elapsedMilliseconds += 10;
	if(elapsedMilliseconds === 1000){
		elapsedMilliseconds = 0;
		elapsedSeconds++;
	}
	if(elapsedSeconds === 60){
		elapsedMinutes++;
		elapsedSeconds = 0;
	}
	
	$("s_minutes").firstChild.nodeValue = elapsedMinutes;
	$("s_seconds").firstChild.nodeValue = padSingleDigit(elapsedSeconds);
	$("s_ms").firstChild.nodeValue = padSingleDigit(elapsedMilliseconds);
	
};

var interval = -1;

// event handler functions
var startStopwatch = function(evt) {
    // prevent default action of link
        
    // do first tick of stop watch and then set interval timer to tick 
    // stop watch every 10 milliseconds. Store timer object in stopwatchTimer 
    // variable so next two functions can stop timer.
	evt.preventDefault();
	interval = setInterval(tickStopwatch,10);
};

var stopStopwatch = function(evt) {
    // prevent default action of link
        
    // stop timer
    evt.preventDefault();
	clearInterval(interval);
};

var resetStopwatch = function(evt) {
    // prevent default action of link
        
    // stop timer
        
    // reset elapsed variables and clear stopwatch display
    evt.preventDefault();
	clearInterval(interval);
	elapsedMinutes = 0;
	elapsedSeconds = 0;
	elapsedMilliseconds = 0;
	$("s_minutes").firstChild.nodeValue = elapsedMinutes;
	$("s_seconds").firstChild.nodeValue = padSingleDigit(elapsedMilliseconds);
	$("s_ms").firstChild.nodeValue = padSingleDigit(elapsedMilliseconds);
};

window.onload = function() {
    // set initial clock display and then set interval timer to display
    // new time every second. Don't store timer object because it 
    // won't be needed - clock will just run.
    setInterval(function()
	{
		displayCurrentTime()
	}, 1000);
    
	$("start").addEventListener('click',startStopwatch);
	$("stop").addEventListener('click',stopStopwatch);
	$("reset").addEventListener('click',resetStopwatch);
    // set up stopwatch event handlers

};