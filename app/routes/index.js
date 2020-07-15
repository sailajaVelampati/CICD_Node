var express = require('express');
var router = express.Router();
const { readJson, writeJson } = require('../utilities/readWrite');

const productAvailable = (data) => {
  return data.productId ? true : false;
};
const propertyCheck = (data) => {
  const propertyArray = [
    'productId',
    'productname',
    'productcode',
    'description',
    'releasedate',
    'price',
    'rating',
    'imageurl',
  ];
  console.log(Object.keys(data));
  const temp = Object.keys(data).filter((i) => {
    console.log(!propertyArray.includes(i));
    return !propertyArray.includes(i);
  });
  console.log(temp);
  //length is more if property doesnot exist
  return temp.length > 0;
};
const responseData = (statusCode, message, status, data) => {
  return {
    statusCode,
    message,
    status,
    data,
  };
};
router.get('/', function (req, res) {
  res.json(JSON.parse(readJson('src/JSON/product.json')));
});
router.post('/', function (req, res) {
  const data = JSON.parse(readJson('src/JSON/product.json'));

  // product exists
  if (productAvailable(req.body)) {
    res.send(responseData(400, 'Product Already exists', 'Failure', []));
  } else {
    req.body.productId = data.length;
    //checking if all properties exists
    if (propertyCheck(req.body)) {
      res.send(responseData(400, 'Input data mismatch', 'Failure', []));
    } else {
      data.push(req.body);
      // on success
      writeJson('src/JSON/product.json', data);
      res.send(
        responseData(
          200,
          'product data added successfully',
          'success',
          data[data.length - 1]
        )
      );
    }
  }

  //Intenal server error
});
router.put('/:productId', function (req, res) {
  const data = JSON.parse(readJson('src/JSON/product.json'));
  const productIndex = data.findIndex(
    (ele) => ele.productId == req.params.productId
  );
  data = { ...data[productIndex], ...req.body };
  writeJson('src/JSON/product.json', data);
  res.send(`product with id:${req.params.productId} updated`);
});

//export this router to use in our index.js
module.exports = router;
