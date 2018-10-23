'use strict'

var gDraw = {
    img: 'img/002.jepg',
    text: 'Try me',
    font: 'impact'
}

function init() {
    createImgs();
    renderImgs();
    createCanvas();
}

function renderImgs(value = 'all') {
    var elMemeContainer = document.querySelector('.meme-container');
    var memeImgs = filterMemeImages(value);
    var strHTML = memeImgs.map(img => {
        return `<img onclick="onClickImg(this)" class="memeImg" id="${img.id}" src="${img.url}" >`
    })
    elMemeContainer.innerHTML = strHTML;
}

function onClickImg(elImg) {
    var meme = getImgById(elImg.id);
    gDraw.img = meme;
    renderCanvas()
    openEditor(meme);
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
    // $(".canvas").outerHeight($(window).height()-$(".canvas").offset().top- Math.abs($(".canvas").outerHeight(true) - $(".canvas").outerHeight()));
    gCtx.drawImage(currMeme, 0, 0, gCanvas.width, gCanvas.height,     // source rectangle
        0, 0, currMeme.width, currMeme.height)
    // gCtx.drawImage(currMeme, 10, 10);
}

function drawTxt() {
    gCtx.font = "50px Impact";
    gCtx.fillText(gDraw.text, 70, 70);
    gCtx.stroke();
}

function onFilterMemeImgs(el) {
    setFilter(el.value);
    renderImgs(el.value);
    el.placeholder = el.value;
    el.value = '';
}
// Use the common font meme "impact" with stroke/shadow
