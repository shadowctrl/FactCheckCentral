const getApiKey = (() => {
  const apiKeys = [process.env.azure_api_key1, process.env.azure_api_key2];
  let currentKeyIndex = 0;

  return () => {
    const apiKey = apiKeys[currentKeyIndex];
    currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
    return apiKey;
  };
})();

const fetchWithRetry = async (url, retries = 3) => {
  let attempts = 0;
  while (attempts < retries) {
    const apiKey = getApiKey();

    try {
      const response = await fetch(url, {
        headers: {
          "Ocp-Apim-Subscription-Key": apiKey,
        },
        next: { revalidate: 21600 },
      });

      if (!response.ok) {
        if (response.status === 429) {
          attempts++;
          console.warn(
            `Rate limit exceeded for key ${apiKey}. Retrying with next key...`
          );
          continue;
        }

        throw new Error(`API call failed with status: ${response.status}`);
      }

      const data = await response.json();
      return data.value;
    } catch (error) {
      console.error(`Attempt ${attempts + 1} failed: ${error}`);
      if (attempts >= retries - 1) {
        throw error;
      }
      attempts++;
    }
  }
};

export const fetchNews = async (category, page = 1, count = 10) => {
  const offset = (page - 1) * count;
  const url = `https://api.bing.microsoft.com/v7.0/news/search?cc=us&category=${category}&count=${count}&offset=${offset}&q=${category}&sortBy=Date`;

  try {
    const data = await fetchWithRetry(url);
    return data;
  } catch (error) {
    return null;
  }
};
