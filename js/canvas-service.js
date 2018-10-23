'use strict'

console.log('canvas');

var gCanvas;
var gCtx;



function createCanvas() {
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');
    gCanvas.height = window.innerHeight;
    gCanvas.width = window.innerWidth;
    var img = document.getElementById("1");
    gCtx.drawImage(img, 10, 10);
}

function openEditor(el) {
    $('.edit-meme').show();
    $('.meme-container').hide();
}