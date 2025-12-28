'use strict';
if(typeof(currentPage) === 'undefined')
    var currentPage = 'web';

loadPage();

async function loadPage() {
    await yieldComponentIntoElement('components/web/css-gallery.html', 'css-gallery');
    initializeThemeScripts();
}

