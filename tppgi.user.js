// ==UserScript==
// @name         Public Groups Indicator
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  When public groups are available on the server, it shows an indicator.
// @author       Ko ● /u/Wilcooo
// @downloadURL  https://github.com/wilcooo/TagPro-PubGroupsIndicator/raw/master/tppgi.user.js
// @include      http://tagpro-*.koalabeast.com/*
// @grant        none
// ==/UserScript==




inGroup = !!document.getElementsByClassName("group-indicator").length;

xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4) {

        var parser = new DOMParser();
        responseXML = parser.parseFromString(xmlhttp.responseText, "text/html");

        groupsAvailable = !!responseXML.getElementsByClassName("group-item").length;

        if ( groupsAvailable && !inGroup ) { drawIndicator(); }

    }
};
xmlhttp.open("GET", "groups", true);
xmlhttp.send();

function drawIndicator() {
    indicator = document.createElement("span");
    indicator.className = "group-indicator bounce js-animate";
    indicator.innerHTML = "○";
    document.getElementById("nav-groups").children[0].appendChild(indicator);

    //console.log("I've drawn an indicator!");
}
