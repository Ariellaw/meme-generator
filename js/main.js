'use strict'

var gCanvas;
var gCtx;
var gCurrLine = 0;
var gCurrMeme;

var gMeme = {
    img: 'img/002.jepg',
    texts: [
        {
            line: 'Place the text and start wrighting !',
            type: 'Impact',
            posX: 70,
            posY: 70,
            size: '30',
            shadow: true,
            color: 'white',
        },
    ],
    brush: 'Font'
}

function init() {
    createImgs();
    renderImgs();
    renderOptions();
    createCanvas();
}

function renderImgs(value = 'all') {
    var elMemeContainer = document.querySelector('.meme-container');
    var memeImgs = filterMemeImages(value);
    var strHTML = memeImgs.map(img => {
        return `<div class="memeimg-container"><img onclick="onClickImg(this,'${img.id}')" class="memeImg" id="${img.id}" src="${img.url}" ></div>`
    })
    elMemeContainer.innerHTML = strHTML.join('');
}

function onClickImg(elImg, imgId) {
    // var memeImg = getImgById(imgId);
    var ratio = elImg.naturalHeight / elImg.naturalWidth;

    if (window.innerWidth > elImg.naturalWidth) {
        gCanvas.width = elImg.naturalWidth;
    } else {
        gCanvas.width = window.innerWidth * .9;
    }
    gCanvas.height = gCanvas.width * ratio * .85;
    gMeme.img = elImg;
    renderCanvas()
    openEditor();
}

function onWrighting(ev) {
    var txt = $('.top-txt').val();
    gMeme.texts[gCurrLine].line = txt;
    renderCanvas()
}

function renderCanvas() {
    gCtx.drawImage(gMeme.img, 0, 0, gCanvas.width, gCanvas.height);
    drawTxt()
}

function drawTxt() {
    for (let i = 0; i < gMeme.texts.length; i++) {
        gCtx.fillStyle = gMeme.texts[i].color;
        gCtx.font = `${gMeme.texts[i].size}px ${gMeme.texts[i].type}`;
        gCtx.fillText(gMeme.texts[i].line, gMeme.texts[i].posX, gMeme.texts[i].posY);
        if (gMeme.texts[i].shadow) {
            gCtx.strokeText(gMeme.texts[i].line, gMeme.texts[i].posX, gMeme.texts[i].posY);
        }
    }
}

function onFilterMemeImgs(el) {
    var keyword = el.value.toLowerCase()
    setFilter(keyword);
    renderImgs(keyword);
    el.placeholder = el.value;

}

function onChangeFontSize(val) {
    if (val === '-') gMeme.texts[gCurrLine].size = gMeme.texts[gCurrLine].size - 2;
    else gMeme.texts[gCurrLine].size = +gMeme.texts[gCurrLine].size + 2;
    renderCanvas();
}

function onChangeFont(val) {
    gMeme.texts[gCurrLine].type = val;
    renderCanvas();
}

function onClickCanvas(event) {
    var e = $('.canvas');
    var offset = e.offset();
    var x = event.clientX - offset.left;
    var y = event.clientY - offset.top;
    switch (gMeme.brush) {
        case 'Font':
            gMeme.texts[gCurrLine].posX = +x;
            gMeme.texts[gCurrLine].posY = +y;
            renderCanvas()
            break;

        default:
            break;
    }
}

function onAddLine() {
    gCurrLine++;

    gMeme.texts[gCurrLine] ={
        line: 'Place the text and start wrighting !',
        type: 'Impact',
        posX: 60,
        posY: 60,
        size: '30',
        shadow: true,
        color: 'white',
    }
    console.log(gMeme.texts[gCurrLine]);
    renderCanvas()
}

function onChangeShadow() {
    gMeme.texts[gCurrLine].shadow = !gMeme.texts[gCurrLine].shadow;
    renderCanvas();
}

function createCanvas() {
    gCanvas = document.querySelector('.canvas');
    gCanvas.width = window.innerWidth - 100;
    gCtx = gCanvas.getContext('2d');

}

function openEditor() {
    $('.top-txt').val('');
    $('.font-type').val('Font')
    document.querySelector('.edit-meme-container').style.display = 'grid'
    $('.meme-container').hide();
    $('.keyword-selector').hide();
    $('#options-list').hide();
}

function onCloseEditor() {
    gCurrLine = 0;
    gMeme.texts =[gMeme.texts[gCurrLine]];
    $('.edit-meme-container').hide();
    $('.editor-btn-container').hide();
    $('.meme-container').show();
    $('.keyword-selector').show();
    $('.edit-meme-container').hide();
    $('#options-list').show();
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

function renderOptions() {
    var keyWords = getKeyWords();
    keyWords.sort();
    var strHTML = keyWords.map(word => {
        return `<option value=${word}>`
    })
    document.querySelector('#keyword-selector').innerHTML = strHTML.join(' ');
}