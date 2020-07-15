var express = require('Express');
const bodyParser = require('body-parser');
const path = require('path');
var app = express();
let port = process.env.PORT || 3000;
var products = require('./routes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.render('index', { title: 'Account Summary' });
});

app.use('/productservice', products);
app.set('port', process.env.PORT || 5000);

// Start node server
app.listen(app.get('port'), function () {
  console.log('Node server is running on port ' + app.get('port'));
});
