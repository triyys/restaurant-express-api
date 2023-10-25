module.exports = {
  cors: {
    origin: ['http://localhost:3000', 'https://foodmaze.herokuapp.com', process.env.WEBSITE_BASE_URL],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Location'],
  },
};
