///////////// Modules
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const path = require('path')

const app = express();

// Enable compression, compress all responses
app.use(compression());

// Assets
app.use( express.static( __dirname + '/static' ));

const port = process.env.PORT || 2000;

///////////// Middlewares
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

//serve our app
app.get( '/', function (req, res) {
  res.render(path.join( __dirname, './', 'index'));
});

///////////// Start the app
app.listen( port, function() {
  console.log( 'Running on port ' + port );
});

exports = module.exports = app;