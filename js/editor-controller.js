'use strict'


var gElCanvas
var gCtx
var gSF = 3 //global canvas scale factor

var gLastPos
var gBoundBox = {
    boxPlus: null,
    boxMinus: null,
    boxDel: null
}

var gStickersFilterParams = {
    type: 'general',
    search: null,
}

var gEditMode = 'text'

// ======== init ========
// =======
// =======

function initEditorScreen() {

    const elContainer = document.querySelector('.meme-container')
    setTextInputsState()
    setDeleteButtonState()
    renderToolBarPrefs()

    // stickers
    renderStickersGallery()
    addStickersEventListeners()

    //present only current screen
    hideGalleryScreen()
    hideMemesGalleryScreen()
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


// ======== adding event listeners ========
// =======
// =======

// === editor events ===

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

    //add sticker btn
    const elAddStickerBtn = document.querySelector('.action-btns [name="add-sticker"]')
    elAddStickerBtn.addEventListener('click', (ev) => onAddSticker(ev))
    elAddStickerBtn.addEventListener('click', (ev) => onOpenStickersContainer(ev))

    //text editor
    const elTextEditor = document.querySelector('input[name="text-editor"]')
    elTextEditor.addEventListener('input', (ev) => onUpdateElement(ev))
    elTextEditor.addEventListener('click', (ev) => onTextInputClick(ev.target))

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

    // === mobile buttons ====
    const elTextToolsBtn = document.querySelector('.text-tools-settings-btn')
    elTextToolsBtn.addEventListener('click', () => onOpenEditorContainer())

    const elCloseToolsBtn = document.querySelector('.close-editor-btn')
    elCloseToolsBtn.addEventListener('click', () => onCloseEditorContainer())

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

    gEditMode = getSelectedElement().type
    setTextInputsState()

}

function onStartFromScratch() {
    initGalleryScreen()
}

// mobile functions

function onOpenEditorContainer() {
    const elEditorContainer = document.querySelector('.editor-container')
    elEditorContainer.classList.toggle('visible')
}

function onCloseEditorContainer() {
    const elEditorContainer = document.querySelector('.editor-container')
    elEditorContainer.classList.toggle('visible')
}

function onOpenStickersContainer() {
    const elStickersContainer = document.querySelector('.stickers-gallery-container')
    elStickersContainer.classList.toggle('visible')
}

function onCloseStickersContainer() {
    const elStickersContainer = document.querySelector('.stickers-gallery-container')
    elStickersContainer.classList.toggle('visible')
}


// === canvas events ===

function addCanvasEventListeners() {
    gElCanvas.addEventListener('mousedown', (ev) => onDown(ev))
    gElCanvas.addEventListener('touchstart', (ev) => onDown(ev))
    gElCanvas.addEventListener('mousemove', (ev) => onMove(ev))
    gElCanvas.addEventListener('touchmove', (ev) => onMove(ev))
    gElCanvas.addEventListener('mouseup', (ev) => onUp(ev))
    gElCanvas.addEventListener('touchend', (ev) => onUp(ev))
}

function onDown(ev) {
    // checking if element was clicked
    const elementIdx = getClickedElement(ev)
    if (elementIdx !== -1) {
        updateSelectedElement(elementIdx)
        saveUserPrefsToStorage()
        
        const element = getSelectedElement()
        element.isDragged = true
        const pos = getEvPos(ev)
        gLastPos = pos
        setToolsContainersState(element)

    } else if(getClickedActionBox(ev)){
        // checking if delete box was clicked
        const actionBox = getClickedActionBox(ev)
        const element = getSelectedElement()

        switch (actionBox) {
            case 'boxPlus':
                element.fontSize += 2
                break
            case 'boxMinus':
                element.fontSize -= 2
                break
            case 'boxDel':
                onDeleteElement()
                break
        }

    } else updateSelectedElement(null)

    onMemeChange()

    gEditMode = getSelectedElement().type
    setTextInputsState()
}

function onMove(ev) {
    const element = getSelectedElement()
    if (element === null) return
    if (!element.isDragged) return

    const pos = getEvPos(ev)

    //* Calculate distance moved from drag start position
    const dx = pos.x - gLastPos.x
    const dy = pos.y - gLastPos.y
    updateElementPos(dx, dy)

    //* Update start position for next move calculation
    gLastPos = pos

    renderMeme()
}

function onUp(ev) {
    const element = getSelectedElement()
    if (element === null) return
    element.isDragged = false
}

// === general functions to apply on change ===
function onMemeChange() {
    resetFileAttributes()
    renderMeme()
    renderToolBarPrefs()
    setTextInputsState()
    setDeleteButtonState()
}

// ======== rendering template and elements ========
// =======
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
        renderBoundBox()
    }

    img.crossOrigin = 'anonymous';
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

    //calculate and update element size
    const textMat = gCtx.measureText(text)
    const textW = textMat.width
    const textH = textMat.actualBoundingBoxAscent + textMat.actualBoundingBoxDescent
    element.size = { w: textW, h: textH }

    // update element size
    element.size.w = textW
    element.size.h = textH

    //update element pos
    element.pos = { x: offsetX, y: offsetY }

    // update element bounding box
    element.boundBox = {}
    element.boundBox.x1 = offsetX - (textW / 2)
    element.boundBox.x2 = offsetX + (textW / 2)
    element.boundBox.y1 = offsetY - (textH / 2)
    element.boundBox.y2 = offsetY + (textH / 2)


    //draw the text
    gCtx.strokeText(text, offsetX, offsetY)
    gCtx.fillText(text, offsetX, offsetY)

}

function renderSticker(element) {
    const stickerURL = element.stickerURL
    const width = element.size.w ? element.size.w : 80
    const height = element.size.h ? element.size.h : 80
    const offsetX = element.pos.x ? element.pos.x : gElCanvas.width / 2 - width / 2
    const offsetY = element.pos.y ? element.pos.y : gElCanvas.height / 2 - height / 2

    //update element pos
    element.pos = { x: offsetX, y: offsetY }

    // update element bounding box
    element.boundBox = {}
    element.boundBox.x1 = offsetX
    element.boundBox.x2 = offsetX + width
    element.boundBox.y1 = offsetY
    element.boundBox.y2 = offsetY + height

    //draw the sticker
    const img = new Image()

    img.onload = () => {
        gCtx.drawImage(img, offsetX, offsetY, width, height)
    }
    img.crossOrigin = 'anonymous';
    img.src = stickerURL


}

function renderBoundBox() {
    const element = getSelectedElement()
    if (element === null) return
    if (gIsExporting) return

    if (element.type === 'text' && element.txt === '') return

    const { x1, x2, y1, y2 } = element.boundBox
    const elH = element.size.h
    const elW = element.size.w


    gCtx.strokeStyle = '#FFD500';
    gCtx.lineWidth = 2;

    // Draw rectangle outline at (x, y) with specified width and height
    gCtx.strokeRect(x1 - 10, y1 - 15, x2 - x1 + 20, y2 - y1 + 20);

    //draw sizing squares
    gCtx.fillStyle = '#C8C8C8'

    // minus
    gCtx.fillRect(x1 - 31, y1 - 5, 20, 20)
    gBoundBox.boxMinus = { x1: x1 - 31, x2: x1 - 31 + 20, y1: y1 - 5, y2: y1 - 5 + 20 } //save minus box bounding size

    gCtx.beginPath()
    gCtx.moveTo(x1 - 27, y1 + 5)
    gCtx.lineTo(x1 - 15, y1 + 5)
    gCtx.strokeStyle = '#000000'
    gCtx.lineWidth = 2
    gCtx.stroke()

    // plus

    gCtx.fillRect(x2 + 11, y1 - 5, 20, 20)
    gBoundBox.boxPlus = { x1: x2 + 11, x2: x2 + 11 + 20, y1: y1 - 5, y2: y1 - 5 + 20 } //save plus box bounding size

    gCtx.beginPath()
    gCtx.moveTo(x2 + 27, y1 + 5)
    gCtx.lineTo(x2 + 15, y1 + 5)
    gCtx.strokeStyle = '#000000'
    gCtx.lineWidth = 2
    gCtx.stroke()

    gCtx.beginPath()
    gCtx.moveTo(x2 + 21, y1 - 1)
    gCtx.lineTo(x2 + 21, y1 + 11)
    gCtx.strokeStyle = '#000000'
    gCtx.lineWidth = 2
    gCtx.stroke()


    // delete circle
    gCtx.beginPath();
    gCtx.arc(element.pos.x + 5, element.pos.y + element.size.h, 10, 0, Math.PI * 2, false)
    gCtx.fillStyle = '#E53935'
    gCtx.fill()

    //save delete box bounding size
    const startCorX = element.pos.x - 5
    const startCorY = element.pos.y + element.size.h - 5
    const endCorX = element.pos.x + 15
    const endCorY = element.pos.y + element.size.h + 15
    gBoundBox.boxDel = { x1: startCorX, x2: endCorX, y1: startCorY, y2: endCorY }

    // X line 1
    gCtx.beginPath()
    gCtx.moveTo(element.pos.x + 5 - 5, element.pos.y + element.size.h - 5)
    gCtx.lineTo(element.pos.x + 5 + 5, element.pos.y + element.size.h + 5)
    gCtx.strokeStyle = '#FFFFFF'
    gCtx.lineWidth = 2
    gCtx.stroke()

    // X line 2
    gCtx.beginPath()
    gCtx.moveTo(element.pos.x + 5 - 5, element.pos.y + element.size.h + 5)
    gCtx.lineTo(element.pos.x + 5 + 5, element.pos.y + element.size.h - 5)
    gCtx.strokeStyle = '#FFFFFF'
    gCtx.lineWidth = 2
    gCtx.stroke()

}


// ======== render toolbar ========
// =======
// =======

function clearTextInput() {
    // document.querySelector('.editor-container .text-tools [name="text-editor"]').value = ''
}

function renderToolBarPrefs() {

    const paramsObj = getUserPrefsFromStorage()
    const elInputs = document.querySelectorAll('.editor-screen .param')

    elInputs.forEach(elInput => {
        const param = elInput.dataset.param
        if (elInput.name === 'text-editor') {
            return
        }
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

    switch (gEditMode) {
        case 'text':
            if (getLastElementIdx() >= 0 && getLastElementType() === 'text') {
                showTextInputs()
                  const elTextInput = document.querySelector('input[name="text-editor"]')
                  const selectedElement = getSelectedElement()
                  if (selectedElement) elTextInput.value = selectedElement.txt
            } else {
                hideTextInputs()
                const elTextInput = document.querySelector('input[name="text-editor"]')
                elTextInput.value = 'add / select text to edit'
            }
            break
        case 'sticker':
            hideTextInputs()
            const elTextInput = document.querySelector('input[name="text-editor"]')
            elTextInput.value = 'add / select text to edit'
            break
    }
}

function hideTextInputs() {
    const elTextTools = document.querySelector('.text-tools .text-inputs')
    const elTextInput = document.querySelector('input[name="text-editor"]')
    const elTextToolsBtn = document.querySelector('.text-tools-settings-btn')
    elTextTools.classList.add('disabled-section')
    elTextInput.classList.add('disabled-section')
    elTextToolsBtn.classList.add('disabled-section')
}

function showTextInputs() {
    const elTextTools = document.querySelector('.text-tools .text-inputs')
    const elTextInput = document.querySelector('input[name="text-editor"]')
    const elTextToolsBtn = document.querySelector('.text-tools-settings-btn')
    elTextTools.classList.remove('disabled-section')
    elTextInput.classList.remove('disabled-section')
    elTextToolsBtn.classList.remove('disabled-section')

}

function setDeleteButtonState() {
    const elDeleteElement = document.querySelector('.action-btns [name="delete-element"]')
    if (getLastElementIdx() >= 0) {
        elDeleteElement.classList.remove('disabled')
    } else elDeleteElement.classList.add('disabled')

}


// ======== canvas resizing ========

function onResize() {
    resizeCanvas()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.meme-container')

    const meme = getCurrMeme()
    if (!meme.selectedTempId) return

    const imgObj = getTempById(meme.selectedTempId)
    const img = new Image()
    img.src = imgObj.url

    img.onload = function () {
        const width = img.naturalWidth
        const height = img.naturalHeight
        const ratio = width / height
        if (width >= height) {
            gElCanvas.style.width = '100%'
            gElCanvas.style.height = 'auto'
            gElCanvas.width = (elContainer.offsetWidth - 32)
            gElCanvas.height = gElCanvas.width / (width / height)
        } else {
            gElCanvas.style.width = 'auto'
            gElCanvas.style.height = '100%'
            gElCanvas.height = (elContainer.offsetHeight - 32)
            gElCanvas.width = gElCanvas.height / (height / width)
        }

        renderMeme()
    }
}


// drag & drop functions
function getClickedElement(ev) {
    const pos = getEvPos(ev)
    const meme = getCurrMeme()
    const elements = meme.elements

    const clickedElement = elements.findIndex(element => {

        let isClicked = false
        const { x1, x2, y1, y2 } = element.boundBox
        if (pos.x >= x1 && pos.x <= x2 && pos.y >= y1 && pos.y <= y2) {
            isClicked = true
        }
        return isClicked
    })
    return clickedElement
}

function getClickedActionBox(ev) {
    const pos = getEvPos(ev)
    console.log("pos: ", pos)
    let clickedActionBox

    for (let box in gBoundBox) {
        let isClicked = false

        const { x1, x2, y1, y2 } = gBoundBox[box]
        console.log(gBoundBox)

        if (pos.x >= x1 && pos.x <= x2 && pos.y >= y1 && pos.y <= y2) {
            isClicked = true
        }
        if (isClicked === true) clickedActionBox = box
    }
    return clickedActionBox
}

function getEvPos(ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        //* Prevent triggering the default mouse behavior
        ev.preventDefault()

        //* Gets the first touch point (could be multiple in touch event)
        ev = ev.changedTouches[0]

        /* 
        * Calculate touch coordinates relative to canvas 
        * position by subtracting canvas offsets (left and top) from page coordinates
        */
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
            // x: ev.pageX ,
            // y: ev.pageY ,
        }
    }
    return pos
}




// show or hide text tools and stickers
function setToolsContainersState(element) {
    switch (element.type) {
        case 'text':
            hideStickersGallery()
            showTextTools()
            break
        case 'sticker':
            hideTextTools()
            showStickersGallery()
            break
    }
}

// ==== text tools  ====

function showTextTools() {
    const elTextTools = document.querySelector('.editor-container')
    const elTextInput = document.querySelector('.text-input-container')
    elTextTools.classList.remove('c-hidden')
    elTextInput.classList.remove('c-hidden')
}

function hideTextTools() {
    const elTextTools = document.querySelector('.editor-container')
    const elTextInput = document.querySelector('.text-input-container')
    elTextTools.classList.add('c-hidden')
    elTextInput.classList.add('c-hidden')

}

function onAddText(ev) {
    gEditMode = 'text'
    setTextInputsState()
    showTextTools()
    hideStickersGallery()

    //add element and get it's current idx and update selected element idx
    const elementIdx = addElement('text')

    updateSelectedElement(elementIdx)
    onMemeChange()

}

function onTextInputClick(elInput) {
    if (elInput.value === 'Your Text') elInput.value = ''
}


// ==== stickers  ====

function showStickersGallery() {
    const elStickersGallery = document.querySelector('.stickers-gallery-container')
    elStickersGallery.classList.remove('c-hidden')
}

function hideStickersGallery() {
    const elStickersGallery = document.querySelector('.stickers-gallery-container')
    elStickersGallery.classList.add('c-hidden')

}

function onAddSticker(ev) {
    gEditMode = 'sticker'
    setTextInputsState()
    hideTextTools()
    showStickersGallery()
}

function renderStickersGallery() {

    const stickers = getStickersForDisplay(gStickersFilterParams)

    const elGallery = document.querySelector('.stickers-gallery')
    let strHtml = ''

    stickers.forEach((sticker) => {
        strHtml += `<div class="sticker-card"><img data-id="${sticker.id}" src="${sticker.url}">
                    </div>`
    })
    elGallery.innerHTML = strHtml
}

function addStickersEventListeners() {
    const elStickers = document.querySelectorAll('.stickers-gallery .sticker-card')
    elStickers.forEach(elSticker => {
        elSticker.addEventListener('click', (ev) => onPlaceSticker(ev.currentTarget))
        elSticker.addEventListener('click', () => onCloseStickersContainer())
        
    })

}

function onPlaceSticker(elStickerCard) {
    const img = elStickerCard.querySelector('img')
    const stickerId = +img.dataset.id
    const sticker = getStickerById(stickerId)

    //add element and get it's current idx and update selected element idx
    const elementId = addElement('sticker', sticker.url)

    updateSelectedElement(elementId)
    onMemeChange()

}