import { TwitterApi } from "twitter-api-v2";

export const TweetWithImage = async (tweet, pathToImage) => {
  const client = new TwitterApi({
    appKey: process.env.twitter_api_key,
    appSecret: process.env.twitter_api_key_secret,
    accessToken: process.env.accessToken,
    accessSecret: process.env.accessTokenSecret,
  });

  const mediaIds = await Promise.all([
    // file path
    client.v1.uploadMedia(pathToImage),
    //from a buffer, for example obtained with an image modifier package
    //client.v1.uploadMedia(Buffer.from(rotatedImage), { type: "png" }),
  ]);

  await client.v2
    .tweet(tweet, { media: { media_ids: mediaIds } })
    .then((val) => {
      console.log(val);
      console.log("success");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const Tweet = async (tweet) => {
  const client = new TwitterApi({
    appKey: process.env.twitter_api_key,
    appSecret: process.env.twitter_api_key_secret,
    accessToken: process.env.accessToken,
    accessSecret: process.env.accessTokenSecret,
  });

  await client.v2
    .tweet(tweet)
    .then((val) => {
      console.log(val);
      console.log("success");
    })
    .catch((err) => {
      console.log(err);
    });
};
