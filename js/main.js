'use srtict'

console.log('main');

function init(){
    createCanvas()
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