const { Client } = require("pg");
import { OpenAI } from "openai";
const openai = new OpenAI({
  apiKey: `${process.env.perplexity_api_key}`,
  baseURL: "https://api.perplexity.ai",
});

const getApiKey = (() => {
  const apiKeys = [process.env.azure_api_key1, process.env.azure_api_key2];
  let currentKeyIndex = 0;

  return () => {
    const apiKey = apiKeys[currentKeyIndex];
    currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
    return apiKey;
  };
})();

const fetchNews = async (retries = 3, query) => {
  const count = 8;
  const url = `https://api.bing.microsoft.com/v7.0/news/search?cc=us&&count=${count}&q=${query}&offset=0&sortBy=Date`;

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
        throw error;
      }
      attempts++;
    }
  }
};

const sendImmediateResponse = () => {
  return new Response("Request received. Processing in the background...", {
    status: 202,
  });
};

export const GET = async () => {
  const immediateResponse = sendImmediateResponse();
  const categories = [
    "Technology",
    "AI",
    "Science",
    "Lifestyle",
    "Politics",
    "Sports",
    "Health",
    "Entertainment",
    "World",
  ];
  (async () => {
    const client = new Client({
      connectionString: process.env.postgresql_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    try {
      await client.connect();

      const insertQuery = `
      INSERT INTO news (title, url, publishedAt, description, category, thumbnail_url, factcheck)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (url) DO NOTHING;`;

      for (const category of categories) {
        const newsArticles = await fetchNews(3, category);

        for (const article of newsArticles) {
          const { name, url, datePublished } = article;

          const thumbnail_url =
            article.image && article.image.thumbnail
              ? article.image.thumbnail.contentUrl
              : null;

          const content = `Eloborate this news in 250 words: ${article.description}\n\n Add Necessary line breaks (<br /> <br />). Don't add hashtags (#) nor Asterisks (*) `;

          const res = await openai.chat.completions.create({
            messages: [{ role: "user", content }],
            model: "llama-3.1-sonar-small-128k-online",
          });
          const description = res.choices[0].message.content;

          const factcheckResult = await fetch(
            process.env.base_url + "/api/searchFact",
            {
              method: "POST",
              body: JSON.stringify({
                prompt: name,
              }),
            }
          );
          const factcheckResultRes = await factcheckResult.json();

          await client.query(insertQuery, [
            name.replaceAll(" ", "-"),
            url,
            datePublished,
            description,
            category.toLowerCase(),
            thumbnail_url,
            factcheckResultRes,
          ]);
        }
      }
    } catch (error) {
      console.error("Error inserting data into PostgreSQL", error);
    } finally {
      await client.end();
    }
  })();
  return immediateResponse;
};
