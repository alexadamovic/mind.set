import { Configuration, OpenAIApi } from "openai";
import Constants from 'expo-constants';

const configuration = new Configuration({
  organization: "org-q4l5gB23k9kfkGF2bWlaghVo",
  apiKey: Constants.manifest?.extra?.openAiApiKey,
});

const openai = new OpenAIApi(configuration);

export default async function (res) {
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: "This is just filler I can fix this later",
    temperature: 0.6,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}