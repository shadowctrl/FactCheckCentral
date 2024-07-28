// app/api/newsService.js
export const fetchNews = async (category, page = 1) => {
  const apiKey = process.env.api_key;
  const response = await fetch(
    `https://api.spaceserp.com/google/search?apiKey=${apiKey}&q=${category}&domain=google.com&gl=us&hl=en&resultFormat=json&tbm=nws&pageNumber=${
      (page - 1) * 10 + 1
    }`
  );
  const data = await response.json();
  return data.news_results;
};
