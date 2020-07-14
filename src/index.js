var express = require('Express');
const bodyParser = require('body-parser');
var app = express();
let port = process.env.PORT || 3000;
var products = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({ extended: false }));

app.use('/productservice', products);

app.listen(port);
