'use strict';
if(typeof(currentPage) === 'undefined')
    var currentPage = 'web';

loadPage();

async function loadPage() {
    await yieldComponentIntoElement('components/web/css-gallery.html', 'css-gallery');
    await initializeArtGallery();
    initializeThemeScripts();
}

async function yieldArtIntoGalleryFrame(cssGalleryComponentFileName, elementId) {
    await yieldComponentIntoElement('components/web/css-gallery/'+cssGalleryComponentFileName, elementId);
}

async function initializeArtGallery() {
    await yieldArtIntoGalleryFrame('sunny-beach.html', 'picture_frame-sunny_beach');
    await yieldArtIntoGalleryFrame('rainy-forest.html', 'picture_frame-rainy_forest');
    await yieldArtIntoGalleryFrame('drag-race.html', 'picture_frame-drag_race');
    await yieldArtIntoGalleryFrame('house.html', 'picture_frame-house');
}