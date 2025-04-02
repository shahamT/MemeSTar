'use strict'

var gFilterParams = {
    type: 'general',
    search: null,
}



// =======
// ======== init ========
// =======

function initGalleryScreen() {

    
    renderGallery()
    addGalleryEventListeners()

    //present only current screen
    hideEditorScreen()
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
    const elTemplates = document.querySelectorAll('.templates-gallery img')
     elTemplates.forEach(elTemp => {
         elTemp.addEventListener('click', (ev) => onTempClick(ev))

     })

}

function onTempClick(ev) {
    const tempId = ev.target.dataset.id
    const paramObj = {
        param: 'selectedTempId',
        val: +tempId
    }

    resetCurrMeme()
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
        strHtml += `<img class="template-card" data-id="${temp.id}" src="${temp.url}">
        `
    })

    elGallery.innerHTML = strHtml
}