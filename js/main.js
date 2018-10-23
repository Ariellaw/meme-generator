'use strict'

console.log('main');

var gDraw = {
    img: 'img/002.jepg',
    text: 'Try me',
    // font: ''
}

function init() {
    createImgs();
    renderImgs();
    createCanvas();
}
function renderImgs(value = 'all') {
    var elMemeContainer = document.querySelector('.meme-container');
    var memeImgs = filterMemeImages(value);
    console.log(memeImgs);
    var strHTML = memeImgs.map(img => {
        return `<img onclick="onClickImg('${img.id}')" class="memeImg" id="${img.id}" src="${img.url}" >`
    })
    elMemeContainer.innerHTML = strHTML;
}

function onClickImg(imgId) {
    var memeImg = getImgById(imgId);
    console.log('image size', memeImg, memeImg.url.clientWidth, memeImg.clientHeight)
    gDraw.img = memeImg;
    renderCanvas()
    openEditor(memeImg);
}

function onWrighting(ev) {
    var txt = $('.top-txt').val();
    gDraw.text = txt;
    renderCanvas()
}

function renderCanvas() {
    drawImg();
    drawTxt()
}

function drawImg() {
    var currMeme = document.getElementById(`${gDraw.img.id}`);
    gCtx.drawImage(currMeme, 10, 10);
}

function drawTxt() {
    gCtx.font = "50px Ariel";
    gCtx.fillText(gDraw.text, 70, 70);
    gCtx.stroke();
}

function onFilterMemeImgs(el) {
    setFilter(el.value);
    renderImgs(el.value);
}



