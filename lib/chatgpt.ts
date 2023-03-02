import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-L6jJfCUBbReImk4T4bzZv6lc",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default openai;
