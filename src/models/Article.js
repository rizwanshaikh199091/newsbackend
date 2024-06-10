const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  source: { type: String, required: true },
  source: { type: String, required: true },
  date: { type: Date, required: true }
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
