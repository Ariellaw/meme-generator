'use strict'


var gCanvas;
var gCtx;

function createCanvas() {
    gCanvas = document.querySelector('.canvas');
    gCanvas.width = window.innerWidth-100; 
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
