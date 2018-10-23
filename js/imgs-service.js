'use strict'
const IMGS_KEY = 'imgs';
var gMemes = [];
var storedMemeImages = 'memeImages';
var gFilter = 'all'


function createImg(url, keywords) {
    return {
        id: makeId(),
        url: url,
        keywords: keywords,
    }
}


function createImgs() {
    var storedMemeImages = getFromStorage(storedMemeImages);
    if (storedMemeImages !== null) {
        gMemes = storedMemeImages;
    }
    else {
        gMemes =
            [
                createImg('meme-imgs/2.jpg', ['happy', 'dancing', 'carefree', 'all']),
                createImg('meme-imgs/003.jpg', ['trump', 'angry', 'stupid', 'powerful', 'all']),
                createImg('meme-imgs/004.jpg', ['puppy', 'love', 'cute', 'friendship', 'all']),
                createImg('meme-imgs/005.jpg', ['sleeping', 'baby', 'puppy', 'calm', 'friendship', 'all']),
                createImg('meme-imgs/5.jpg', ['baby', 'payback', 'all']),
                createImg('meme-imgs/006.jpg', ['cat', 'sleeping', 'computer', 'all']),
                createImg('meme-imgs/8.jpg', ['Willy Wanka', 'sarcasm', 'all']),
                createImg('meme-imgs/9.jpg', ['baby', 'sneeky']),
            ];
    }
}
function getMemes() {
    return gMemes;
}
function setFilter(value){
    gFilter = value;
}

function getFilter(){
    return gFilter;
}

function filterMemeImages(value){
    var filteredMemes = gMemes.filter(function(meme){
        return meme.keywords.includes(value);
    });
    console.log('meme', filteredMemes);
    return filteredMemes;
}