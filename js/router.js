'use strict';

const routes = {
    '/': {
        'file': 'pages/home.html',
        'scripts': [{
            'src': 'js/home.js',
            'type': 'text/javascript'
        }]
    },
    '/dev': {
        'file': 'pages/dev.html',
        'scripts': [{
            'src': 'js/dev.js',
            'type': 'text/javascript'
        }]
    },
    '/audio': {
        'file': 'pages/audio.html',
        'scripts': [{
            'src': 'js/audio.js',
            'type': 'text/javascript'
        }]
    },
    '/multimedia': {
        'file': 'pages/multimedia.html',
        'scripts': [{
            'src': 'js/multimedia.js',
            'type': 'text/javascript'
        }]
    },
    '/sysadmin': {
        'file': 'pages/sysadmin.html',
        'scripts': [{
            'src': 'js/sysadmin.js',
            'type': 'text/javascript'
        }]
    },
    '/about': {
        'file': 'pages/about.html',
        // 'scripts': [{
        //     'src': 'js/about.js',
        //     'type': 'text/javascript'
        // }]
    }
};

async function initializeRouter() {
    window.addEventListener('popstate', router);
    await router();
}

function addLinkEventListeners() {
    try {
        let anchors = Array.from(document.getElementsByTagName('a'));
        if(anchors.length > 0) {
            anchors.forEach((anchor) => {
                if(anchor.classList.contains('router-link')) {
                    anchor.addEventListener('click', (event) => {
                        event.preventDefault();
                        navigateTo(anchor.href);
                    });
                }
            });
        }
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
        addLinkEventListeners();
    } catch(e) { throwHTTPStatus(500, 'Internal Server Error'); }
}

async function renderPage(route) {
    let response = await fetch(route.file);
    if(response.ok) {
        let text = await response.text();
        document.getElementById('app').innerHTML = text;
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