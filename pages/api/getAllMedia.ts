// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import netlifyIdentity from "netlify-identity-widget";

type Data = {
  name: string;
};

export const Config = {
  cloud_name: "howisthesurf",
  upload_preset: "jsooiztb",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await fetch("/.netlify/functions/media-fetch-all", {
    method: "GET",
  });

  return response.json();

  // const {
  //   id,
  //   user_metadata: { full_name },
  // } = netlifyIdentity.currentUser();

  res.status(200).json({ name: "John Doe" });
}
