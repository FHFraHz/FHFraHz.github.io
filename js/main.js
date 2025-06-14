// main.js
// EN: This script will contain any and all functionality that is referenced across all pages
// ES: Este script contendrá toda la funcionalidad que se referencia a lo largo de todas las páginas
'use strict';
document.addEventListener('DOMContentLoaded', initialize);

async function initialize() {
    await setElementToComponent('header', 'components/header.html');
    initializeBullPastureWidget();
}

async function setElementToComponent(elementId, componentPath) {
    try {
        document.getElementById(elementId).innerHTML = await fetch(componentPath)
            .then(response => response.text());
    } catch(e) {}
}


function changeScene() {
    
}