'use strict'
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGOODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    require('./src/server.js').start(process.env.PORT);
  })
  .catch(e => console.error('Could not start server', e.message));