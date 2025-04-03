'use strict'


function addSaveAndShareEventListeners() {
    // download btn
    const elDownloadBtn = document.querySelector('.download-btn')
    elDownloadBtn.addEventListener('click', () => onDownload())

    // save btn
    const elSaveBtn = document.querySelector('.save-btn')
    elSaveBtn.addEventListener('click', () => onExport('save'))

    // share btn
    const elShareBtn = document.querySelector('.share-btn')
    elShareBtn.addEventListener('click', () => onExport('share'))

    // facebook share
    const elFbShareBtn = document.querySelector('.facebook.social-share-btn')
    elFbShareBtn.addEventListener('click', () => onFacebookShare())

    // whatsapp share
    const elWpShareBtn = document.querySelector('.whatsapp.social-share-btn')
    elWpShareBtn.addEventListener('click', () => onWhatsappShare())

    // copy link
    const elClShareBtn = document.querySelector('.copy-link.social-share-btn')
    elClShareBtn.addEventListener('click', () => onCopyLinkShare())


}

function onExport(action) {
    let func
    switch (action) {
        case 'share':
            func = onOpenShareModal
            break
        case 'save':
            func = onSaveMeme
            break
    }

    const meme = getCurrMeme()

    //if link already exist just perform the action, if not, create link and then perform the action
    if (!meme.memeLink) {
        const memeDataURL = currMemeToDataURL()
        console.log("memeImg: ", memeDataURL)
        onUploadImg(memeDataURL, func)
    } else func()
}

function onOpenShareModal() {

    const backdrop = document.querySelector('.backdrop')
    const modal = document.querySelector('.share-modal')
    const img = modal.querySelector('img')

    const meme = getCurrMeme()
    img.src = meme.memeLink

    backdrop.classList.remove('m-hidden')
    modal.classList.remove('m-hidden')

    backdrop.onclick = onCloseShareModal
    modal.querySelector('.close-btn').onclick = onCloseShareModal
}

function onCloseShareModal() {
    const backdrop = document.querySelector('.backdrop')
    const modal = document.querySelector('.share-modal')

    backdrop.classList.add('m-hidden')
    modal.classList.add('m-hidden')
}

function onSaveMeme() {
    saveMeme()
    showFlashMsg('success', 'Meme was save to your gallery!')
}

function currMemeToDataURL() {
    return gElCanvas.toDataURL('image/jpeg')
}


function onFacebookShare() {
    const meme = getCurrMeme()
    const encodedUrl = encodeURIComponent(meme.memeLink)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&t=${encodedUrl}`)
}

function onWhatsappShare() {
    const meme = getCurrMeme()
    const encodedUrl = encodeURIComponent(meme.memeLink)
    window.open(`https://wa.me/?text=${encodedUrl}`)
}

function onCopyLinkShare() {
    const meme = getCurrMeme()
    navigator.clipboard.writeText(meme.memeLink)
    showFlashMsg('success', 'Link copied to clipboard')
}

function onDownload() {
    const imgContent = currMemeToDataURL()

    const a = document.createElement('a');
    a.href = imgContent;
    a.download = 'MemeStar-Meme.jpeg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showFlashMsg('success', 'Download has started')
}






// ============================== saved memes ===================================

// =======
// ======== init ========
// =======

function initSavedMemesScreen() {
    console.log('got here')

    resetCurrMeme()

    renderSavedMemesGallery()
    addMemesGalleryEventListeners()

    //present only current screen
    hideEditorScreen()
    hideGalleryScreen()
    showMemesGalleryScreen()
}

function showMemesGalleryScreen() {
    const elMemeGalleryScreen = document.querySelector('.saved-memes-screen')
    elMemeGalleryScreen.classList.remove('hidden')
}
function hideMemesGalleryScreen() {
    const elMemeGalleryScreen = document.querySelector('.saved-memes-screen')
    elMemeGalleryScreen.classList.add('hidden')
}

function renderSavedMemesGallery() {

    const memes = getMemesForDisplay()

    const elGallery = document.querySelector('.saved-memes-gallery')
    let strHtml = ''

    memes.forEach((meme, idx) => {
        strHtml += `<div class="meme-card" ><img data-idx="${idx}" src="${meme.memeLink}"></div>
        `
    })

    elGallery.innerHTML = strHtml
}

function addMemesGalleryEventListeners() {

}