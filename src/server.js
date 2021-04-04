
const express = require('express');
const cors = require('cors');
const notFoundHndler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');
const morgan = require('morgan');
const userRoute = require('./auth/router.js')

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan('dev'));
app.use('/',userRoute)





app.get('/bad', (req, res) => {
    throw new Error('something wrong!!');
  });
  app.use('*', notFoundHndler);
  app.use(errorHandler);

module.exports = {
    app: app,
    start: (port) => {
        const PORT = port || 6060;
        app.listen(PORT, () => console.log(`server up on  ${PORT}`));
    }
}