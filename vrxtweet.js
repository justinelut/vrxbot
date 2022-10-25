import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import GhostContentAPI from "@tryghost/content-api";
import Tweet from "./tweet.js";
const app = express();

app.post("/share", (req, res) => {
  console.log("a post has been published");
  const api = new GhostContentAPI({
    url: "https://verixr.com",
    key: "fe6fb3bea533dfc42eefa9348a",
    version: "v5.0",
  });

  // fetch 5 posts, including related tags and authors
  api.posts
    .browse({ limit: 1 })
    .then((posts) => {
      const shareUrl = posts[0].url;
      const title = posts[0].title;
      const tweet = title + " " + shareUrl;
      Tweet(tweet);
    })
    .catch((err) => {
      console.error(err);
    });
  req.next();
});

app.listen(3002, () => {
  console.log("share app listening on port " + 3002);
});
