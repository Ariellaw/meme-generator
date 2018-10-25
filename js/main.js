'use strict'

var gCanvas;
var gCtx;
var gCurrLine = 0;
var gCurrMeme;
var gLinesWidth = [];
var gMeme = {
    img: 'img/002.jepg',
    texts: [
        {
            line: 'Place me !',
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
    document.querySelector('.canvas').addEventListener("contextmenu", function (e) {
        e.preventDefault();
    }, false);

    createImgs();
    renderImgs();
    renderOptions();
    createCanvas();
}

function renderImgs(value = 'all') {
    var elMemeContainer = document.querySelector('.meme-container');
    var memeImgs = filterMemeImages(value);
    var strHTML = memeImgs.map(img => {
        return `<img onclick="onClickImg(this,'${img.id}')" class="memeImg" id="${img.id}" src="${img.url}" >`
    })
    elMemeContainer.innerHTML = strHTML.join('');
}

function onClickImg(elImg) {
    var ratio = elImg.naturalHeight / elImg.naturalWidth;
    var width = window.innerWidth < 700 ? window.innerWidth : 700;
    gCanvas.width = width * .8;
    gCanvas.height = gCanvas.width * ratio;
    gMeme.img = elImg;
    renderCanvas();
    openEditor();
}

function onWrighting(ev) {
    var txt = $('.txt').val();
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
    var elCanvas = $('.canvas');
    var offset = elCanvas.offset();
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
    $('.txt').val('');
    gCurrLine++;
    gMeme.texts[gCurrLine] = {
        line: 'Place me !',
        type: 'Impact',
        posX: 60,
        posY: 60,
        size: '30',
        shadow: true,
        color: 'white',
    }
    renderCanvas()
    gLinesWidth = getLineWitdh()
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
    $('.txt').val('');
    $('.font-type').val('Font')
    document.querySelector('.edit-meme-container').style.display = 'grid';
    $('.meme-container').hide();
    $('.keyword-selector').hide();
    $('.options-list').hide();
    $('.download').hide();
}

function onCloseEditor() {
    gCurrLine = 0;
    gMeme.texts = [gMeme.texts[gCurrLine]];
    $('.edit-meme-container').hide();
    $('.editor-btn-container').hide();
    $('.meme-container').show();
    $('.keyword-selector').show();
    $('.edit-meme-container').hide();
    $('.options-list').show();
    $('.download').show();


}

function getKeyWords() {
    var gImgs = getMemes();
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

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpg');
    elLink.href = imgContent
}


function handlemosuemove() {
    var x = event.clientX;
    var y = event.clientY;
}


function onPickLIne(event) {
    var elCanvas = $('.canvas');
    var offset = elCanvas.offset();
    var x = event.clientX - offset.left;
    var y = event.clientY - offset.top;

    let line = gMeme.texts.filter(() => {
        return Math.abs(x - gMeme.texts[gCurrLine].posX) <= 20 && Math.abs(y - gMeme.texts[gCurrLine].posY) <= 200;
    })
    console.log(line);

}


function getLineWitdh() {
    return gMeme.texts.map(meme => {
        return gCtx.measureText(meme.line);
    });
}