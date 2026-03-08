require('dotenv').config();
const config = require('./app.json');
config.expo.extra = {
  ...config.expo.extra,
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL || '',
};
module.exports = config;
