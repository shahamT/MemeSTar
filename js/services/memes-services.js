'use strict'

const DB_USER_PREFS_KEY = 'USER_PREFS'

var gCurrMeme

// ======== meme crudl and more ========


function getCurrMeme() {
    return gCurrMeme
}

function updateCurrMeme(paramObj) {
    gCurrMeme[paramObj.param] = paramObj.val
}

function resetCurrMeme() {
    gCurrMeme = {
        id: null,
        selectedTempId: null,
        selectedElementIdx: 0,
        dataURL: null,
        memeLink: null,

        elements: []
    }

}

function resetFileAttributes() {
    gCurrMeme.dataURL = null
    gCurrMeme.memeLink = null
}

// ======== meme elements managment ========

function addElement(type, StickerURL = null) {

    const newElementObj = getUserPrefsFromStorage()

    switch (type) {
        case 'text':
            //create default text element with user prefs
            newElementObj.type = type
            newElementObj.pos = { x: null, y: null }
            newElementObj.txt = 'Your Text'

            switch (getAmountOfElementsByType('text')) {
                case 0:
                    newElementObj.pos.y = 40
                    break
                case 1:
                    newElementObj.pos.y = gElCanvas.height - 40
                    break
            }
            break

        case 'sticker':
            newElementObj.type = type
            newElementObj.pos = { x: null, y: null }
            newElementObj.size= { w: null, h: null }
            newElementObj.stickerURL =  StickerURL

            break
    }

    gCurrMeme.elements.push(newElementObj)

    //return the idx of the new element
    return gCurrMeme.elements.length - 1
}

function updateSelectedElement(idx = null) {
    gCurrMeme.selectedElementIdx = idx
    saveUserPrefsToStorage()

}

function updateElement(paramObj) {
    const element = gCurrMeme.elements[gCurrMeme.selectedElementIdx]
    element[paramObj.param] = paramObj.val
}

function deleteCurrElement() {
    gCurrMeme.elements.splice(gCurrMeme.selectedElementIdx, 1)
}

function getLastElementIdx() {
    return gCurrMeme.elements.length - 1
}

function getLastElementType() {
    const lastElement = gCurrMeme.elements[getLastElementIdx()]
    return lastElement.type
}

function getAmountOfElementsByType(type) {
    const filteredEls = gCurrMeme.elements.filter(element => element.type === type)
    return filteredEls.length
}

function getSelectedElement() {
    if (gCurrMeme.elements.length === 0 ||
        gCurrMeme.selectedElementIdx === null
    ) return null
    return gCurrMeme.elements[gCurrMeme.selectedElementIdx]
}

function updateElementPos(x, y) {
    const element = getSelectedElement()
    if (element.pos.x + x === 0 || element.pos.y + y === 0) return
    element.pos.x += x
    element.pos.y += y
}


// ======== user editing prefferences ========

function _createDefaultUserPrefs() {
    const paramsObj = {

        type: null,

        // text params
        txt: '',
        fontSize: 32,
        fontFamily: 'Arial Black',
        lineWidth: 0,
        strokeStyle: '#000000',
        fillStyle: '#FFFFFF',
        textAlign: 'center',
        textBaseline: 'middle',

        //sticker params
        stickerId: null,

        // shadow params
        shadowColor: '#000000',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 0,

        // position and size params
        pos: { x: null, y: null },
        size: { w: null, h: null },
        boundBox: { x1: null, x2: null, y1: null, y2: null },
        isDragged: false
    }
    return paramsObj
}

function saveUserPrefsToStorage(paramsObj = gCurrMeme.elements[gCurrMeme.selectedElementIdx]) {
    if (getLastElementIdx() < 0) {
        paramsObj = _createDefaultUserPrefs()
    }

    saveToLocalStorage(DB_USER_PREFS_KEY, paramsObj)
}

function getUserPrefsFromStorage() {
    let paramsObj = getFromLocalStorage(DB_USER_PREFS_KEY)
    if (!paramsObj) paramsObj = _createDefaultUserPrefs()
    return paramsObj
}



// function updateElementSize(w, h) {
//     const element = gCurrMeme.elements[gCurrMeme.selectedElementIdx]
//     element.size.w = w
//     element.size.h = h
// }

