'use strict';

var themeControlVar;

function initializeThemeScripts() {
    themeControlVar = getCookie('theme') !== 'undefined' ? getCookie('theme') : 'light';
    setTheme();
    initializeThemePicker();
}

function initializeThemePicker() {
    let themeDropdownItems = Array.from(document.getElementsByClassName("theme-dropdown-item"));
    themeDropdownItems.forEach((item) => {
        item.addEventListener('click', toggleTheme);
        if(getCookie('theme') !== undefined && item.getAttribute('data-theme-toggle') === getCookie('theme')) {
            document.getElementById('theme-dropdown-toggle').innerHTML = item.innerHTML;
        }
    });
}
function toggleTheme(event) {
    event.preventDefault();
    themeControlVar = event.target.getAttribute('data-theme-toggle');
    setTheme();
    document.getElementById('theme-dropdown-toggle').innerHTML = event.target.innerHTML;
}
function setTheme() {
    setCookie('theme', themeControlVar);
    document.getElementById('theme-css').setAttribute('href', './css/theme-'+themeControlVar+'.css');
    document.body.setAttribute('data-bs-theme', themeControlVar);
}
