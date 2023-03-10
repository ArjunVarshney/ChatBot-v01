import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/queryApi";
import admin from "firebase-admin";
import { adminDb } from "../../firebaseAdmin";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatid, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "Please provide a prompt !" });
    return;
  }

  if (!chatid) {
    res.status(400).json({ answer: "Please login again session expired !" });
    return;
  }

  // chat bot query
  const response = await query(prompt, chatid, model);

  const message: Message = {
    text: response! || "Not able to find an answer for that",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatBot-v01",
      avatar: "https://links.papareact.com/89k",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatid)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
}
