'use strict'
const IMGS_KEY = 'imgs';
var gMemes = [];
var storedMemeImages = 'memeImages';


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
                createImg('meme-imgs/2.jpg', ['happy', 'dancing', 'carefree']),
                createImg('meme-imgs/003.jpg', ['trump', 'angry', 'stupid', 'powerful']),
                createImg('meme-imgs/004.jpg', ['puppy', 'love', 'cute', 'friendship']),
                createImg('meme-imgs/005.jpg', ['sleeping', 'baby', 'puppy', 'calm', 'friendship']),
                createImg('meme-imgs/5.jpg', ['baby', 'payback']),
                createImg('meme-imgs/006.jpg', ['cat', 'sleeping', 'computer']),
                createImg('meme-imgs/8.jpg', ['Willy Wanka', 'sarcasm']),
                createImg('meme-imgs/9.jpg', ['baby', 'sneeky']),
            ];
    }
}
function getMemes() {
    return gMemes;
}
