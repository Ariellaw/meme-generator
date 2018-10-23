'use strict'


var gCanvas;
var gCtx;

function createCanvas() {
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');
}

function openEditor(meme) {
    $('.top-txt').val('');
    $('.edit-meme-container').show();
    $('.meme-container').hide();
    $('#keyword-selector').hide();
}
