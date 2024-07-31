// app/api/newsService.js
export const fetchNews = async (
  category,
  page = 1,
  count = 15,
  client = false
) => {
  let apiKey;
  if (client) apiKey = process.env.NEXT_PUBLIC_azure_api_key;
  else apiKey = process.env.azure_api_key;
  const offset = (page - 1) * count;
  const url = `https://api.bing.microsoft.com/v7.0/news/search?cc=us&category=${category}&count=${count}&offset=${offset}&q=${category}&sortBy=Date`;

  try {
    const response = await fetch(url, {
      headers: {
        "Ocp-Apim-Subscription-Key": apiKey,
      },
      next: { revalidate: 3600 },
    });
    const data = await response.json();

    if (!data) return data;
    return data.value;
  } catch (error) {
    console.log(error);
  }
};
