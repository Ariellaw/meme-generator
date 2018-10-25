'use strict'

var gCanvas;
var gCtx;
var gCurrLine = 0;
var gCurrMeme;
var gLinesWidth = [];
var isMouseDown = false;
var gCurrX;
var gCurrY;
const POPULAR_KEY_WORDS = 'popularKeyWords';

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
var gCurrMeme = gMeme.texts[gCurrLine];




function init() {
    document.querySelector('.canvas').addEventListener("contextmenu", function (e) {
        e.preventDefault();
    }, false);
    createImgs();
    renderImgs();
    renderOptions();
    renderPopularKeywords();
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

function renderPopularKeywords() {
    var popularKeyWords = getFromStorage(POPULAR_KEY_WORDS);
    var fontSize = 20;
    var strHTML = '';
    if (popularKeyWords !== null) {
        for (var word in popularKeyWords) {
            var currFontSize = fontSize + (popularKeyWords[word] * 3);
            console.log(word, currFontSize);
            var color = getRandomColor();
            strHTML += `<span onclick="onFilterMemeImgs('${word}')" class="keyword" style="color:${color}; font-size:${currFontSize}px"> &nbsp ${word} &nbsp </span>`
        }

    } else {
        strHTML = `<span onclick="onFilterMemeImgs('Happy')" class="keyword" style="color:green; font-size:30px"> &nbsp happy &nbsp </span>
        <span onclick="onFilterMemeImgs('puppy')" class="keyword" style="color:yellow; font-size:20px"> &nbsp puppy &nbsp </span>`
    }
    document.querySelector('.popular-keywords span').innerHTML = strHTML;

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
    gCurrMeme.line = txt;
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
    getLineWitdh();
}

function onFilterMemeImgs(word) {
    var keyword = word.toLowerCase()
    setFilter(keyword);
    renderImgs(keyword);
}
function setPopularKeyWords(keyword) {
    var gMapOfKeywords = getFromStorage(POPULAR_KEY_WORDS);
    if (gMapOfKeywords === null) {
        gMapOfKeywords = {};
    }
    console.log('someone searched for', keyword);


    if (!gMapOfKeywords.hasOwnProperty(keyword)) {
        gMapOfKeywords[keyword] = 1;
    } else {
        gMapOfKeywords[keyword]++;
    }
    saveToStorage(POPULAR_KEY_WORDS, gMapOfKeywords)
    renderPopularKeywords();
}

function onChangeFontSize(val) {
    if (val === '-') gCurrMeme.size = gCurrMeme.size - 2;
    else gCurrMeme.size = +gCurrMeme.size + 2;
    renderCanvas();
}

function onChangeFont(val) {
    gCurrMeme.type = val;
    renderCanvas();
}

function onAddLine() {
    if (!gMeme) gMeme.texts = gMeme.texts[0];
    $('.txt').val('');
    ++gCurrLine;
    gMeme.texts[gCurrLine] = {
        line: 'Place me !',
        type: 'Impact',
        posX: 60,
        posY: 60,
        size: '30',
        shadow: true,
        color: 'white',
    }
    gCurrMeme = gMeme.texts[gCurrLine];
    renderCanvas()
    getLineWitdh()
}

function onChangeShadow() {
    gCurrMeme.shadow = !gCurrMeme.shadow;
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
    document.querySelector('.edit-meme-container').style.display = 'flex';
    $('.meme-container').hide();
    $('.top-nav').hide();
    $('.keyword-selector').hide();
    $('.options-list').hide();
    $('.download').hide();
}

function onCloseEditor() {
    gCurrLine = 0;
    gMeme.texts = [gMeme.texts[0]];
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


function dragTxt(event) {
    if (!isMouseDown) return;
    var x = parseInt(event.clientX - gCanvas.offsetLeft)
    var y = parseInt(event.clientY - gCanvas.offsetTop)
    var distanceX = x - gCurrX;
    var disranceY = y - gCurrY;
    gCurrX = x;
    gCurrY = y;
    gCurrMeme.posX += distanceX;
    gCurrMeme.posY += disranceY;
    renderCanvas()
    console.log('mem :', gCurrMeme);
    console.log('mems :', gMeme);
}

function handalMouseMove(event) {
    dragTxt(event)
}

function handalMouseUp() {
    isMouseDown = false;
}

function onPickLIne(event) {
    isMouseDown = true;
    $('.txt').val(`${gCurrMeme.line}`);
    gCurrX = parseInt(event.clientX - gCanvas.offsetLeft);
    gCurrY = parseInt(event.clientY - gCanvas.offsetTop);
    var meme = gMeme.texts.find(meme => {
        return (
            gCurrX >= meme.posX &&
            gCurrX <= meme.posX + meme.width
            && gCurrY <= meme.posY
            && gCurrY >= meme.posY - meme.height
        );
    })
    if (!meme) return;
    gCurrMeme = meme;
    console.log('mem :', gCurrMeme);
}

function onDelete() {
    var memeIdx = gMeme.texts.findIndex(meme => {
        return meme === gCurrMeme
    })
    gMeme.texts.splice(memeIdx, 1)
    gCurrLine--;
    renderCanvas()
}

function getLineWitdh() {
    return gMeme.texts.forEach(meme => {
        meme.height = +meme.size;
        meme.width = gCtx.measureText(meme.line).width;
    });
}