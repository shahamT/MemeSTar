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

function onUploadImg(imgDataURL, func, imgType, elBtn = null,) {
    function onSuccess(uploadedImgUrl) {

        switch (imgType) {
            case 'meme':
            case 'template':
                console.log('got here')

                const meme = getCurrMeme()
                meme.memeLink = uploadedImgUrl
                func(uploadedImgUrl)
                break
            case 'sticker':
                func(uploadedImgUrl)
                break
        }

        //remove inline loading effect
        if (elBtn) elBtn.classList.remove('inline-loader')
    }
    uploadImg(imgDataURL, onSuccess)
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





