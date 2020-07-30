const YouTube = require('youtube-node');
const config = require('./ytconfig.json');

const youtube = new YouTube();
youtube.setKey(config.key);

function searchVideoUrl(message, queryText){
    return new Promise((resolve, reject) => {
        youtube.search(`empresa S/A ${queryText}`, 2, function(error, result) {
            if(!error){
                const videoId = result.items.map((item) => item.id.videoId).filter(item => item);
                const youtubeLinks = videoId.map(videoId => `https://www.youtube.com/watch?v=${videoId}`);
                resolve(`${message} ${youtubeLinks.join(`, `)}`); 
            } else {
                reject();
            }
        });
    });
};

module.exports.searchVideoUrl = searchVideoUrl;
