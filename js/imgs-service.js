'use strict'
const IMGS_KEY = 'imgs';
var gImgs =[];
// var img = createImg('img/popo.jpg',['happy']);
// console.log(img);

function createImg(url,keywords) {
    return {
        id: makeId(),
        url,
        keywords,
    }
}
