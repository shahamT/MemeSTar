'use strict'

var gNxtTempId = null

const gTemps = [
    { id: 26, type: 'general', url: 'img/meme-temps/memeStav.jpg', keywords: ['funny', 'meme', 'humor', 'classic', 'reaction'] },
    { id: 27, type: 'general', url: 'img/meme-temps/memeChen.png', keywords: ['viral', 'trendy', 'office', 'caption', 'screenshot'] },
    { id: 28, type: 'general', url: 'img/meme-temps/memeRisan.jpg', keywords: ['sarcastic', 'awkward', 'internet', 'relatable', 'happy'] },
    { id: 29, type: 'general', url: 'img/meme-temps/memeYaron.jpg', keywords: ['angry', 'confused', 'cute', 'pop culture', 'unexpected'] },
    { id: 30, type: 'general', url: 'img/meme-temps/memeSharon.png', keywords: ['angry', 'confused', 'cute', 'pop culture', 'unexpected'] },
    { id: 31, type: 'general', url: 'img/meme-temps/memeStav-empty.jpg', keywords: ['funny', 'meme', 'humor', 'classic', 'reaction'] },
    { id: 32, type: 'general', url: 'img/meme-temps/memeChen-empty.png', keywords: ['viral', 'trendy', 'office', 'caption', 'screenshot'] },
    { id: 33, type: 'general', url: 'img/meme-temps/memeRisan-empty.jpg', keywords: ['sarcastic', 'awkward', 'internet', 'relatable', 'happy'] },
    { id: 34, type: 'general', url: 'img/meme-temps/memeYaron-empty.jpg', keywords: ['angry', 'confused', 'cute', 'pop culture', 'unexpected'] },
    { id: 35, type: 'general', url: 'img/meme-temps/memeSharon-empty.png', keywords: ['angry', 'confused', 'cute', 'pop culture', 'unexpected'] },
    { id: 1, type: 'general', url: 'img/meme-temps/meme (1).jpg', keywords: ['funny', 'meme', 'humor', 'classic', 'reaction'] },
    { id: 2, type: 'general', url: 'img/meme-temps/meme (2).jpg', keywords: ['viral', 'trendy', 'office', 'caption', 'screenshot'] },
    { id: 3, type: 'general', url: 'img/meme-temps/meme (3).jpg', keywords: ['sarcastic', 'awkward', 'internet', 'relatable', 'happy'] },
    { id: 4, type: 'general', url: 'img/meme-temps/meme (4).jpg', keywords: ['angry', 'confused', 'cute', 'pop culture', 'unexpected'] },
    { id: 5, type: 'general', url: 'img/meme-temps/meme (5).jpg', keywords: ['weird', 'classic', 'celebrity', 'facepalm', 'retro'] },
    { id: 6, type: 'general', url: 'img/meme-temps/meme (6).jpg', keywords: ['funny', 'meme', 'viral', 'trendy', 'reaction'] },
    { id: 7, type: 'general', url: 'img/meme-temps/meme (7).jpg', keywords: ['screenshot', 'office', 'internet', 'classic', 'meme'] },
    { id: 8, type: 'general', url: 'img/meme-temps/meme (8).jpg', keywords: ['caption', 'sarcastic', 'awkward', 'happy', 'funny'] },
    { id: 9, type: 'general', url: 'img/meme-temps/meme (9).jpg', keywords: ['reaction', 'viral', 'meme', 'office', 'trendy'] },
    { id: 10, type: 'general', url: 'img/meme-temps/meme (10).jpg', keywords: ['classic', 'celebrity', 'facepalm', 'retro', 'pop culture'] },
    { id: 11, type: 'general', url: 'img/meme-temps/meme (11).jpg', keywords: ['funny', 'meme', 'humor', 'caption', 'screenshot'] },
    { id: 12, type: 'general', url: 'img/meme-temps/meme (12).jpg', keywords: ['sarcastic', 'viral', 'office', 'relatable', 'awkward'] },
    { id: 13, type: 'general', url: 'img/meme-temps/meme (13).jpg', keywords: ['trendy', 'internet', 'happy', 'meme', 'reaction'] },
    { id: 14, type: 'general', url: 'img/meme-temps/meme (14).jpg', keywords: ['classic', 'funny', 'caption', 'viral', 'retro'] },
    { id: 15, type: 'general', url: 'img/meme-temps/meme (15).jpg', keywords: ['celebrity', 'facepalm', 'awkward', 'pop culture', 'meme'] },
    { id: 16, type: 'general', url: 'img/meme-temps/meme (16).jpg', keywords: ['funny', 'sarcastic', 'meme', 'trendy', 'reaction'] },
    { id: 17, type: 'general', url: 'img/meme-temps/meme (17).jpg', keywords: ['classic', 'office', 'internet', 'screenshot', 'viral'] },
    { id: 18, type: 'general', url: 'img/meme-temps/meme (18).jpg', keywords: ['caption', 'happy', 'relatable', 'meme', 'awkward'] },
    { id: 19, type: 'general', url: 'img/meme-temps/meme (19).jpg', keywords: ['celebrity', 'retro', 'classic', 'funny', 'trendy'] },
    { id: 20, type: 'general', url: 'img/meme-temps/meme (20).jpg', keywords: ['meme', 'office', 'reaction', 'viral', 'humor'] },
    { id: 21, type: 'general', url: 'img/meme-temps/meme (21).jpg', keywords: ['sarcastic', 'awkward', 'internet', 'screenshot', 'happy'] },
    { id: 22, type: 'general', url: 'img/meme-temps/meme (22).jpg', keywords: ['classic', 'funny', 'caption', 'viral', 'meme'] },
    { id: 23, type: 'general', url: 'img/meme-temps/meme (23).jpg', keywords: ['pop culture', 'celebrity', 'facepalm', 'retro', 'humor'] },
    { id: 24, type: 'general', url: 'img/meme-temps/meme (24).jpg', keywords: ['trendy', 'office', 'reaction', 'meme', 'caption'] },
    { id: 25, type: 'general', url: 'img/meme-temps/meme (25).jpg', keywords: ['viral', 'awkward', 'classic', 'screenshot', 'funny', '1234'] }
]

const DB_USER_TEMPLATES_KEY = 'USER_TEMPLATES'


// ======== handle user templates (local storage) ========

function setGNextId() {
    let lastId = gTemps.reduce((highest, temp) => {
        if (temp.id > highest) highest = temp.id
        return highest
    }, -Infinity)
    gNxtTempId = lastId+1
}

function addUserTempsToGTemps() {
    const userTemps = getuserTempsFromStorage()
    if (!userTemps) return

    gTemps.push(...userTemps)
}


// ======== crudl and more========

function getTempById(id) {
    return gTemps.find(temp => temp.id === id)
}

function getTempsForDisplay(params) {
    let tempsForDisplay = gTemps

    tempsForDisplay = tempsForDisplay.filter(temp => {
        // type match
        const isTypeValid = temp.type === params.type ? true : false

        // search match
        let isSearchValid = true
        if (params.search) {
            const searchMatch = temp.keywords.findIndex((key) => key.includes(params.search))
            isSearchValid = searchMatch === -1 ? false : true
        }

        const isValid = (isTypeValid && isSearchValid)
        return isValid
    })

    return tempsForDisplay
}

function addTemplate(imgUrl) {
    const tempId = gNxtTempId

    gTemps.push({
        id: gNxtTempId++,
        type: 'user',
        url: imgUrl,
        keywords: []
    })
    saveUserTempsToStorage()

    return tempId
}

function saveUserTempsToStorage() {
    // save only user templates
    const userTemps = gTemps.filter(temp => temp.type === 'user')
    saveToLocalStorage(DB_USER_TEMPLATES_KEY, userTemps)
}

function getuserTempsFromStorage() {
    let userTemps = getFromLocalStorage(DB_USER_TEMPLATES_KEY)
    return userTemps
}



// ====== keywords cloud managment =======

const DB_KEYWORDS_SEARCHES_KEY = 'KEYWORDS_SEARCHES'
const gKeywordsSearches = getKeywordsCountFromStorage()


function getKeywordsForDisplay(num) {
    // arrange keywords in array and sort
    let keywords = []
    for (let keyword in gKeywordsSearches) {
        keywords.push({ keyword, amount: gKeywordsSearches[keyword] })
    }

    keywords.sort((a, b) => b.amount - a.amount)

    keywords = keywords.slice(0, num)

    keywords.forEach(keyword => {
        keyword.order = getRndIntIncludeMax(0, 100)
    })

    keywords.sort((a, b) => a.order - b.order)

    return keywords
}

function countKeyword(keyword) {
    if (!gKeywordsSearches[keyword]) {
        gKeywordsSearches[keyword] = 0
    }
    gKeywordsSearches[keyword] += 1
    saveKeywordsCountToStorage()
    console.log("gKeywordsSearches: ", gKeywordsSearches)
}

function saveKeywordsCountToStorage() {
    saveToLocalStorage(DB_KEYWORDS_SEARCHES_KEY, gKeywordsSearches)
}

function getKeywordsCountFromStorage() {
    let keywordsObj = getFromLocalStorage(DB_KEYWORDS_SEARCHES_KEY)
    if (!keywordsObj) keywordsObj = _createDefaultKeywordsSearches()
    return keywordsObj
}

function _createDefaultKeywordsSearches() {
    return {
        viral: 6,
        funny: 8,
        trendy: 5,
        classic: 6,
        celebrity: 10,
        facepalm: 15,
        retro: 4,
        awkward: 3
    }
}