'use strict'

console.log('main');

<<<<<<< HEAD
function renderImgs(){
    var elMemeContainer = document.querySelector('.meme-container');
    var memeImgs =  getMemes();
   var memeDisplay = memeImgs.map(img =>{
       return `<img src=${img.url}>`
    })
    elMemeContainer.innerHTML = memeDisplay;
}

=======
function init(){
    createCanvas()
}




>>>>>>> 529a4b999f4678017af6e84c537fcdae7f396d96
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