'use strict'

var gDraw = {
    img: 'img/002.jepg',
    text: 'Place the text and start wrighting !',
    font: {
        type: 'Impact',
        posX: 70,
        posY: 70,
        size: '30',
        shadow: false,
    },
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
    var ratio = elImg.naturalHeight / elImg.naturalWidth;

    if (window.innerWidth > elImg.naturalWidth) {
        gCanvas.width = elImg.naturalWidth;
    } else {
        gCanvas.width = window.innerWidth * .9;
    }
    gCanvas.height = gCanvas.width * ratio * .85;

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
    gCtx.font = `${gDraw.font.size}px ${gDraw.font.type}`;
    gCtx.fillText(gDraw.text, gDraw.font.posX, gDraw.font.posY);
    if (gDraw.font.shadow) {
        gCtx.strokeText(gDraw.text, gDraw.font.posX, gDraw.font.posY);
    }
}

function onFilterMemeImgs(el) {
    setFilter(el.value);
    renderImgs(el.value);
}

function onChangeFontSize(val) {
    // console.log(gDraw.font.size);
    if (val === '-') gDraw.font.size = gDraw.font.size - 2;
    else gDraw.font.size = +gDraw.font.size + 2;
    renderCanvas();
}

function onChangeFont(val) {
    gDraw.font.type = val;
    renderCanvas();
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

function onAddLine() {
    return document.querySelector('.txt-line').innerHTML += '<input class="txt-line" type="text" placeholder="Text line" oninput="onWrighting()"></input>';
}

function onChangeShadow() {
    return gDraw.font.shadow = !gDraw.font.shadow;
}