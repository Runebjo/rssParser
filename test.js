const rssToJson = require('rss-to-json');

// rssToJson.load('https://outdoortroop.com/feed', (err, rss) => {
//     console.log(err);
// })


let feed =rssToJson.load('https://outdoortroop.com/feed');
console.log(feed);