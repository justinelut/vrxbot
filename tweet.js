import { TwitterApi } from "twitter-api-v2";

async function Tweet(tweet) {
  const client = new TwitterApi({
    appKey: process.env.twitter_api_key,
    appSecret: process.env.twitter_api_key_secret,
    accessToken: process.env.accessToken,
    accessSecret: process.env.accessTokenSecret,
  });

  //   const mediaIds = await Promise.all([
  //     // file path
  //     client.v2.uploadMedia(
  //       "https://verixr.com/content/images/size/w600/2022/10/download-3.jpg"
  //     ),
  //     // from a buffer, for example obtained with an image modifier package
  //     // client.v1.uploadMedia(Buffer.from(rotatedImage), { type: "png" }),
  //   ]);

  await client.v2
    .tweet(tweet)
    .then((val) => {
      console.log(val);
      console.log("success");
    })
    .catch((err) => {
      console.log(err);
    });
}

export default Tweet;
