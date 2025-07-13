'use strict';
if(typeof(langJson) === 'undefined') // avoids defining already defined (global) variable
    var langJson = undefined;

async function setLangJson(jsonLangFile = 'main.json') {
    try {
        let response = await fetch('json/lang/'+jsonLangFile);
        if(response.ok)
            langJson = await response.json();
    } catch(e) { console.log(e); }
}
async function changeLanguage() {

}
async function updateLanguageText() {
    if(langJson !== undefined) {
        let langClassElements = Array.from(document.getElementsByClassName('.langClass'));
        langClassElements.forEach((elmt) => {
            elmt.innerHTML = langJson[elmt.getAttribute('data-langkey')];
        });
    }
}
function getLanguage() {
    
}