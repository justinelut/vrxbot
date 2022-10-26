import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import GhostContentAPI from "@tryghost/content-api";
import cron from "node-cron";
import { TweetWithImage, Tweet } from "./tweet.js";
import funnyAi from "./openai.js";
import download from "image-downloader";
const app = express();


cron.schedule(
  "*/60 * * * *",
  () => {
    funnyAi();
  },
  {
    scheduled: true,
    timezone: "Africa/Nairobi",
  }
);


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
      console.log(posts[0]);
      //const shareUrl = posts[0].url;
      const title = posts[0].title;
      const feature_image = posts[0].feature_image;
      const tweet = title;
      if (feature_image !== null) {
        download
          .image({ url: feature_image, dest: "/var/www/share/images" })
          .then(({ filename }) => {
            TweetWithImage(title, filename);
          })
          .catch((err) => console.error(err));
      } else {
        Tweet(tweet);
      }
    })
    .catch((err) => {
      console.error(err);
    });
  req.next();
});




app.listen(3004, () => {
  console.log("share app listening on port " + 3004);
});
