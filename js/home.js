'use strict';
if(typeof(techs) === 'undefined')
    var techs = null;
if(typeof(documentLangCtrl) === 'undefined')
    var documentLangCtrl = document.lang ?? 'en';
loadPage();

async function loadPage() {
    await yieldComponentIntoElement('components/home/web.html', 'web');
    await yieldComponentIntoElement('components/home/desktop.html', 'desktop');
    await yieldComponentIntoElement('components/home/consolecli.html', 'consolecli');
    await yieldComponentIntoElement('components/home/db.html', 'db');
    try {
        let response = await fetch('json/data/dev.json');
        if(response.ok)
            techs = await response.json();
    } catch(e) { console.log(e); }

    if(techs != null)
        insertTechJSONData();
}

function insertTechJSONData() {
    Object.keys(techs).forEach((techArrayKey) => {
        let techArray = Array.from(techs[techArrayKey]);
        techArray.forEach((tech) => {
            let techIconComponent = createTechIconComponent(tech);
            techIconComponent.addEventListener('click', () => {
                openTechModal(tech);
            });
            document.getElementById(techArrayKey).appendChild(techIconComponent);
        });
    });
}

function openTechModal(tech) {
    document.getElementById('tech-modal-img').setAttribute('src', "img/icons/technologies/"+tech['icon']);
    document.getElementById('tech-modal-label').innerHTML = tech['name'];
    document.getElementById('tech-modal-usage').innerHTML = tech['usage'][documentLangCtrl] ?? '';
    if(tech['description'])
        document.getElementById('tech-modal-description').innerHTML = tech['description'][documentLangCtrl] ?? '';
    document.getElementById('tech-modal-button').click();
    document.body.style = "";
}

function createTechIconComponent(tech) {
    // Prepare component container
    let divContainer = document.createElement('div');
    divContainer.classList.add('col-md-1', 'col-4', 'm-0', 'p-0', 'text-center', 'align-items-center', 'justify-content-start', 'tech-icon-container');

    // Prepare tech icon img element
    let techIcon = document.createElement('img');
    techIcon.setAttribute('src', "img/icons/technologies/"+tech['icon']);
    // Add element to component container
    divContainer.appendChild(techIcon);
    
    // Prepare name heading element
    let nameHeading = document.createElement('h6');
    nameHeading.innerHTML = tech['name'];
    nameHeading.classList.add('fw-bold', 'pt-4');
    // Add element to component container
    divContainer.appendChild(nameHeading);

    // Prepare tech type description
    let typeDesc = document.createElement('p');
    typeDesc.innerHTML = tech['type'][documentLangCtrl];
    typeDesc.classList.add('fst-italic', 'fs-9');
    // Add element to component container
    divContainer.appendChild(typeDesc);
    

    // Prepare experience count heading
    let experienceHeading = document.createElement('h6')
    experienceHeading.classList.add('fw-bolder', 'fs-7');
    experienceHeading.innerHTML = tech['experience'][documentLangCtrl];
    // Add element to component container
    divContainer.appendChild(experienceHeading);
    return divContainer;
}