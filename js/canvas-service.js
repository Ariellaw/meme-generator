'use strict'


var gCanvas;
var gCtx;


function createCanvas(meme) {
    gCanvas = document.querySelector('.canvas');
    // gCanvas.height = 300;
    // gCanvas.width = 300;
    gCtx = gCanvas.getContext('2d');
}


function openEditor(meme) {
    $('.top-txt').val('');
    $('.edit-meme-container').show();
    $('.meme-container').hide();
}

