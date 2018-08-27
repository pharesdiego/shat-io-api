const express      = require('express'),
      app          = express(),
      morgan       = require('morgan'),
      fs           = require('fs'),
      apiRoutes    = require('./routes/ApiRoutes.routes'),
      mongoose     = require('mongoose'),
      dotenv       = require('dotenv'),
      bodyParser   = require('body-parser');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then((e, err) => {
    if(err) console.log('check out the connection to mongodb');
    console.log('connected to mongodb');
  });

app.use(morgan('common', { stream: fs.createWriteStream('./log.txt', { flags: 'a' }) }));
app.use(bodyParser());
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*'
  })
  next();
});

app.use('/api/v0', apiRoutes);

// handle errors
app.use((err, req, res, next) => {
  res.status(500).send(`>> ERROR << ${err} `);
});

// handle not found 404
app.use((req, res, next) => {
  res.status(404).send('>> NOT FOUND <<');
});

app.listen(process.env.PORT || 3000);
