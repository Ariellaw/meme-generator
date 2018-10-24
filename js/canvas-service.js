'use strict'


var gCanvas;
var gCtx;

function createCanvas() {
    gCanvas = document.querySelector('.canvas');
    gCanvas.width = window.innerWidth-100; 
    gCtx = gCanvas.getContext('2d');
    
}

function openEditor() {
    $('.top-txt').show();
    $('.top-txt').val('');
    $('.font-type').val('Font');
    document.querySelector('.edit-meme-container').style.display = 'grid'
    $('.meme-container').hide();
    $('.keyword-selector').hide();
}

function onCloseEditor(){
    gDraw.text = 'Place the text and start wrighting !';        
    $('.top-txt').hide();
    $('.edit-meme-container').hide();
    $('.editor-btn-container').hide();
    $('.meme-container').show();
    $('.keyword-selector').show();
}
