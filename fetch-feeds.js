const fs = require('fs-extra');
const Parser = require('rss-parser');

const RSS_URLS = [
  "https://zenn.dev/wozitto/feed",
  "https://note.com/toshito_hirooka/rss",
  "https://qiita.com/wozitto/feed"
];

const PINNED_POSTS_URLS = [
  "https://zenn.dev/moneyforward/articles/075a74334ca512"
];

const parser = new Parser();

async function fetchFeedItems(url) {
  try {
    const feed = await parser.parseURL(url);
    return feed.items.map(({ title, link, contentSnippet, isoDate }) => ({
      link,
      title,
      description: contentSnippet?.replace(/\n/g, ""),
      pubDatetime: new Date(isoDate),
      isPinned: PINNED_POSTS_URLS.includes(link),
    }));
  } catch (error) {
    console.error(`Error fetching feed from ${url}:`, error);
    return [];
  }
}

async function fetchAllFeeds(urls) {
  const allFeedItems = [];
  for (const url of urls) {
    const items = await fetchFeedItems(url);
    allFeedItems.push(...items);
  }
  return allFeedItems;
}

(async function () {
  const allPostItems = await fetchAllFeeds(RSS_URLS);
  allPostItems.sort((a, b) => b.dateMiliSeconds - a.dateMiliSeconds);
  fs.ensureDirSync('./src/content/feeds');
  fs.writeJsonSync('./src/content/feeds/posts.json', allPostItems);
})();
