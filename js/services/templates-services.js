'use strict'

const gTemps = [
    { id: 1, type: 'general', url: 'img/meme-templates/1.jpg', keywords: [] },
    { id: 2, type: 'general', url: 'img/meme-templates/2.jpg', keywords: [] },
    { id: 3, type: 'general', url: 'img/meme-templates/3.jpg', keywords: [] },
    { id: 4, type: 'general', url: 'img/meme-templates/4.jpg', keywords: [] },
    { id: 5, type: 'general', url: 'img/meme-templates/5.jpg', keywords: [] },
    { id: 6, type: 'general', url: 'img/meme-templates/6.jpg', keywords: [] },
    { id: 7, type: 'general', url: 'img/meme-templates/7.jpg', keywords: [] },
    { id: 8, type: 'general', url: 'img/meme-templates/8.jpg', keywords: [] },
    { id: 9, type: 'general', url: 'img/meme-templates/9.jpg', keywords: [] },
    { id: 10, type: 'general', url: 'img/meme-templates/10.jpg', keywords: [] },
    { id: 11, type: 'general', url: 'img/meme-templates/11.jpg', keywords: [] },
    { id: 12, type: 'general', url: 'img/meme-templates/12.jpg', keywords: [] },
    { id: 13, type: 'general', url: 'img/meme-templates/13.jpg', keywords: [] },
    { id: 14, type: 'general', url: 'img/meme-templates/14.jpg', keywords: [] },
    { id: 15, type: 'general', url: 'img/meme-templates/15.jpg', keywords: [] },
    { id: 16, type: 'general', url: 'img/meme-templates/16.jpg', keywords: [] },
    { id: 17, type: 'general', url: 'img/meme-templates/17.jpg', keywords: [] },
    { id: 18, type: 'general', url: 'img/meme-templates/18.jpg', keywords: [] }
]

function getTempById(id) {
    return gTemps.find(temp => temp.id === id)
}

function getTempsForDisplay(params){
    return gTemps.filter(temp => {
        let isValid = false
        isValid = temp.type === params.type ? true : false
        // TODO add search filter

        return isValid
    })
}