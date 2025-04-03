'use strict'


const gSavedMemes = [

]

function saveMeme() {


}



function onUploadImg(memeDataURL, func) {
    function onSuccess(uploadedImgUrl) {
        const meme = getCurrMeme()
        meme.memeLink = uploadedImgUrl
        func()
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




function deleteMeme(idx) {

}


