// main.js
// EN: This script will contain any and all functionality that is referenced across all pages
// ES: Este script contendrá toda la funcionalidad que se referencia a lo largo de todas las páginas
'use strict';

var documentLangCtrl = document.lang;

async function yieldComponentIntoElement(componentPath, elementId) {
    try {
        document.getElementById(elementId).innerHTML = await fetch(componentPath)
            .then(response => response.text());
    } catch(e) {}
}

document.addEventListener('DOMContentLoaded', initialize);

async function initialize() {
    await yieldComponentIntoElement('components/head.html', 'head');
    await yieldComponentIntoElement('components/header.html', 'header');
    initializeBisonPastureWidget();
}

// utility functions
function getKeyIfExists(json, key) {
    let returnValue = undefined;
    try {
        returnValue = json[key];
    } catch(e) {}
    return returnValue;
}