const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const moment = require('moment')
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/stat', (req, res) => {
  var options = {
    'method': 'GET',
    'url': 'https://www.goldapi.io/api/stat',
    'headers': {
      'x-access-token': 'goldapi-3qtrhukfbdd48o-io',
      'Content-Type': 'application/json'
    }
  };
  request(options, function (error, response) {
    if (!error && response.statusCode == 200) {
      res.send({ express : response.body});
    }
    else {
      console.log(error);
    }
  });
});

app.get('/api/rates/gold/current', (req, res) => {
  var options = {
    'method': 'GET',
    'url': 'https://www.goldapi.io/api/XAU/INR',
    'headers': {
      'x-access-token': 'goldapi-3qtrhukfbdd48o-io',
      'Content-Type': 'application/json'
    }
  };
  request(options, function (error, response) {
    if (!error && response.statusCode == 200) {
      res.send({ express : response.body});
    }
    else {
      console.log(error);
    }
  });
});

app.get('/api/rates/silver/current', (req, res) => {
  var options = {
    'method': 'GET',
    'url': 'https://www.goldapi.io/api/XAG/INR',
    'headers': {
      'x-access-token': 'goldapi-3qtrhukfbdd48o-io',
      'Content-Type': 'application/json'
    }
  };
  request(options, function (error, response) {
    if (!error && response.statusCode == 200) {
      res.send({ express : response.body});
    }
    else {
      console.log(error);
    }
  });
});

app.get('/api/rates/gold/yesterday', (req, res) => {
  const yesterday = moment().subtract(24, 'hours').format('yyyyMMDD');
  var options = {
    'method': 'GET',
    'url': 'https://www.goldapi.io/api/XAU/INR/'+yesterday,
    'headers': {
      'x-access-token': 'goldapi-3qtrhukfbdd48o-io',
      'Content-Type': 'application/json'
    }
  };
  request(options, function (error, response) {
    if (!error && response.statusCode == 200) {
      res.send({ express : response.body});
    }
    else {
      console.log(error);
    }
  });
});

app.get('/api/rates/silver/yesterday', (req, res) => {
  const yesterday = moment().subtract(24, 'hours').format('yyyyMMDD');
  var options = {
    'method': 'GET',
    'url': 'https://www.goldapi.io/api/XAG/INR/'+yesterday,
    'headers': {
      'x-access-token': 'goldapi-3qtrhukfbdd48o-io',
      'Content-Type': 'application/json'
    }
  };
  request(options, function (error, response) {
    if (!error && response.statusCode == 200) {
      res.send({ express : response.body});
    }
    else {
      console.log(error);
    }
  });
});

app.post('/api/reply', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});


app.listen(port, () => console.log(`Listening on port ${port}`));
