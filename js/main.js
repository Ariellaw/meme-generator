'use strict'

var gDraw = {
    img: 'img/002.jepg',
    text: 'Try me',
    font: {
        type: 'Impact',
        posX: 70,
        posY: 70,
    },
    fontSize: '20',
    fontColor: 'white',
    brush: 'Font'
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
        return `<div class="memeimg-container"><img onclick="onClickImg(this,'${img.id}')" class="memeImg" id="${img.id}" src="${img.url}" ></div>`
    })
    elMemeContainer.innerHTML = strHTML;
}

function onClickImg(elImg, imgId) {
    var memeImg = getImgById(imgId);
    var ratio = elImg.naturalWidth / elImg.naturalHeight;
    gCanvas.height = gCanvas.height * ratio;
    if (window.innerWidth > elImg.naturalWidth) {
        gCanvas.height = elImg.naturalHeight;
    }
    // getImgRatio(elImg)

    gDraw.img = memeImg;


    renderCanvas()
    openEditor();
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
    gCtx.drawImage(currMeme, 0, 0, gCanvas.width, gCanvas.height);
}

function drawTxt() {
    gCtx.fillStyle = gDraw.fontColor;
    gCtx.font = `${gDraw.fontSize}px ${gDraw.font.type}`;
    gCtx.fillText(gDraw.text, gDraw.font.posX, gDraw.font.posY);
    gCtx.strokeText(gDraw.text, 100, 100);
}

function onFilterMemeImgs(el) {
    setFilter(el.value);
    renderImgs(el.value);
}

function onChangeFontSize(val) {
    console.log(gDraw.fontSize);
    if (val === '-') gDraw.fontSize = gDraw.fontSize - 2;
    else gDraw.fontSize = gDraw.fontSize + 2;
}

function onChangeFont(val) {
    gDraw.font = val;
}

function onClickCanvas(event) {
    console.log(event);
    
    let x = event.screenX;
    let y = event.screenY;
    switch (gDraw.brush) {
        case 'Font':
            gDraw.font.posX = +x;
            gDraw.font.posY = +y;
            renderCanvas()
            break;

        default:
            break;
    }
    console.log('x:', x, 'y', y);
}