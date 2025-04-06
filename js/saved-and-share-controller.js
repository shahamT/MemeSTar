'use strict'
var gIsExporting = false

// ======== adding event listeners ========
// =======
// =======

function addSaveAndShareEventListeners() {
    // download btn
    const elDownloadBtn = document.querySelector('.download-btn')
    elDownloadBtn.addEventListener('click', () => onDownload())

    // save btn
    const elSaveBtn = document.querySelector('.save-btn')
    elSaveBtn.addEventListener('click', (ev) => onExport('save', ev.target))

    // share btn
    const elShareBtn = document.querySelector('.share-btn')
    elShareBtn.addEventListener('click', (ev) => onExport('share', ev.target))

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

// ======== save and share events ========

function onExport(action, elBtn) {
    //inline loading effect
    elBtn.classList.add('inline-loader')

    const meme = getCurrMeme()
    const selectedElIdx = meme.selectedElementIdx

    let func
    switch (action) {
        case 'share':
            func = onOpenShareModal
            break
        case 'save':
            func = onSaveMeme
            break
    }

    //if link already exist just perform the action, if not, create link and then perform the action
    if (!meme.memeLink) {
        //remove bound box before exporting
        gIsExporting = true
        renderMeme()

        //timeout to allow the canvas to render without bouding box before exporting
        setTimeout(() => {
            const memeDataURL = currMemeToDataURL()
            onUploadImg(memeDataURL, func, elBtn)

            //place back bound box before exporting
            gIsExporting = false
            renderMeme()

        }, 100)

    } else {
        func()
        //remove inline loading effect
        elBtn.classList.remove('inline-loader')
    }




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
    //remove bound box before downloading
    gIsExporting = true
    renderMeme()

    //timeout to allow the canvas to render without bouding box before exporting
    
    setTimeout(() => {
        const imgContent = currMemeToDataURL() 
        gIsExporting = false
        renderMeme()
    
        const a = document.createElement('a');
        a.href = imgContent;
        a.download = 'MemeStar-Meme.jpeg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showFlashMsg('success', 'Download has started')
    }, 100);
}

function currMemeToDataURL() {
    return gElCanvas.toDataURL('image/jpeg')
}


// ======== saved memes gallery ========
// =======
// =======
// =======
// ======== init ========
// =======

function initSavedMemesScreen() {

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

    if (memes.length > 0){
    memes.forEach((meme, idx) => {
        strHtml += `<div class="meme-card"><img data-idx="${idx}" src="${meme.memeLink}">
                    <div class="meme-card-btns">
                    <button class="delete-btn red-btn" data-meme-idx="${idx}"></button>
                    <button class="edit-btn accent-btn" data-meme-idx="${idx}"></button>
                    <button class="download-btn accent-btn" data-meme-idx="${idx}"></button>
                    <button class="share-btn accent-btn" data-meme-idx="${idx}"></button>
                    </div>
                    </div>
                    `
    })} else {
         strHtml += `<div class="empty-state-container" ><img class="empty-state-img" src="img/empty-states/saved-memes-empty-state.png"></div>`
    }

    elGallery.innerHTML = strHtml
}

function addMemesGalleryEventListeners() {
    //edit btns
    const elEditBtns = document.querySelectorAll('.meme-card .edit-btn')
    elEditBtns.forEach(elBtn => {
        elBtn.addEventListener('click', (ev) => onMemeBtnClick(ev.target, 'edit'))
    })

    //download btns
    const elSaveBtns = document.querySelectorAll('.meme-card .download-btn')
    elSaveBtns.forEach(elBtn => {
        elBtn.addEventListener('click', (ev) => onMemeBtnClick(ev.target, 'download'))
    })

    //share btns
    const elShareBtns = document.querySelectorAll('.meme-card .share-btn')
    elShareBtns.forEach(elBtn => {
        elBtn.addEventListener('click', (ev) => onMemeBtnClick(ev.target, 'share'))
    })

    //delete btns
    const elDeleteBtns = document.querySelectorAll('.meme-card .delete-btn')
    elDeleteBtns.forEach(elBtn => {
        elBtn.addEventListener('click', (ev) => onDeleteSavedMeme(ev.target))
    })
}


// ======== gallery events ========

function onMemeBtnClick(elBtn, action) {
    const memeIdx = elBtn.dataset.memeIdx
    const clone = structuredClone(gSavedMemes[memeIdx])
    gCurrMeme = clone
    switch (action) {
        case 'edit':
            initEditorScreen()
            break
        case 'download':
            onDownloadSavedMeme()
            break
        case 'share':
            onExport('share', elBtn)
            break
    }

}

function onDeleteSavedMeme(elBtn) {
    const memeIdx = elBtn.dataset.memeIdx
    renderConfirmDelete(memeIdx)
    onOpenGModal(memeIdx)
}

function onDownloadSavedMeme() {
    const meme = getCurrMeme()
    const imgURL = meme.memeLink

    const a = document.createElement('a');
    a.href = imgURL;
    a.download = 'MemeStar-Meme.jpeg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showFlashMsg('success', 'Download has started')
}

function onOpenGModal(memeIdx) {
    console.log("memeIdx: ", memeIdx)

    const backdrop = document.querySelector('.backdrop')
    const modal = document.querySelector('.g-modal')

    backdrop.classList.remove('m-hidden')
    modal.classList.remove('m-hidden')

    backdrop.onclick = onCloseGModal

    modal.querySelector('.cancel-btn').onclick = onCloseGModal
    modal.querySelector('.confirm-btn').addEventListener('click', () => {
        console.log("memeIdx: ", memeIdx)
        onCloseGModal()
        deleteMeme(memeIdx)
        renderSavedMemesGallery()
        addMemesGalleryEventListeners()
        showFlashMsg('success', 'Meme was deleted')

    })
}

function onCloseGModal() {
    const backdrop = document.querySelector('.backdrop')
    const modal = document.querySelector('.g-modal')

    backdrop.classList.add('m-hidden')
    modal.classList.add('m-hidden')
}

function renderConfirmDelete(memeIdx) {
    var elModal = document.querySelector(`.g-modal`)
    elModal.innerHTML = `<p>Delete this meme? </p>
                        <div class="btns-container">
                            <button class="cancel-btn secondary-btn">Cancel</button>
                            <button class="confirm-btn red-btn">Delete</button>
                        </div>`
}