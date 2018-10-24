'use strict'


var gCanvas;
var gCtx;

function createCanvas() {
    gCanvas = document.querySelector('.canvas');
<<<<<<< HEAD
    gCanvas.width = window.innerWidth-100; 
=======
    // gCanvas.height = 300;
    // gCanvas.width = 300;
>>>>>>> 29500d6b074b7a2421d1b80c4ff0ff6ae12d6ef9
    gCtx = gCanvas.getContext('2d');
    
}

function openEditor() {
    
    $('.font-type').val('Font')
    // $('.edit-meme-container').show();
    document.querySelector('.edit-meme-container').style.display = 'flex'
    $('.editor-btn-container').show();
    $('.meme-container').hide();
    $('.keyword-selector').hide();
}

function onCloseEditor(){
    $('.top-txt').val('');
    $('.top-txt').hide();
    $('.edit-meme-container').hide();
    $('.editor-btn-container').hide();
    $('.meme-container').show();
    $('.keyword-selector').show();
}
