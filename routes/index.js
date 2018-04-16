const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.post('/order/invoice', function (req, res, next) {

  let multiplier = -1;
  if (req.body.return)
    multiplier = 1;

  const data = {
    mobileNo: req.body.mobileNo,
    barcode: req.body.barcode,
    orderLineId: req.body.orderLineId,
    orderId: req.body.orderId,
    warehouseId: req.body.warehouseId
  };

  const values = {
    paidPrice: req.body.paidPrice,
    usedPoint: req.body.usedPoint,
    usedBalance: req.body.usedBalance
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
    'http://localhost:3000/api/order/ticket/verifyInvoice',
    {json: result},
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body)
      }
    }
  );
}

module.exports = router;
