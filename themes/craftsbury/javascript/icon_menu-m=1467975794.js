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
   

/* Mastering Javascript Premium Edition Books 24x7
 Chapter 15 */
 
function displayProgram(prog_num) {
 if(document.images) {
 	for (var i=1; i<=8; i++) {
		imgName = "progIcon-" + i;
		document.getElementById(imgName).src = icon[i].src;
	}
	imgName = "progIcon-" + prog_num;
	document.getElementById(imgName).src = iconOver[prog_num].src;
 }
}