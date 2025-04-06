'use strict'

// ======== main on init ========
// =======
// =======

window.onload = () => oninit()

function oninit() {
    getMemesFromStorage()
    addUserTempsToGTemps()
    setGNextId()
    addUserStickersToGStickers()
    setGNextStickerId()

    initCanvas()

    addNavBarEvenlisteners()
    addOnResizeEvListenre()
    addEditorEventListeners()
    addSaveAndShareEventListeners()
    addUploadingEventListeners()
    addCanvasEventListeners()
    addStickersUplaodEventListeners()
    
    initGalleryScreen()
}

// ======== adding event listeners ========

function addOnResizeEvListenre(){  
    window.addEventListener('resize', onResize);
}

function addNavBarEvenlisteners(){
    const elMemesBtn = document.querySelector('.memes-gallery-nav-btn')
    elMemesBtn.addEventListener('click', ev => onSelectNavBtn(ev,'saved-memes'))

    const elTempsBtn = document.querySelector('.templates-gallery-nav-btn')
    elTempsBtn.addEventListener('click', ev => onSelectNavBtn(ev,'temps-gallery') )
    

    const elMobileNavBtn = document.querySelector('.burger-nav-btn')
    elMobileNavBtn.addEventListener('click', onNavBarToggle)
}


// ======== general functions ========

function showFlashMsg(type = `success`, msg = `Success!`) {
    const elPopUp = document.querySelector(`.flash-msg`)
    elPopUp.classList.add(type)
    const elMsg = document.querySelector(`.flash-msg p`)
    elMsg.innerText = msg

    elPopUp.hidden = false
    elPopUp.offsetHeight
    elPopUp.classList.add(`apperance`)

    setTimeout(() => {
        elPopUp.classList.remove(`apperance`)
        setTimeout(() => {
            elPopUp.hidden = false
            elMsg.innerText = ``
            elPopUp.classList.remove(`fail`, `success`)
        }, 500);
    }, 2500);
}

function onSelectNavBtn(elBtn,page){
    const elBody = document.querySelector('body')
    if(elBody.classList.contains('menu-open')){
        onNavBarToggle()
    }

    switch(page){
        case 'saved-memes':
            initSavedMemesScreen()

            break
        case 'temps-gallery':
            initGalleryScreen()
            break
    }
}

function onNavBarToggle(){
    document.querySelector('body').classList.toggle('menu-open')
}


// images uploading
function loadImageFromInput(ev, onDataURLReady) {
    const reader = new FileReader()

    reader.onload = (event) => {
        const dataURL = event.target.result
        onDataURLReady(dataURL)
    }
    reader.readAsDataURL(ev.target.files[0])
}