'use strict'

console.log('main');

function init() {
    createImgs();
    renderImgs();
}
function renderImgs() {
    var elMemeContainer = document.querySelector('.meme-container');
    var memeImgs = getMemes();
    console.log(memeImgs);
    var strHTML = memeImgs.map(img => {
        return `<img onclick="onClickImg(${img.id})" class="memeImg" id=${img.id} src=${img.url} >`
    })
    console.log(strHTML);
    elMemeContainer.innerHTML = strHTML;
}

var gMemes = [{ id: 1, url: 'img/popo.jpg', keywords: ['happy'] }];
var gMeme = {
    selectedImgId: 5,
    txts: [
        {
            line: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}



function onClickImg(imgId) {
    var meme = getImgById(`${imgId}`);
    // console.log(meme.url);
    
    createCanvas(meme)
    // openEditor();
}

function getImgById(imgId) {
    return gMemes.find(meme => {
        return meme.id === +imgId;
    })
}