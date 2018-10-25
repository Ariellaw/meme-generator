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
                createImg('meme-imgs/003.jpg', ['trump', 'president', 'angry', 'stupid', 'powerful', 'all']),
                createImg('meme-imgs/004.jpg', ['puppy','pet', 'love', 'cute', 'friendship', 'all']),
                createImg('meme-imgs/005.jpg', ['sleeping', 'pet','baby', 'puppy', 'calm', 'friendship', 'all']),
                createImg('meme-imgs/5.jpg', ['baby', 'payback', 'all']),
                createImg('meme-imgs/006.jpg', ['cat','pet', 'sleeping', 'computer', 'all']),
                createImg('meme-imgs/8.jpg', ['willywanka', 'sarcasm', 'all']),
                createImg('meme-imgs/9.jpg', ['baby', 'sneeky', 'all']),
                createImg('meme-imgs/Oprah-You-Get-A.jpg', ['famous', 'revenge', 'all']),
                createImg('meme-imgs/patrick.jpg', ['famous', 'laughing', 'all']),
                createImg('meme-imgs/putin.jpg', ['putin', 'leader', 'serious', 'all']),
                createImg('meme-imgs/Ancient-Aliens.jpg', ['aliens', 'celeb', 'all']),
                createImg('meme-imgs/img4.jpg', ['trump', 'president', 'angry', 'stupid', 'all']),
                createImg('meme-imgs/img11.jpg', ['obama', 'president', 'happy', 'all']),
                createImg('meme-imgs/img6.jpg', ['puppy', 'lazy', 'pet', 'all']),
                createImg('meme-imgs/img2.jpg', ['children', 'poor', 'happy', 'dancing', 'all']),
                createImg('meme-imgs/img5.jpg', ['children', 'surprised', 'all']),
            ];  
    }
}

function getMemes() {
    return gMemes;
}
function setFilter(value) {
    gFilter = value;
}

function getFilter() {
    return gFilter;
}

function filterMemeImages(value) {
    var filteredMemes = gMemes.filter(function (meme) {
        return meme.keywords.some(keyword => keyword.includes(value))
    });
    return filteredMemes;
}
