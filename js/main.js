'use strict'

console.log('main');

function renderImgs(){
    var elMemeContainer = document.querySelector('.meme-container');
    var memeImgs =  getMemes();
   var memeDisplay = memeImgs.map(img =>{
       return `<img src=${img.url}>`
    })
    elMemeContainer.innerHTML = memeDisplay;
}

var gImgs = [{ id: 1, url: 'img/popo.jpg', keywords: ['happy'] }];
var gMeme = {
    selectedImgId: 5,
    txts: [
        {
            line: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}



function onPickImg(el){
    openEditor(el)
    console.log(el.src);
    
}