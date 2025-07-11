'use strict';

const routes = {
    '/': {
        'file': 'pages/home.html',
        'scripts': [{
            'src': 'js/home.js',
            'type': 'text/javascript'
        }],
        'styles': [
            'css/pages/home.css'
        ]
    },
    '/dev': {
        'file': 'pages/dev.html',
        'scripts': [{
            'src': 'js/dev.js',
            'type': 'text/javascript'
        }],
        'styles': [
            'css/pages/dev.css'
        ]
    },
    '/about': {
        'file': 'pages/about.html',
        // 'scripts': [{
        //     'src': 'js/about.js',
        //     'type': 'text/javascript'
        // }],
        'styles': [
            'css/pages/about.css'
        ]
    }
};

async function initializeRouter() {
    window.addEventListener('popstate', router);
    addLinkEventListeners();
    await router();
}

function addLinkEventListeners() {
    try {
        document.body.addEventListener('click', (event) => {
            let target = event.target.closest('a.router-link');
            if(target) {
                event.preventDefault();
                navigateTo(target.href);
            }
        });
    } catch(e) {
        console.log(e);
    }
}

function navigateTo(url) {
    history.pushState(null, null, url);
    router();
}

async function router() {
    let route = routes[window.location.pathname] || 'pages/404.html';
    try {
        await renderPage(route);
        // addLinkEventListeners();
    } catch(e) { throwHTTPStatus(500, 'Internal Server Error'); }
}

async function renderPage(route) {
    let response = await fetch(route.file);
    if(response.ok) {
        let text = await response.text();
        document.getElementById('app').innerHTML = text;
        if(route.styles)
            insertStyles(route.styles);
        if(route.scripts)
            insertScripts(route.scripts);
    }
    else
        renderHTTPStatus(response.status, response.statusText);
}
function insertScripts(scripts) {
    scripts.forEach((script) => {
        let scriptElement = document.createElement('script');
        scriptElement.src = script.src;
        scriptElement.type = script.type ?? 'text/javascript';
        document.getElementById('app').appendChild(scriptElement);
    });
}
function insertStyles(styles) {
    document.getElementById('page-styles').innerHTML = '';
    styles.forEach((style) => {
        try {
            let linkCss = document.createElement('link');
            linkCss.setAttribute('rel', 'stylesheet');
            linkCss.setAttribute('type', 'text/css');
            linkCss.setAttribute('href', style);
            document.getElementById('page-styles').appendChild(linkCss);
        } catch(e) { console.log(e); }
    });
}
function throwHTTPStatus(statusCode, statusText = '') {   
    document.body.innerHTML = '<h1>'+statusCode+' '+statusText+'</h1>';
}
async function renderHTTPStatus(statusCode, statusText = '') {
    try {
        let response = await fetch('pages/http_response.html');
        if(response.ok) {
            document.getElementById('main').innerHTML = response.text();
            document.getElementById('response').innerHTML = statusCode+" "+statusText;
        }
    } catch(e) { throwHTTPStatus(500, 'Internal Server Error'); }
}