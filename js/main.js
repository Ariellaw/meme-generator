'use strict'

var gCanvas;
var gCtx;

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
    renderOptions();
    createCanvas();
}

function renderImgs(value = 'All') {
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
    var ratioh = elImg.naturalHeight / elImg.naturalWidth;
    console.log('ratio', ratio)
    console.log('image proportions', 'width', elImg.naturalWidth, 'height', elImg.naturalHeight);
    console.log('screen', window.innerWidth, window.innerHeight)

    // gCanvas.height = gCanvas.height * ratio;
    if (window.innerWidth > elImg.naturalWidth) {
        gCanvas.width = elImg.naturalWidth;
    } else {
        gCanvas.width = window.innerWidth * .9;
    }
    gCanvas.height = gCanvas.width * ratioh * .85;

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
    el.placeholder = el.value;
    el.value = '';

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
    // console.log(event);
    var e = $('.canvas')
    var offset = e.offset();
    console.log({ offset, clientX: event.clientX, clientY: event.clientY });

    let x = event.clientX - offset.left;
    let y = event.clientY - offset.top;
    switch (gDraw.brush) {
        case 'Font':
            gDraw.font.posX = +x;
            gDraw.font.posY = +y;
            renderCanvas()
            break;

        default:
            break;
    }
}

function createCanvas() {
    gCanvas = document.querySelector('.canvas');
    gCanvas.width = window.innerWidth - 100;
    gCtx = gCanvas.getContext('2d');

}

function openEditor() {

    $('.font-type').val('Font')
    // $('.edit-meme-container').show();
    document.querySelector('.edit-meme-container').style.display = 'grid'
    document.querySelector('.editor-btn-container').style.display = 'flex'
    // $('.editor-btn-container').show();
    $('.meme-container').hide();
    $('.keyword-selector').hide();
}

function onCloseEditor() {
    $('.top-txt').val('');
    $('.top-txt').hide();
    $('.edit-meme-container').hide();
    $('.editor-btn-container').hide();
    $('.meme-container').show();
    $('.keyword-selector').show();
}

function getKeyWords() {
    var gImgs = getMemes();
    console.log('Images', gImgs);
    var allKeyWords = [];
    gImgs.forEach(img => {
        var keyWords = img.keywords;
        keyWords.forEach(word => {
            if (allKeyWords.indexOf(word) === -1) {
                allKeyWords.push(word);
            }
        })
    })
    return allKeyWords;
}

function renderOptions(){
    var keyWords = getKeyWords();
    var strHTML = keyWords.map(word =>{
        return `<option value=${word}>`
    })
    document.querySelector('#keyword-selector').innerHTML = strHTML;
}