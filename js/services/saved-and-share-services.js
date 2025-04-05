'use strict'

const DB_SAVED_MEMES_KEY = 'SAVED_MEMES'

var gSavedMemes = [

]

// ======== crudl and more ========

function saveMeme() {
    const clone = structuredClone(getCurrMeme())
    gSavedMemes.unshift(clone)
    saveMemesToStorage()
}

function getMemesForDisplay() {
    return gSavedMemes
}

function deleteMeme(idx) {
    console.log("idx: ", idx)
    gSavedMemes.splice(idx, 1)
    saveMemesToStorage()
}

function saveMemesToStorage() {
    saveToLocalStorage(DB_SAVED_MEMES_KEY, gSavedMemes)
}

function getMemesFromStorage() {
    gSavedMemes = getFromLocalStorage(DB_SAVED_MEMES_KEY)
    if (gSavedMemes === null) gSavedMemes = []

}



// ======== Save and Share ========

function onUploadImg(memeDataURL, func, elBtn = null) {
    function onSuccess(uploadedImgUrl) {
        const meme = getCurrMeme()
        meme.memeLink = uploadedImgUrl
        func(uploadedImgUrl)
        //remove inline loading effect
        if (elBtn) elBtn.classList.remove('inline-loader')
    }
    uploadImg(memeDataURL, onSuccess)
}

async function uploadImg(imgData, onSuccess) {

    const CLOUD_NAME = 'webify'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData()
    formData.append('file', imgData)
    formData.append('upload_preset', 'webify')
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        onSuccess(data.secure_url)
    } catch (err) {
        console.log(err)
    }
}





