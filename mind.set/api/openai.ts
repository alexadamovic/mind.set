import { Configuration, OpenAIApi } from "openai";
import Constants from 'expo-constants';

const configuration = new Configuration({
  organization: "org-q4l5gB23k9kfkGF2bWlaghVo",
  apiKey: Constants.manifest?.extra?.openAiApiKey,
});

export const openai = new OpenAIApi(configuration);