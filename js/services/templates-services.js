'use strict'

const gTemps = [
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
    { id: 25, type: 'general', url: 'img/meme-temps/meme (25).jpg', keywords: ['viral', 'awkward', 'classic', 'screenshot', 'funny'] }
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