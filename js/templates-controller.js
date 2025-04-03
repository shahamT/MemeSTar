'use strict'

var gFilterParams = {
    type: 'general',
    search: null,
}



// =======
// ======== init ========
// =======

function initGalleryScreen() {

    resetCurrMeme()

    renderGallery()
    addGalleryEventListeners()

    //present only current screen
    hideEditorScreen()
    hideMemesGalleryScreen()
    showGalleryScreen()
}

function showGalleryScreen() {
    const elGalleryScreen = document.querySelector('.templates-gallery-screen')
    elGalleryScreen.classList.remove('hidden')
}
function hideGalleryScreen() {
    const elGalleryScreen = document.querySelector('.templates-gallery-screen')
    elGalleryScreen.classList.add('hidden')
}


// =======
// ======== adding event listeners ========
// =======

function addGalleryEventListeners() {
    //add txt btn
    const elTemplates = document.querySelectorAll('.templates-gallery .template-card')
    elTemplates.forEach(elTemp => {
        elTemp.addEventListener('click', (ev) => onTempClick(ev))

    })

}

function onTempClick(ev) {
    
    const img = ev.target.querySelector('img')
    const tempId = img.dataset.id

    const paramObj = {
        param: 'selectedTempId',
        val: +tempId
    }

    updateCurrMeme(paramObj)
    initEditorScreen()
}


// =======
// ======== render ========
// =======

function renderGallery() {

    const temps = getTempsForDisplay(gFilterParams)

    const elGallery = document.querySelector('.templates-gallery')
    let strHtml = ''

    temps.forEach(temp => {
        strHtml += `<div class="template-card" ><img data-id="${temp.id}" src="${temp.url}"></div>
        `
    })

    elGallery.innerHTML = strHtml
}