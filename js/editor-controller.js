'use strict'



let gElCanvas
let gCtx

// =======
// ======== init ========
// =======

function initEditorScreen() {

    const elContainer = document.querySelector('.meme-container')

    initCanvas()

    setTextInputsState()
    setDeleteButtonState()
    renderToolBarPrefs()

    //present only current screen
    hideGalleryScreen()
    showEditorScreen()

    resizeCanvas()
    renderMeme()

}

function showEditorScreen() {
    const elEditorScreen = document.querySelector('.editor-screen')
    elEditorScreen.classList.remove('hidden')
}
function hideEditorScreen() {
    const elEditorScreen = document.querySelector('.editor-screen')
    elEditorScreen.classList.add('hidden')
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
    // start from scratch btn
    const elStartScratchBtn = document.querySelector('.start-from-scratch-btn')
    elStartScratchBtn.addEventListener('click', (ev) => onStartFromScratch(ev))

    //delete element btn
    const elDeleteElement = document.querySelector('.action-btns [name="delete-element"]')
    elDeleteElement.addEventListener('click', (ev) => onDeleteElement(ev))

    //add txt btn
    const elAddTextBtn = document.querySelector('.action-btns [name="add-text"]')
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
    elTxtColorP.addEventListener('input', (ev) => renderColorPickerColor(ev.target))

    //text size range
    const elTxtSizeR = document.querySelector('.editor-container .text-tools [name="text-size-range"]')
    elTxtSizeR.addEventListener('input', (ev) => onUpdateElement(ev))
    elTxtSizeR.addEventListener('input', (ev) => renderRangeLabel(ev.target))

    //stroke size range
    const elStrokeSizeR = document.querySelector('.editor-container .text-tools [name="stroke-size-range"]')
    elStrokeSizeR.addEventListener('input', (ev) => onUpdateElement(ev))
    elStrokeSizeR.addEventListener('input', (ev) => renderRangeLabel(ev.target))

    //stroke color picker
    const elStrokeColorP = document.querySelector('.editor-container .text-tools [name="stroke-color-picker"]')
    elStrokeColorP.addEventListener('input', (ev) => onUpdateElement(ev))
    elStrokeColorP.addEventListener('input', (ev) => renderColorPickerColor(ev.target))

    //Shadow size range
    const elShadowSizeR = document.querySelector('.editor-container .text-tools [name="shadow-size-range"]')
    elShadowSizeR.addEventListener('input', (ev) => onUpdateElement(ev))
    elShadowSizeR.addEventListener('input', (ev) => renderRangeLabel(ev.target))

    //Shadow color picker
    const elShadowColorP = document.querySelector('.editor-container .text-tools [name="shadow-color-picker"]')
    elShadowColorP.addEventListener('input', (ev) => onUpdateElement(ev))
    elShadowColorP.addEventListener('input', (ev) => renderColorPickerColor(ev.target))

}

function onAddText(ev) {

    //add element and get it's current idx and update selected element idx
    const elementIdx = addElement('text')

    updateSelectedElement(elementIdx)
    onMemeChange()
    
}

function onUpdateElement(ev) {
    const val = ev.target.value
    const param = ev.target.dataset.param
    const paramObj = { param, val }

    updateElement(paramObj)
    renderMeme()
    saveUserPrefsToStorage()
    resetFileAttributes()
}

function onDeleteElement() {
    if (getLastElementIdx() < 0) return

    deleteCurrElement()
    updateSelectedElement(getLastElementIdx())
    onMemeChange()

}

function onStartFromScratch() {
    initGalleryScreen()
}


// === canvas listeners ===
function addCanvasEventListeners() {

}

// === general functions to apply on change ===
function onMemeChange(){
    resetFileAttributes()
    renderMeme()
    renderToolBarPrefs()
    setTextInputsState()
    setDeleteButtonState()
}

// =======
// ======== rendering template and elements ========
// =======



//render the template of current meme and initiates the rendering of the meme elements
function renderMeme() {
    const currMeme = getCurrMeme()
    const tempId = currMeme.selectedTempId
    const temp = getTempById(tempId)

    const tempURL = temp.url
    const img = new Image()

    img.onload = () => {
        const width = gElCanvas.width
        const height = gElCanvas.height
        gCtx.drawImage(img, 0, 0, width, height)
        renderElements()
    }

    img.src = tempURL
}

// runing over the array of meme elements and initiate element rendering for each
function renderElements() {
    const currMeme = getCurrMeme()
    currMeme.elements.forEach(element => renderElement(element))
}

//checking the element type and initiaties the suitable rendering function
function renderElement(element) {
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


// =======
// ======== render toolbar ========
// =======

function clearTextInput() {
    // document.querySelector('.editor-container .text-tools [name="text-editor"]').value = ''
}

function renderToolBarPrefs() {

    const paramsObj = getUserPrefsFromStorage()
    const elInputs = document.querySelectorAll('.editor-container .param')

    elInputs.forEach(elInput => {
        const param = elInput.dataset.param
        if (paramsObj[param]) {
            elInput.value = paramsObj[param]
        }
        if (elInput.type === 'color') {
            renderColorPickerColor(elInput)
        }
        if (elInput.type === 'range') {
            renderRangeLabel(elInput)
        }
    })

}

function renderColorPickerColor(elInput) {
    elInput.style.backgroundColor = elInput.value
}

function renderRangeLabel(elRange) {
    const identifier = elRange.name + '-label'
    const elRangeLabel = document.querySelector(`.editor-container .text-tools [name="${identifier}"]`)
    elRangeLabel.innerText = elRange.value
}

function setTextInputsState() {

    if (getLastElementIdx() >= 0 && getLastElementType() === 'text') {
        showTextInputs()
    } else hideTextInputs()
}

function hideTextInputs() {
    const elTextTools = document.querySelector('.text-tools .text-inputs')
    elTextTools.classList.add('disabled-section')
}

function showTextInputs() {
    const elTextTools = document.querySelector('.text-tools .text-inputs')
    elTextTools.classList.remove('disabled-section')
}

function setDeleteButtonState() {
    const elDeleteElement = document.querySelector('.action-btns [name="delete-element"]')
    if (getLastElementIdx() >= 0) {
        elDeleteElement.classList.remove('disabled')
    } else elDeleteElement.classList.add('disabled')

}


// resize canvas and other functions related to resizing it

function onResize() {
    resizeCanvas()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.meme-container')
    gElCanvas.width = elContainer.offsetWidth - 32
    console.log("gElCanvas.width: ", gElCanvas.width)

    const meme = getCurrMeme()
    const imgObj = getTempById(meme.selectedTempId)
    const img = new Image()
    img.src = imgObj.url
    
    img.onload = function () {
        const width = img.naturalWidth
        const height = img.naturalHeight
        const ratio = width/height
        console.log("ratio: ", ratio)

        gElCanvas.height = gElCanvas.width / ratio
        console.log("gElCanvas.height: ", gElCanvas.height)
        renderMeme()
      }
    

    
    
    
}