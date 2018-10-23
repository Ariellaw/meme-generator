'use strict'


var gCanvas;
var gCtx;

function createCanvas() {
    gCanvas = document.querySelector('.canvas');
<<<<<<< HEAD
=======
    // gCanvas.height = 300;
    // gCanvas.width = 300;
>>>>>>> 9c5abae5cf718b5c10db0b1e6dca215a13105224
    gCtx = gCanvas.getContext('2d');
}

function openEditor(meme) {
    $('.top-txt').val('');
    $('.edit-meme-container').show();
    $('.meme-container').hide();
}
<<<<<<< HEAD
=======

>>>>>>> 9c5abae5cf718b5c10db0b1e6dca215a13105224
