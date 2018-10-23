'use strict'

console.log('canvas');

var gCanvas;
var gCtx;



function createCanvas(meme) {
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');
    gCanvas.height = window.innerHeight;
    gCanvas.width = window.innerWidth;
    var img = document.getElementById(`${meme.id}`);
    console.log(img);
    
    // gCtx.drawImage(`${meme.url}`, 10, 10);
}

function openEditor(el) {
    console.log(this);
    createCanvas()
    
    // $('.edit-meme').show();
    // $('.meme-container').hide();
}