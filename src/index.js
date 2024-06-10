require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./mongoose');
const { validateEnv } = require('./utils/validateEnv');


validateEnv();

connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
