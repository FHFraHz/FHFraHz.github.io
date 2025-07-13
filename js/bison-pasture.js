'use strict';

// const's and variables
const BISONPASTURESCENES = ['sunnyday', 'clearnight', 'rainyday', 'cloudynight'];
let bisonPasture = null;

// functions
function setBisonPastureClass(newClass, classFlushList = null, cookieName = '') {
    // if classFlushList is set and is an array, it is expected to be a list of classes that contains the class to be added so it can be properly initialized
    if(Array.isArray(classFlushList)) {
        classFlushList.forEach((className) => {
            try { bisonPasture.classList.remove(className); } catch(e) { console.log(e); }
        });
    }
    // Makes sure that the right theme is selected in the dropdown
    Array.from(document.getElementsByClassName('scene-dropdown-item')).forEach((dropdownItem) => {
        if(dropdownItem.getAttribute('data-scene-toggle') == newClass)
            document.getElementById('scene-dropdown-button').innerHTML = dropdownItem.innerHTML;
    });
    // adds the specified class to bison pasture widget
    try { bisonPasture.classList.add(newClass); } catch(e) { console.log(e); }
    if(cookieName !== '') {
        try { setCookie(cookieName, newClass); } catch(e) { console.log(e); }
    }
}

function changeDayNight(theme = 'light') {
    let i = 0;
    if(theme === 'light') {
        for(i = 0; i < BISONPASTURESCENES.length-1; i=i+2) {
            if(!bisonPasture.classList.contains(BISONPASTURESCENES[i]) && bisonPasture.classList.contains(BISONPASTURESCENES[i+1])) {
                setBisonPastureClass(BISONPASTURESCENES[i], BISONPASTURESCENES, 'bisonPastureScene');
                break;
            }
        }
    } else {
        for(i = 1; i < BISONPASTURESCENES.length; i=i+2) {
            // alert(BISONPASTURESCENES[i]);
            if(!bisonPasture.classList.contains(BISONPASTURESCENES[i]) && bisonPasture.classList.contains(BISONPASTURESCENES[i-1])) {
                setBisonPastureClass(BISONPASTURESCENES[i], BISONPASTURESCENES, 'bisonPastureScene');
                break;
            }
        }
    }
}

// initialization
function initializeBisonPastureWidget() {

    // get bison pasture widget when document is ready
    bisonPasture = document.getElementById('bison-pasture');

    let sceneCookie = getCookie('bisonPastureScene');
    if(sceneCookie !== undefined && sceneCookie !== 'undefined')
        setBisonPastureClass(sceneCookie, BISONPASTURESCENES);
    else
        setBisonPastureClass('sunnyday', BISONPASTURESCENES, 'bisonPastureScene');

    let sceneOrientationCookie = getCookie('bisonPastureSceneOrientation');
    if(sceneOrientationCookie !== undefined && sceneOrientationCookie !== 'undefined')
        setBisonPastureClass(sceneOrientationCookie, ['left', 'right']);
    else
        setBisonPastureClass('left', ['left', 'right'], 'bisonPastureSceneOrientation');

    // get and configure bison pasture scene dropdown items
    let sceneDropdownItems = Array.from(document.getElementsByClassName('scene-dropdown-item'));
    sceneDropdownItems.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            document.getElementById('scene-dropdown-button').innerHTML = event.target.innerHTML;
            setBisonPastureClass(event.target.getAttribute('data-scene-toggle'), BISONPASTURESCENES, 'bisonPastureScene');
        });
    });

    // get and configure bison pasture scene orientation dropdown items
    let sceneOrientationDropdownItems = Array.from(document.getElementsByClassName('sceneorientation-dropdown-item'));
    sceneOrientationDropdownItems.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); // prevents the a or button element from navigating to a page or submitting a form
            document.getElementById('sceneorientation-dropdown-button').innerHTML = event.target.innerHTML;
            setBisonPastureClass(event.target.getAttribute('data-sceneorientation-toggle'), ['left', 'right'], 'bisonPastureSceneOrientation');
        });
    });

}