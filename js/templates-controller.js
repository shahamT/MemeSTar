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
    addSearchEventListeners()
    onGalleryTabSelected()

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

    // gallery tabs
    const elGeneralTab = document.querySelector('.general-temps-tab')
    elGeneralTab.addEventListener('click', (ev) => onSelectGalleryTab(ev.target))

    const elUserTab = document.querySelector('.user-temps-tab')
    elUserTab.addEventListener('click', (ev) => onSelectGalleryTab(ev.target))

}

function addSearchEventListeners() {
    const elSearchInput = document.querySelector('.gallery-search-input')
    elSearchInput.addEventListener('input', (ev) => onSearchInput(ev.target.value))

    const elClearSearchBtn = document.querySelector('.clear-search-btn')
    elClearSearchBtn.addEventListener('click', () => onClearSearch())
}


// === gallery tabs ===

function onSelectGalleryTab(elTab) {
    const type = elTab.dataset.type
    gFilterParams.type = type
    renderGallery()
    addGalleryEventListeners()
    onGalleryTabSelected()
}


function onGalleryTabSelected() {
    const elTab = document.querySelector(`.tab[data-type="${gFilterParams.type}"]`)
    const elTabs = document.querySelectorAll('.gallery-tabs .tab')

    elTabs.forEach(tab => tab.classList.remove('selected'))
    elTab.classList.add('selected')
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
    addGalleryEventListeners()

    if (value) {
        displayClearSearchBtn('show')
    } else displayClearSearchBtn('hide')

    clearTimeout(gSearchTimeout)
    gSearchTimeout = null
    console.log('got here')

    gSearchTimeout = setTimeout(() => {
        if (value.length > 2) {
            countKeyword(value)
            clearTimeout(gSearchTimeout)
            gSearchTimeout = null
        }
    }, 1500);

}

function onClearSearch() {
    const elSearchInput = document.querySelector('.gallery-search-input')
    elSearchInput.value = ''
    onSearchInput('')
}

function displayClearSearchBtn(action) {
    const elClearSearchBtn = document.querySelector('.clear-search-btn')
    switch (action) {
        case 'hide':
            elClearSearchBtn.classList.add('b-hidden')
            break
        case 'show':
            elClearSearchBtn.classList.remove('b-hidden')
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
        const fSize = +elKeyword.dataset.fsize * 1.5 + 1
        elKeyword.style.fontSize = `${fSize}em`
    })
}


// ==== template uploading  ====


// event listeners

function addUploadingEventListeners() {
    const elUploadContainer = document.querySelector('.upload-area')
    elUploadContainer.addEventListener('click', () => onUploadAreaClick())

    const elFileInput = document.querySelector('.temp-upload')
    elFileInput.addEventListener('change', (ev) => onUploadTemp(ev))


    // TODO finish drop files functionality

    // Prevent default drag behaviors
    const events = ['dragenter', 'dragover', 'dragleave', 'drop']
    events.forEach(eventName => {
        elUploadContainer.addEventListener(eventName, ev => {
            ev.preventDefault()
            ev.stopPropagation()
        })
    })

    // Handle file drop
    // elUploadContainer.addEventListener('drop', ev => {
    //   const img = ev.dataTransfer.files;
    //   handleFiles(files);
    // });
    elUploadContainer.addEventListener('drop', ev => onUploadTemp)

}



// ============

function onUploadAreaClick() {
    const elFileInput = document.querySelector('.temp-upload')
    elFileInput.click()
}


function onUploadTemp(ev) {
    const elIcon = document.querySelector('.upload-icon')
    elIcon.classList.add('inline-loader')
    loadImageFromInput(ev, handleUploadedTemp)
}

function loadImageFromInput(ev, onDataURLReady, elIcon) {
    const reader = new FileReader()

    reader.onload = (event) => {
        const dataURL = event.target.result
        onDataURLReady(dataURL)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function handleUploadedTemp(imgDataURL) {
    const elIcon = document.querySelector('.upload-icon')
    elIcon.classList.add('inline-loader')
    onUploadImg(imgDataURL, handleUserMemeUploaded, elIcon)
}

function handleUserMemeUploaded(link) {
    const tempId = addTemplate(link)
    renderGallery()
    addGalleryEventListeners()


    const paramObj = {
        param: 'selectedTempId',
        val: +tempId
    }

    updateCurrMeme(paramObj)
    initEditorScreen()

}