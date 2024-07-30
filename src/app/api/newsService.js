// app/api/newsService.js
export const fetchNews = async (category, page = 1, results = 15) => {
  const apiKey = process.env.api_key;
  const url = `https://api.spaceserp.com/google/search?apiKey=${apiKey}&q=${category}&domain=google.com&gl=us&hl=en&resultFormat=json&tbm=nws&pageSize=${results}&pageNumber=${
    (page - 1) * 10 + 1
  }`;
  const response = await fetch(url, { next: { revalidate: 3600 } });
  const data = await response.json();
  if (!data) return data;
  return data.news_results;
};
