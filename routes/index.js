const express = require('express');
const router = express.Router();
const env = require('../env');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.post('/order/invoice', function (req, res, next) {

  let multiplier = -1;
  if (req.body.return)
    multiplier = 1;

  console.log('-> invoice: ',req.body);
  const data = {
    mobileNo: req.body.mobileNo,
    barcode: req.body.barcode,
    orderLineId: req.body.orderLineId,
    orderId: req.body.orderId,
    warehouseId: req.body.warehouseId,
    userId: req.body.userId
  };

  const values = {
    point: req.body.usedPoint,
    balance: req.body.usedBalance
  };

  for (let key in values) {
    if (values.hasOwnProperty(key)) {
      values[key] += (multiplier * Math.floor(Math.random() * (values[key] ? values[key] : 1000) ))
    }
  }

  setTimeout(() => {
    post('verifyInvoice',Object.assign(values, data))
  }, 2000);

  res.json({});

});

router.post('/order/inventory', function (req, res, next) {

  console.log('-> inventory: ',req.body);
  const data = {
    orderId: req.body.orderId,
    orderLineId: req.body.orderLineId,
    warehouseId: req.body.warehouseId,
    userId: req.body.userId,
    barcode: req.body.barcode
  };


  setTimeout(() => {
    post('verifyOnlineWarehouse',data)
  }, 2000);

  res.json({});

});




function post(api,result) {
  const request = require('request');

  request.post(
    `http://${env.callBackURL}/api/order/offline/${api}`,
    {json: result},
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body)
      }
    }
  );
}

module.exports = router;
