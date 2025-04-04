'use strict'

var gFilterParams = {
    type: 'general',
    search: null,
}

var gSearchTimeout = null

// =======
// ======== init ========
// =======

function initGalleryScreen() {

    resetCurrMeme()

    renderGallery()
    addGalleryEventListeners()

    renderSearchKeywords()

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
    const elTemplates = document.querySelectorAll('.templates-gallery .template-card')
    elTemplates.forEach(elTemp => {
        elTemp.addEventListener('click', (ev) => onTempClick(ev))

    })

    const elSearchInput = document.querySelector('.gallery-search-input')
    elSearchInput.addEventListener('input', (ev) => onSearchInput(ev.target.value))

    const elClearSearchBtn = document.querySelector('.clear-search-btn')
    elClearSearchBtn.addEventListener('click', () => onClearSearch())

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

function onSearchInput(value) {
    gFilterParams.search = value ? value : null
    renderGallery()

    if (value) {
        displayClearSearchBtn('show')
    } else displayClearSearchBtn('hide')

    clearTimeout(gSearchTimeout)
    gSearchTimeout = null

    gSearchTimeout = setTimeout(() => {
        if (value.length > 2) {
            countKeyword(value)
        }
    }, 2000);

}

function onClearSearch() {
    const elSearchInput = document.querySelector('.gallery-search-input')
    elSearchInput.value = ''
    onSearchInput(null)
}

function displayClearSearchBtn(action) {
    const elClearSearchBtn = document.querySelector('.clear-search-btn')
    switch (action) {
        case 'hide':
            elClearSearchBtn.classList.add('hidden')
            break
        case 'show':
            elClearSearchBtn.classList.remove('hidden')
            break
    }
}

function onKeywordClick(elKeyword) {
    const elSearchInput = document.querySelector('.gallery-search-input')
    elSearchInput.value = elKeyword.dataset.word
    onSearchInput(elKeyword.dataset.word)
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

function renderSearchKeywords() {
    const keywords = getKeywordsForDisplay(6)

    //find highest amount of clicks
    const highest = keywords.reduce((max, keyword) => keyword.amount > max.amount ? keyword : max).amount

    const elContainer = document.querySelector('.search-keys-cloud')

    let strHtml = ''
    keywords.forEach(keyword => {
        // calculate proporional size
        const fSize = keyword.amount / highest

        strHtml += `<p class="keyword" data-word="${keyword.keyword}" data-fsize="${fSize}">${keyword.keyword}</p>`
    })

    elContainer.innerHTML = strHtml

    const elKeywords = document.querySelectorAll('.search-keys-cloud .keyword')
    elKeywords.forEach(elKeyword => {
        elKeyword.addEventListener('click', (ev) => onKeywordClick(ev.target))

        // apply proportional size
        const fSize = +elKeyword.dataset.fsize*1.5 + 1
        elKeyword.style.fontSize = `${fSize}rem`
    })



}