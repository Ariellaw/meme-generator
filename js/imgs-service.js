'use strict'
const IMGS_KEY = 'imgs';
var gMemes = [];
var storedMemeImages = 'memeImages';
var gFilter = 'All'


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
                createImg('meme-imgs/2.jpg', ['Happy', 'Dancing', 'Carefree', 'All']),
                createImg('meme-imgs/003.jpg', ['Trump', 'Angry', 'Stupid', 'Powerful', 'All']),
                createImg('meme-imgs/004.jpg', ['Puppy', 'Love', 'Cute', 'Friendship', 'All']),
                createImg('meme-imgs/005.jpg', ['Sleeping', 'Baby', 'Puppy', 'Calm', 'Friendship', 'All']),
                createImg('meme-imgs/5.jpg', ['Baby', 'Payback', 'All']),
                createImg('meme-imgs/006.jpg', ['Cat', 'Sleeping', 'Computer', 'All']),
                createImg('meme-imgs/8.jpg', ['Willy Wanka', 'Sarcasm', 'All']),
                createImg('meme-imgs/9.jpg', ['Baby', 'Sneeky', 'All']),
                createImg('meme-imgs/Oprah-You-Get-A.jpg', ['Famous', 'Revenge', 'All']),
                createImg('meme-imgs/patrick.jpg', ['Famous', 'Laughing', 'All']),
                createImg('meme-imgs/putin.jpg', ['Putin', 'Leader', 'Serious', 'All']),
                createImg('meme-imgs/X-Everywhere.jpg', ['Toys', 'concerned', 'All']),
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
        return meme.keywords.includes(value);
    });
    return filteredMemes;
}