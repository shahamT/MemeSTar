'use strict'

window.onload = () => oninit()

function oninit() {
    addEditorEventListeners()
    addSaveAndShareEventListeners()
    addCanvasEventListeners()
    
    initGalleryScreen()
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