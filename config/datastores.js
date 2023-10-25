if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = {
  postgresql: {
    url: process.env.POSTGRESQL_CONNECTION_STRING,
    dialect: 'postgres',
  },
  mongodb: {
    url: process.env.MONGODB_CONNECTION_STRING,
  },
};
