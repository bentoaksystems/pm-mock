const express = require('express');
const router = express.Router();
const http = require('http');
const querystring = require('querystring');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.post('/order/invoice', function (req, res, next) {

  let multiplier = -1;
  if (req.body.return)
    multiplier = 1;

  const data = {
    mobile_no: req.body.mobile_no,
    barcode: req.body.barcode,
    order_line_id: req.body.order_line_id,
    order_id: req.body.order_id,
    warehouse_id: req.body.warehouse_id
  };

  const values = {
    total_price: req.body.total_price,
    used_point: req.body.used_point,
    used_balance: req.body.used_balance
  };

  for (let key in values) {
    if (values.hasOwnProperty(key)) {
      values[key] += (multiplier * Math.floor(Math.random() * values[key]))
    }
  }

  setTimeout(() => {
    post(Object.assign(values, data))
  }, 5000);

  res.json({});

});



function post(result) {
  const request = require('request');

  request.post(
    'http://localhost:3000/api/order/invoice/verify',
    {json: result},
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body)
      }
    }
  );
}

module.exports = router;
