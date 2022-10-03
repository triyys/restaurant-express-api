module.exports = {
    cors: {
        origin: ['http://localhost:3000', 'https://foodmaze.herokuapp.com'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['Location'],
    },
}