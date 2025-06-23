// main.js
// EN: This script will contain any and all functionality that is referenced across all pages
// ES: Este script contendrá toda la funcionalidad que se referencia a lo largo de todas las páginas
'use strict';
var documentLangCtrl = document.lang;
var techs = null;

async function yieldComponentIntoElement(componentPath, elementId) {
    try {
        let response = await fetch(componentPath)
        if(response.ok)
            document.getElementById(elementId).innerHTML = await response.text();
    } catch(e) {}
}

async function showHourglassLoader() {
    await yieldComponentIntoElement('components/hourglass-loader.html', 'hourglass-loader');
}
function hideHourglassLoader() {
    setTimeout(() => {
        document.getElementById('hourglass-loader').classList.add('fade');
    }, 900);
    setTimeout(() => {
        document.getElementById('hourglass-loader').remove();
    }, 1000);
}

document.addEventListener('DOMContentLoaded', initialize);
// window.addEventListener('load', hideHourglassLoader);

async function initialize() {
    // await showHourglassLoader();
    await yieldComponentIntoElement('components/head.html', 'head');
    await yieldComponentIntoElement('components/header.html', 'header');
    await yieldComponentIntoElement('components/footer.html', 'footer');
    initializeThemeScripts();
    initializeBisonPastureWidget();
    initializeRouter();
}

// utility functions
function getKeyIfExists(json, key) {
    let returnValue = undefined;
    try {
        returnValue = json[key];
    } catch(e) {}
    return returnValue;
}