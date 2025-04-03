'use strict'

const DB_USER_PREFS_KEY = 'USER_PREFS'
const DB_SAVED_MEMES_KEY = 'SAVED_MEMES'

var gCurrMeme



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

function getCurrMeme() {
    return gCurrMeme
}

function updateCurrMeme(paramObj) {
    gCurrMeme[paramObj.param] = paramObj.val
}

function addElement(type) {

    //create default element with user prefs
    const newElementObj = getUserPrefsFromStorage()
    newElementObj.type = type
    newElementObj.pos = { x: null, y: null }
    if (type === 'text') {
        newElementObj.txt = 'Your Text'

        switch (getAmountOfElementsByType('text')) {
            case 0:
                newElementObj.pos.y = 40
                break
            case 1:
                newElementObj.pos.y = gElCanvas.height - 40
                break
        }
    }

    gCurrMeme.elements.push(newElementObj)

    console.log("gCurrMeme: ", gCurrMeme)

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




function _createDefaultUserPrefs() {
    const paramsObj = {

        type: null,

        // text params
        txt: '',
        fontSize: 32,
        fontFamily: 'Arial',
        lineWidth: 0,
        strokeStyle: 'rgb(0, 0, 0)',
        fillStyle: 'rgb(255, 255, 255)',
        textAlign: 'center',
        textBaseline: 'middle',

        //sticker params
        stickerId: null,

        // shadow params
        shadowColor: 'rgba(0, 0, 0, 0.6)',
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
function getSelectedElement() {
    if(gCurrMeme.elements.length === 0) return null
    return gCurrMeme.elements[gCurrMeme.selectedElementIdx]
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

function updateElementPos(x, y) {
    const element = getSelectedElement()
    console.log("x: ", x)
    console.log("y: ", y)
    element.pos.x += x
    element.pos.y += y
}