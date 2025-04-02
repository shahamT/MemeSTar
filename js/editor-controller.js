'use strict'



let gElCanvas
let gCtx

window.onload = () => oninit()

// =======
// ======== init ========
// =======

function oninit() {
    initCanvas()
    renderMeme()
    addEditorEventListeners()
    addCanvasEventListeners()
}

function initCanvas() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
}




// =======
// ======== adding event listeners ========
// =======

// === editor listeners ===
function addEditorEventListeners() {
    //add txt btn
    const elAddTextBtn = document.querySelector('.editor-container .text-tools [name="add-text"]')
    elAddTextBtn.addEventListener('click', (ev) => onAddText(ev))

    //text editor
    const elTextEditor = document.querySelector('.editor-container .text-tools [name="text-editor"]')
    elTextEditor.addEventListener('input', (ev) => onUpdateElement(ev))

    //text font picker
    const elFontPicker = document.querySelector('.editor-container .text-tools [name="font-picker"]')
    elFontPicker.addEventListener('change', (ev) => onUpdateElement(ev))

    //text color picker
    const elTxtColorP = document.querySelector('.editor-container .text-tools [name="text-color-picker"]')
    elTxtColorP.addEventListener('input', (ev) => onUpdateElement(ev))

    //text size range
    const elTxtSizeR = document.querySelector('.editor-container .text-tools [name="text-size-range"]')
    elTxtSizeR.addEventListener('input', (ev) => onUpdateElement(ev))

}

function onAddText(ev) {
    console.log('got here')
}

function onUpdateElement(ev) {
    const val = ev.target.value
    const param = ev.target.dataset.param
    const paramObj = {param, val}
    updateElement(paramObj)
    renderMeme()

    
}


// === canvas listeners ===
function addCanvasEventListeners() {

}


// =======
// ======== rendering template and elements ========
// =======



//render the template of current meme and initiates the rendering of the meme elements
function renderMeme() {
    const tempId = gCurrMeme.selectedTempId;
    const temp = getTempById(tempId);

    const tempURL = temp.url;
    const img = new Image();

    img.onload = () => {
        const width = gElCanvas.width;
        const height = gElCanvas.height;
        gCtx.drawImage(img, 0, 0, width, height);
        renderElements()
    };

    img.src = tempURL;
}

// runing over the array of meme elements and initiate element rendering for each
function renderElements() {
    gCurrMeme.elements.forEach(element => renderElement(element))
}

//checking the element type and initiaties the suitable rendering function
function renderElement(element) {
    console.log("element.type: ", element.type)
    switch (element.type) {
        case 'text':
            renderText(element)

            break
        case 'sticker':
            renderSticker(element)
            break
    }
}

// renders text elements
function renderText(element) {
    //if there are no defined positions, set the text in the middle
    const offsetX = element.pos.x ? element.pos.x : gElCanvas.width / 2
    const offsetY = element.pos.y ? element.pos.y : gElCanvas.height / 2

    const font = `${element.fontSize}px ${element.fontFamily}`
    const text = element.txt

    gCtx.lineWidth = element.lineWidth
    gCtx.strokeStyle = element.strokeStyle
    gCtx.fillStyle = element.fillStyle
    gCtx.font = font
    gCtx.textAlign = element.textAlign
    gCtx.textBaseline = element.textBaseline

    //shadow
    gCtx.shadowColor = element.shadowColor
    gCtx.shadowOffsetX = element.shadowOffsetX
    gCtx.shadowOffsetY = element.shadowOffsetY
    gCtx.shadowBlur = element.shadowBlur

    //draw the text
    gCtx.fillText(text, offsetX, offsetY)
    gCtx.strokeText(text, offsetX, offsetY)

}

// renders sticker elements
function renderSticker(element) {

}