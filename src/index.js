var express = require('Express');
const bodyParser = require('body-parser');
var app = express();

var products = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({ extended: false }));

app.use('/productservice', products);

app.listen(3000);
