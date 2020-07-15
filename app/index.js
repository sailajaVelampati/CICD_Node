var express = require('Express');
const bodyParser = require('body-parser');
const path = require('path');
var app = express();
let port = process.env.PORT || 5000;
var products = require('./routes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.render('index', { title: 'Account Summary' });
});
app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/productservice', products);

// Start node server
app.listen(port, function () {
  console.log('Node server is running on port ' + port);
});
