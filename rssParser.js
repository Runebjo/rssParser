let Parser = require('rss-parser');
let parser = new Parser();
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


//const feedUrl = 'https://snakeowner.com/feed/';
//const feedUrl = 'https://emborapets.com/feed/';
//const feedUrl = 'https://workprep.com/feed/';
//const feedUrl = 'https://outdoortroop.com/feed';
const feedUrl = 'https://howtocreateapps.com/feed';
let numOfPages = 100;

const csvWriter = createCsvWriter({
    path: 'out.csv',
    header: [
        { id: 'title', title: 'Title' },
        { id: 'link', title: 'Link' },
    ]
});

let feeds = [];

for (let i = 1; i <= numOfPages; i++) {
    const feed = `${feedUrl}?paged=${i}`;
    feeds.push(feed);
}

let counter = 1;
GetFeedResult(feeds)
    .then(res => {
        console.log("ready to write: " + res.length);
        csvWriter.writeRecords(res)
        .then(() => console.log("csv file was written successfully"))
    })

async function GetFeedResult(feeds) {
    let feedResults = [];
    for (let i = 0; i < feeds.length; i++) {
        try {
            let res = await parser.parseURL(feeds[i]);
            res.items.map(i => {
                feedResults.push({ title: i.title, link: i.link });
            });
        }
        catch (error) {
            // No more on feed, break and return results
            break;
        }
    }
    return feedResults;
}
