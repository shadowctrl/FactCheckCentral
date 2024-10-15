import { headers } from "next/headers";

const getApiKey = (() => {
  const apiKeys = [process.env.azure_api_key1, process.env.azure_api_key2];
  let currentKeyIndex = 0;

  return () => {
    const apiKey = apiKeys[currentKeyIndex];
    currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
    return apiKey;
  };
})();

const fetchNews = async (url, retries = 3) => {
  let attempts = 0;
  while (attempts < retries) {
    const apiKey = getApiKey();

    try {
      const response = await fetch(url, {
        headers: {
          "Ocp-Apim-Subscription-Key": apiKey,
        },
      });

      if (!response.ok) {
        attempts++;
        continue;
      }

      const data = await response.json();
      return data.value;
    } catch (error) {
      if (attempts >= retries - 1) {
        throw error; // Rethrow after exhausting retries
      }
      attempts++;
    }
  }
};

export const POST = async (req, res) => {
  // const headersList = headers();
  // const allowedOrigin = [
  //   "http://localhost:3000",
  //   "https://fact-check-central.vercel.app",
  // ];

  // if (!allowedOrigin.includes(headersList.get("origin"))) {
  //   return new Response("You are not authorised to access this resource", {
  //     status: 401,
  //   });
  // }

  const { query } = await req.json();
  const page = 1;
  const count = 4;
  const offset = (page - 1) * count;
  const url = `https://api.bing.microsoft.com/v7.0/news/search?cc=us&&count=${count}&offset=${offset}&q=${query}&sortBy=Date`;

  try {
    const data = await fetchNews(url);
    return Response.json(data);
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
