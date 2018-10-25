'use strict'
function makeId() {
    var length = 6;
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getFromStorage(key) {
    var val = localStorage.getItem(key);
    return JSON.parse(val)
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function getImgById(imgId) {
    return gMemes.find(meme => {
        return meme.id === imgId;
    })
}

function getImgRatio(img) {
    var height = img.naturalHeight;
    console.log(height);

}

function moveLine(val) {
    switch (val) {
        case 'up':
            gCtx.moveTo(gMeme.texts[gCurrLine].posX, gMeme.texts[gCurrLine].posY--);
            renderCanvas();
            break;
        case 'down':
            gCtx.moveTo(gMeme.texts[gCurrLine].posX, gMeme.texts[gCurrLine].posY++);
            renderCanvas();
            break;
        case 'left':
            gCtx.moveTo(gMeme.texts[gCurrLine].posX--, gMeme.texts[gCurrLine].posY);
            renderCanvas();
            break;
        case 'right':
            gCtx.moveTo(gMeme.texts[gCurrLine].posX++, gMeme.texts[gCurrLine].posY);
            renderCanvas();
            break;
    }
}