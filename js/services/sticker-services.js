'use strict'

var gNxtStickerId = null

const gStickers = [
    { id: 1, type: 'general', url: 'img/stickers/sticker (1).png', keywords: ['funny', 'meme', 'humor', 'classic', 'reaction'] },
    { id: 2, type: 'general', url: 'img/stickers/sticker (2).png', keywords: ['viral', 'trendy', 'office', 'caption', 'screenshot'] },
    { id: 3, type: 'general', url: 'img/stickers/sticker (3).png', keywords: ['sarcastic', 'awkward', 'internet', 'relatable', 'happy'] },
    { id: 4, type: 'general', url: 'img/stickers/sticker (4).png', keywords: ['angry', 'confused', 'cute', 'pop culture', 'unexpected'] },
    { id: 5, type: 'general', url: 'img/stickers/sticker (5).png', keywords: ['weird', 'classic', 'celebrity', 'facepalm', 'retro'] },
    { id: 6, type: 'general', url: 'img/stickers/sticker (6).png', keywords: ['funny', 'meme', 'viral', 'trendy', 'reaction'] },
    { id: 7, type: 'general', url: 'img/stickers/sticker (7).png', keywords: ['screenshot', 'office', 'internet', 'classic', 'meme'] },
    { id: 8, type: 'general', url: 'img/stickers/sticker (8).png', keywords: ['caption', 'sarcastic', 'awkward', 'happy', 'funny'] },
    { id: 9, type: 'general', url: 'img/stickers/sticker (9).png', keywords: ['reaction', 'viral', 'meme', 'office', 'trendy'] },
    { id: 10, type: 'general', url: 'img/stickers/sticker (10).png', keywords: ['classic', 'celebrity', 'facepalm', 'retro', 'pop culture'] },
    { id: 11, type: 'general', url: 'img/stickers/sticker (11).png', keywords: ['funny', 'meme', 'humor', 'caption', 'screenshot'] },
    { id: 12, type: 'general', url: 'img/stickers/sticker (12).png', keywords: ['sarcastic', 'viral', 'office', 'relatable', 'awkward'] },
    // { id: 13, type: 'general', url: 'img/stickers/sticker (1).png', keywords: ['trendy', 'internet', 'happy', 'meme', 'reaction'] },
    // { id: 14, type: 'general', url: 'img/stickers/sticker (1).png', keywords: ['classic', 'funny', 'caption', 'viral', 'retro'] },
    // { id: 15, type: 'general', url: 'img/stickers/sticker (1).png', keywords: ['celebrity', 'facepalm', 'awkward', 'pop culture', 'meme'] },
    // { id: 16, type: 'general', url: 'img/stickers/sticker (1).png', keywords: ['funny', 'sarcastic', 'meme', 'trendy', 'reaction'] },
    // { id: 17, type: 'general', url: 'img/stickers/sticker (1).png', keywords: ['classic', 'office', 'internet', 'screenshot', 'viral'] },
    // { id: 18, type: 'general', url: 'img/stickers/sticker (1).png', keywords: ['caption', 'happy', 'relatable', 'meme', 'awkward'] },
    // { id: 19, type: 'general', url: 'img/stickers/sticker (1).png', keywords: ['celebrity', 'retro', 'classic', 'funny', 'trendy'] },
    // { id: 20, type: 'general', url: 'img/stickers/sticker (1).png', keywords: ['meme', 'office', 'reaction', 'viral', 'humor'] },
]

const DB_USER_STICKERS_KEY = 'USER_STICKERS'


// ======== handle user stickers (local storage) ========

function setGNextStickerId() {
    let lastId = gStickers.reduce((highest, sticker) => {
        if (sticker.id > highest) highest = sticker.id
        return highest
    }, -Infinity)
    gNxtStickerId = lastId + 1
}

function addUserStickersToGStickers() {
    const userStickers = getuserStickersFromStorage()
    if (!userStickers) return

    gStickers.push(...userStickers)
}


// ======== crudl and more ========

function getStickerById(id) {
    return gStickers.find(sticker => sticker.id === id)
}

function getStickersForDisplay(params) {
    let stickersForDisplay = gStickers

    stickersForDisplay = stickersForDisplay.filter(sticker => {
        // type match
        let isTypeValid = true

        if (params.type) {
            isTypeValid = sticker.type === params.type ? true : false
        }

        // search match
        let isSearchValid = true
        if (params.search) {
            const searchMatch = sticker.keywords.findIndex((key) => key.includes(params.search))
            isSearchValid = searchMatch === -1 ? false : true
        }

        const isValid = (isTypeValid && isSearchValid)
        return isValid
    })

    return stickersForDisplay
}

function addSticker(imgUrl) {
    const stickerId = gNxtStickerId
    gStickers.unshift({
        id: gNxtStickerId++,
        type: 'user',
        url: imgUrl,
        keywords: []
    })
    saveUserStickersToStorage()

    return stickerId
}

function saveUserStickersToStorage() {
    // save only user templates
    const userStickers = gStickers.filter(sticker => sticker.type === 'user')
    console.log("userStickers: ", userStickers)
    saveToLocalStorage(DB_USER_STICKERS_KEY, userStickers)
}

function getuserStickersFromStorage() {
    let userStickers = getFromLocalStorage(DB_USER_STICKERS_KEY)
    return userStickers
}
