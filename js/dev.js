'use strict';
if(typeof(documentLangCtrl) === 'undefined')
    var documentLangCtrl = document.lang ?? 'en';

document.addEventListener('DOMContentLoaded', loadPage);

async function loadPage() {
    document.title = 'Francisco Hernández | Development';

    await yieldComponentIntoElement('components/dev/webdev.html', 'webdev');
    await yieldComponentIntoElement('components/dev/desktop.html', 'desktop');
    await yieldComponentIntoElement('components/dev/databases.html', 'databases');

    let devJSONData = null;
    try {
        let response = await fetch('json/data/dev.json');
        if(response.ok)
            devJSONData = await response.json();
    } catch(e) {}

    if(devJSONData != null)
        insertJsonData(devJSONData);
}

function insertJsonData(devJSONData) {
    Object.keys(devJSONData).forEach((techArrayKey) => {
        let techArray = devJSONData[techArrayKey];
        techArray.forEach((tech) => {
            let techIconComponent = createTechIconComponent(tech);
            document.getElementById(techArrayKey).appendChild(techIconComponent);
        });
    });
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

    /*
    // When uncommented, this information will be presented with a nicer HTML element

    // Prepare usage description
    let [
        usageDesc, 
        usageLabelTitle, 
        usageLabelTitleSpan
    ] = [
        document.createElement('p'),
        document.createElement('strong'), // 'strong' element in which to wrap the "Usage:" label
        document.createElement('span') // span for the word 'usage' to be translated on demand
    ];
    // label/title "Usage:" will be replaced for its corresponding language key
    usageLabelTitleSpan.setAttribute('data-langkey', 'usage'); // key to look for in JSON lang file(s)
    usageLabelTitleSpan.innerHTML = 'Usage'; // initialize just to have English content in place
    usageLabelTitle.appendChild(usageLabelTitleSpan);
    usageLabelTitle.innerHTML += ":";
    usageDesc.appendChild(usageLabelTitle);
    usageDesc.innerHTML += " " + tech['usage'][documentLangCtrl];
    usageDesc.classList.add('fs-8', 'fst-italic');
    // Add element to component container
    divContainer.appendChild(usageDesc);
    */

    return divContainer;
}