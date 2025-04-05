'use strict'

window.onload = () => oninit()

function oninit() {
    getMemesFromStorage()
    addUserTempsToGTemps()

    initCanvas()

    addNavBarEvenlisteners()
    addOnResizeEvListenre()
    addEditorEventListeners()
    addSaveAndShareEventListeners()
    addUploadingEventListeners()
    addCanvasEventListeners()
    
    initGalleryScreen()
}


function addOnResizeEvListenre(){  
    window.addEventListener('resize', onResize);
}

function addNavBarEvenlisteners(){
    const elMemesBtn = document.querySelector('.memes-gallery-nav-btn')
    elMemesBtn.addEventListener('click', initSavedMemesScreen)

    const elTempsBtn = document.querySelector('.templates-gallery-nav-btn')
    elTempsBtn.addEventListener('click', initGalleryScreen)
    

    const elMobileNavBtn = document.querySelector('.burger-nav-btn')
    elMobileNavBtn.addEventListener('click', onNavBarToggle)
}


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


function onNavBarToggle(){
    document.querySelector('body').classList.toggle('menu-open')
}