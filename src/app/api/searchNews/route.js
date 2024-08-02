// app/api/newsService.js
import { headers } from "next/headers";
export const POST = async (req, res) => {
  const headersList = headers();
  const allowedOrigin = [
    "http://localhost:3000",
    "https://fact-check-central.vercel.app",
  ];
  if (!allowedOrigin.includes(headersList.get("origin"))) {
    return new Response("You are not authorised to access this resource", {
      status: 401,
    });
  }
  const { query } = await req.json();
  const page = 1;
  const count = 4;
  const apiKey = process.env.NEXT_PUBLIC_azure_api_key;
  const offset = (page - 1) * count;
  const url = `https://api.bing.microsoft.com/v7.0/news/search?cc=us&&count=${count}&offset=${offset}&q=${query}&sortBy=Date`;

  try {
    const response = await fetch(url, {
      headers: {
        "Ocp-Apim-Subscription-Key": apiKey,
      },
      next: { revalidate: 3600 },
    });
    const data = await response.json();

    return Response.json(data.value);
  } catch (error) {
    console.log(error);
    return new Response("", { status: 500 });
  }
};
