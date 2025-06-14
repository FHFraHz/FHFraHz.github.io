'use strict';

// const's and variables
const scenes = ['sunnyday', 'clearnight', 'rainyday', 'cloudynight'];
let bisonPasture = null;

// functions
function setbisonPastureClass(newClass, classFlushList = null) {
    // if classFlushList is set and is an array, it is expected to be a list of classes that contains the class to be added so it can be properly initialized
    if(Array.isArray(classFlushList)) {
        classFlushList.forEach((className) => {
            try { bisonPasture.classList.remove(className); } catch(e) {}
        });
    }
    // adds the specified class to bison pasture widget
    try { bisonPasture.classList.add(newClass); } catch(e) {}
}

// initialization
function initializeBisonPastureWidget() {

    // get bison pasture widget when document is ready
    bisonPasture = document.getElementById('bison-pasture');

    // get and configure bison pasture scene dropdown items
    let sceneDropdownItems = Array.from(document.getElementsByClassName('scene-dropdown-item'));
    sceneDropdownItems.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            document.getElementById('scene-dropdown-button').innerHTML = event.target.innerHTML;
            setbisonPastureClass(event.target.getAttribute('data-scene-toggle'), scenes);
        });
    });

    // get and configure bison pasture scene orientation dropdown items
    let sceneOrientationDropdownItems = Array.from(document.getElementsByClassName('sceneorientation-dropdown-item'));
    sceneOrientationDropdownItems.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); // prevents the a or button element from navigating to a page or submitting a form
            document.getElementById('sceneorientation-dropdown-button').innerHTML = event.target.innerHTML;
            setbisonPastureClass(event.target.getAttribute('data-sceneorientation-toggle'), ['left', 'right']);
        });
    });

}