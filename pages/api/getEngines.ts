// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import openai from "../../lib/chatgpt";

type Options = {
  value: string;
  label: string;
};

type Data = {
  modelOptions: Options[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const models = await openai.listModels().then((res) => {
    return res.data.data;
  });

  const modelOptions = models.map((model) => {
    return { value: model.id, label: model.id };
  });

  res.status(200).json({
    modelOptions,
  });
}