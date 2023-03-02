import openai from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {
  const res = await openai
    .createCompletion({
      model,
      prompt,
      temperature: 0.9,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => {
      return res.data.choices[0].text;
    })
    .catch((err) => {
      return `I was not able to find an appropriate answer for this and ended up with an error: ${err.message}`;
    });
  console.log(res);

  return res;
};

export default query;
