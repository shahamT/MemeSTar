'use strict'

const gSavedMemes = [

]

let gCurrMeme =
{
    id: null,
    selectedTempId: 5,
    selectedElementIdx: 0,
    elements: [
        {
            type: 'text',

            // text params
            txt: 'I sometimes eat Falafel',
            fontSize: 40,
            fontFamily: 'Arial',
            lineWidth: 2,
            strokeStyle: 'black',
            fillStyle: 'red',
            textAlign: 'center',
            textBaseline: 'middle',

            //sticker params
            stickerId: null,

            // shadow params
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 4,
            shadowOffsetY: 4,
            shadowBlur: 3,

            // position params
            pos: { x: null, y: null },


            // dimens: {width,height}
        },

        {
            type: 'text',

            // text params
            txt: 'b;ah blah',
            fontSize: 40,
            fontFamily: 'Arial',
            lineWidth: 2,
            strokeStyle: 'black',
            fillStyle: 'red',
            textAlign: 'center',
            textBaseline: 'middle',

            //sticker params
            stickerId: null,

            // shadow params
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 4,
            shadowOffsetY: 4,
            shadowBlur: 3,

            // position params
            pos: { x: 20, y: 50 },


            // dimens: {width,height}
        }

    ]
}

function updateElement(paramObj) {
    const element = gCurrMeme.elements[gCurrMeme.selectedElementIdx]
    console.log(paramObj)
    element[paramObj.param] = paramObj.val
    console.log(element)
}


