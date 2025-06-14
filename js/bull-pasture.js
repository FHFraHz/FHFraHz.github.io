'use strict';

// const's and variables
const scenes = ['sunnyday', 'clearnight', 'rainyday', 'cloudynight'];
let bullPasture = null;

// functions
function setBullPastureClass(newClass, classFlushList = null) {
    // if classFlushList is set and is an array, it is expected to be a list of classes that contains the class to be added so it can be properly initialized
    if(Array.isArray(classFlushList)) {
        classFlushList.forEach((className) => {
            try { bullPasture.classList.remove(className); } catch(e) {}
        });
    }
    // adds the specified class to bull pasture widget
    try { bullPasture.classList.add(newClass); } catch(e) {}
}

// initialization
function initializeBullPastureWidget() {

    // get bull pasture widget when document is ready
    bullPasture = document.getElementById('bull-pasture');

    // get and configure bull pasture scene dropdown items
    let sceneDropdownItems = Array.from(document.getElementsByClassName('scene-dropdown-item'));
    console.log(sceneDropdownItems);
    sceneDropdownItems.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            setBullPastureClass(event.target.getAttribute('data-scene-toggle'), scenes);
        });
    });

    // get and configure bull pasture scene orientation dropdown items
    let sceneOrientationDropdownItems = Array.from(document.getElementsByClassName('sceneorientation-dropdown-item'));
    sceneOrientationDropdownItems.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); // prevents the a or button element from navigating to a page or submitting a form
            setBullPastureClass(event.target.getAttribute('data-sceneorientation-toggle'), ['left', 'right']);
        });
    });

}