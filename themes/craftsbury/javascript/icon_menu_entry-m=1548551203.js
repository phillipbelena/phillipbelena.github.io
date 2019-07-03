/*this is the code to run the icon menu for Craftsbury */
jQuery.noConflict();
function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}

//icon image cache
var iconNames = new Array();
var iconOverNames = new Array();
var icon = new Object();
var iconOver = new Object();

iconNames[1] = "images/sculling_icon.jpg";
iconNames[2] = "images/skiing_icon.jpg";
iconNames[3] = "images/running_icon.jpg";
iconNames[4] = "images/grp_icon.jpg";
iconNames[5] = "images/events_icon.jpg";
iconNames[6] = "images/lodging_icon.jpg";
iconNames[7] = "images/cycling_icon.jpg";
iconNames[8] = "images/hosmerpoint_icon.jpg";

iconOverNames[1] = "images/sculling_icon_over.jpg";
iconOverNames[2] = "images/skiing_icon_over.jpg";
iconOverNames[3] = "images/running_icon_over.jpg";
iconOverNames[4] = "images/grp_icon_over.jpg";
iconOverNames[5] = "images/events_icon_over.jpg";
iconOverNames[6] = "images/lodging_icon_over.jpg";
iconOverNames[7] = "images/cycling_icon_over.jpg";
iconOverNames[8] = "images/hosmerpoint_icon_over.jpg";

//preload images
for (var i=1; i<=8; i++) {
	icon[i] = new Image(70,70);
	iconOver[i] = new Image(70,70);
	icon[i].src = iconNames[i];
	iconOver[i].src = iconOverNames[i];
}

var prog_num = 0;
var imgName = "";

var prog_headings = new Array(
 "Craftsbury Outdoor Center",
 "Craftsbury Sculling Camps",
 "Craftsbury Nordic Center",
 "Craftsbury Running Camps",
 "GRP",
 "Events",
 "Lodging and Dining",
 "Cycling",
 "Hosmer Point Camp"
)

var prog_descriptions = new Array(
 "Craftsbury Outdoor Center",
 "Excellent coaching, ideal water, and a great atmosphere for learning has made Craftsbury a sought-after sculling destination for over 40 years.",
 "Some of the east's finest cross-country skiing, the Center's extensive trail system links 3 scenic villages, pristine lakes, high meadows, river valleys & forests.",
 "Rated Best of the Best by Runner's World, July 2005. Craftsbury Running Camp is a great vacation for runners of all ages and abilities.",
 "Year round training for elite skiers and rowers.",
 "All that's happening at the Center.",
 "Information about our lodging, great food, and other activities.",
 "Cycling at Craftsbury Outdoor Center.",
 "The Craftsbury Outdoor Center's sister organization, located at the other end of Great Hosmer Pond.  Hosmer Point offers camps and wilderness leadership programs for ages 5-16."
)

var prog_colors = new Array(
	"rgb(51,51,51)",
	"rgb(244,159,43)",
	"rgb(7,105,194)",
	"rgb(111,157,120)",
	"rgb(92,188,65)",
	"rgb(210,102,111)",
	"rgb(89,160,153)",
	"rgb(34,39,141)",
	"rgb(0,50,87)"
)

function changeColors() {
 if(document.getElementById != null)
  var heading = document.getElementById("styleme")
 else if(navigator.appName == "Microsoft Internet Explorer")
  var heading = document.all.item("styleme")
 if(color && heading != null) {
  heading.style.backgroundColor = "rgb(255,0,0)"
  heading.style.color = "rgb(0,0,255)"
 }else if(heading != null) {
  heading.style.backgroundColor = "rgb(255,255,255)"
  heading.style.color = "rgb(0,0,0)"
 }
 color = ! color
}
   
/*function scrollMessages(milliseconds) {
 window.setInterval("displayMessage()", milliseconds)
}*/

/* Mastering Javascript Premium Edition Books 24x7
 Chapter 15 */
 
function displayProgram(prog_num) {
 if(document.getElementById != null) {
  var heading = document.getElementById("prog_head")
  var description = document.getElementById("prog_desc")
  heading.firstChild.nodeValue = prog_headings[prog_num]
  description.firstChild.nodeValue = prog_descriptions[prog_num]
  heading.style.color = prog_colors[prog_num]
 }else{
  if(navigator.appName == "Microsoft Internet Explorer") {
   var heading = document.all.item("prog_head")
   var description = document.all.item("prog_desc")
   heading.innerText = prog_headings[prog_num]
   description.innerText = prog_descriptions[prog_num]
   heading.style.color = prog_colors[prog_num]
  }
 }
 if(document.images) {
	var imgName = "";
 	for (var i=1; i<=8; i++) {
		imgName = "progIcon-" + i;
		document.getElementById(imgName).src = icon[i].src;
	}
	imgName = "progIcon-" + prog_num;
	document.getElementById(imgName).src = iconOver[prog_num].src;
 }
}