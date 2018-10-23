'use strict'

console.log('canvas');

var gCanvas;
var gCtx;


function createCanvas(meme) {
    gCanvas = document.querySelector('.canvas');
    gCanvas.height = window.innerHeight-110;
    gCanvas.width = window.innerWidth-110;
    gCtx = gCanvas.getContext('2d');
}


function openEditor(meme) {
    $('.top-txt').val('');
    $('.edit-meme-container').show();
    $('.meme-container').hide();
}

// function setImgToDraw(meme) {
//     gDraw.img = meme;
// }