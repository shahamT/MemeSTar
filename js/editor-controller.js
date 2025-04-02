'use strict'

let gCurrMeme =
{
    id: null,
    selectedTempId: 5,
    selectedLineIdx: 0,
    elements: [
        {
            type: 'Text',
            txt: 'I sometimes eat Falafel',
            stickerId: null,
            size: 20,
            color: 'red',
            // pos: {x,y},
            // dimens: {width,height}
        }
    ]
}

let gElCanvas
let gCtx

window.onload = () => oninit()


function oninit() {
    initCanvas()
    renderMeme()
}

function initCanvas() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
}


function renderMeme() {
    const tempId = gCurrMeme.selectedTempId;
    const temp = getTempById(tempId);

    const tempURL = temp.url;
    const img = new Image();

    img.onload = () => {
        const width = gElCanvas.width;
        const height = gElCanvas.height;
        gCtx.drawImage(img, 0, 0, width, height);
    };

    img.src = tempURL;
}
