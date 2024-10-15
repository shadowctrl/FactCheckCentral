const { Client } = require("pg");

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

export const GET = async () => {
  const categories = [
    "Technology",
    "AI",
    "Science",
    "Lifestyle",
    "Politics",
    "Sports",
    "Health",
    "Entertainment",
  ];

  const client = new Client({
    connectionString: process.env.POSTGRESQL_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();

    const insertQuery = `
      INSERT INTO news (title, url, publishedAt, description, category,thumbnail_url)
      VALUES ($1, $2, $3, $4, $5,$6)
      ON CONFLICT (url) DO NOTHING;`;

    for (const category of categories) {
      const newsArticles = await fetchNews(3, category);

      for (const article of newsArticles) {
        const { name, url, datePublished, description } = article;

        const thumbnail_url =
          article.image && article.image.thumbnail
            ? article.image.thumbnail.contentUrl
            : null;

        await client.query(insertQuery, [
          name,
          url,
          datePublished,
          description,
          category,
          thumbnail_url,
        ]);
      }
    }
  } catch (error) {
    console.error("Error inserting data into PostgreSQL", error);
  } finally {
    await client.end();

    return new Response("", { status: 200 });
  }
};
