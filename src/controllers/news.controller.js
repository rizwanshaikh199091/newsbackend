const axios = require('axios');
const { startOfDay, endOfDay } = require('date-fns');

exports.fetchNews = async (req, res) => {
  const { query, startDate, endDate, category, sources, limit = 10, offset = 0 } = req.query;
  console.log("source", sources.join(','));
  const newsApiQuery = query ? `&q=${query}` : '';
  const newsApiCategory = category ? `&category=${category.join(',')}` : '';

  const guardianApiQuery = query ? `&q=${query.replace(' ', ',')}` : '';
  const guardianApiCategory = category ? `&section=${category.join(',')}` : '';

  const nytApiCategory = category ? `${category}.json` : 'home.json';

  const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us${newsApiQuery}${newsApiCategory}&apiKey=${process.env.NEWS_API_KEY}`;
  const guardianApiUrl = `https://content.guardianapis.com/search?api-key=${process.env.GUARDIAN_API_KEY}${guardianApiQuery}${guardianApiCategory}`;
  const nytApiUrl = `https://api.nytimes.com/svc/topstories/v2/${nytApiCategory}?api-key=${process.env.NYT_API_KEY}`;

  let articles = [];

  try {
    if (!sources || sources.includes('News API')) {
      console.log("newsApiUrl", newsApiUrl);
      const newsApiResponse = await axios.get(newsApiUrl);
      if (newsApiResponse.data.articles) {
        newsApiResponse.data.articles.forEach(article => {
          articles.push({
            title: article.title,
            description: article.description,
            url: article.url,
            source: "News API",
            date: new Date(article.publishedAt),
          });
        });
      }
    }
    console.log(!sources || sources.includes('The Guardian'));
    if (!sources || sources.includes('The Guardian')) {
      console.log("Guardian", guardianApiUrl);
      const guardianApiResponse = await axios.get(guardianApiUrl);
      if (guardianApiResponse.data.response && guardianApiResponse.data.response.results) {
        guardianApiResponse.data.response.results.forEach(article => {
          articles.push({
            title: article.webTitle,
            description: article.fields ? article.fields.trailText : '',
            url: article.webUrl,
            source: "The Guardian",
            date: new Date(article.webPublicationDate),
          });
        });
      }
    }

    if (!sources || sources.includes('New York Times')) {
      console.log("New York Times", nytApiUrl);
      const nytApiResponse = await axios.get(nytApiUrl);
      if (nytApiResponse.data.results) {
        nytApiResponse.data.results.forEach(article => {
          articles.push({
            title: article.title,
            description: article.abstract,
            url: article.url,
            source: "New York Times",
            date: new Date(article.published_date),
          });
        });
      }
    }

    // Filter by date range if provided
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      articles = articles.filter(article => article.date >= start && article.date <= end);
    }

    // Pagination
    const paginatedArticles = articles.slice(Number(offset), Number(offset) + Number(limit));
    console.log("paginatedArticles", paginatedArticles);
    res.json({ message: "News fetched successfully", articles: paginatedArticles, total: articles.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching news", error: err.message });
  }
};
