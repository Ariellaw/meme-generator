'use strict'

console.log('canvas');

var gCanvas;
var gCtx;



function createCanvas(meme) {
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');
    gCanvas.height = window.innerHeight-110;
    gCanvas.width = window.innerWidth-110;
    var currMeme = document.getElementById(`${meme.id}`);
    gCtx.drawImage(currMeme, 10, 10);
}

function openEditor(meme) {
    createCanvas(meme)
    $('.edit-meme-container').show();
    $('.meme-container').hide();
}