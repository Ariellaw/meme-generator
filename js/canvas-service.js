'use strict'


var gCanvas;
var gCtx;

function createCanvas() {
    gCanvas = document.querySelector('.canvas');
<<<<<<< HEAD
    // gCanvas.height = 300;
    // gCanvas.width = 300;
=======
>>>>>>> 664abf39979c6317c621012f16a22bba3476797a
    gCtx = gCanvas.getContext('2d');
}

function openEditor(meme) {
    $('.top-txt').val('');
    $('.edit-meme-container').show();
    $('.meme-container').hide();
    $('#keyword-selector').hide();
}
