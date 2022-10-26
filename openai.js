import { Configuration, OpenAIApi } from "openai";
import {Tweet} from './tweet.js'

async function funnyAi() {
  const configuration = new Configuration({
    organization: "org-7GFIvz0WqiOtHUvXzCHwNneS",
    apiKey: process.env.openAiKey,
  });
  const openai = new OpenAIApi(configuration);

  const prompts = [
    "Generate a very funny tweet",
    "Generate Relationship advice",
    "Generate types of disorders",
  ]

  let randomItem = prompts[Math.floor(Math.random()*prompts.length)];

  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: randomItem,
    max_tokens: 64,
    temperature: 0.7,
  });
  //Tweet(completion.data.choices[0].text)
 Tweet(completion.data.choices[0].text)
}

export default funnyAi;
