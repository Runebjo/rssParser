let Parser = require('rss-parser');
let parser = new Parser();

async function testAsync() {
    let feed = await parser.parseURL('https://www.reddit.com/.rss');
    console.log(feed.title);
}

testAsync();
