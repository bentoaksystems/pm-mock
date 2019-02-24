
const express = require('express');
const router = express.Router();
const env = require('../env');
const rp = (require("request-promise")).defaults({jar: true});


let jar;
main = async () => {
  try {
    let body = {
      username: 'offline@persianmode.com',
      password: 'admin@123',
      loginType: 6
    };
    const rpJar = rp.jar();
    let res = await rp({
      method: 'POST',
      uri: `${env.callBackURL}/api/agent/login`,
      body,
      json: true,
      withCredentials: true,
      jar: rpJar,
    });

    jar = rpJar;

    console.log('-> ', 'offline system has logged in successfully');
  } catch (err) {
    console.log('-> ', err);
    if (!jar)
      setTimeout(() => {
        main();
      }, 5000); 
  }

}

main();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.post('/test', function (req, res, next) {
  res.json('test');
});

router.post('/invoice', function (req, res, next) {

  console.log('-> invoice: ', req.body);

  const data = {
    orderId: req.body.orderId,
    userId: req.body.userId,
    category: req.body.mobileNo,
    invoiceNo: `no-${Math.floor(Math.random() * 1000)}`,
    loyaltyPoints: Math.floor(Math.random() * 100),
    warehouseId: req.body.warehouseId
  };

  setTimeout(() => {
    post('invoiceResponse', data)
  }, 5000);

  res.json({});

});

router.post('/transfer', function (req, res, next) {

  console.log('-> transfer: ', req.body);
  const data = {
    orderId: req.body.orderId,
    orderLineId: req.body.orderLineId,
    warehouseId: req.body.warehouseId,
    userId: req.body.userId,
    barcode: req.body.barcode,
    type: req.body.type
  };


  setTimeout(() => {
    post('transferResponse', data)
  }, 5000);

  res.json({});

});

router.post('/receive', function (req, res, next) {

  console.log('-> receive: ', req.body);
  const data = {
    orderId: req.body.orderId,
    orderLineId: req.body.orderLineId,
    warehouseId: req.body.warehouseId,
    userId: req.body.userId,
    barcode: req.body.barcode,
    type: req.body.type
  };


  setTimeout(() => {
    post('receiveResponse', data)
  }, 5000);

  res.json({});

});


async function post(api, body) {

  try {

    let res = await rp({
      method: 'POST',
      uri: `${env.callBackURL}/api/order/offline/${api}`,
      body,
      json: true,
      withCredentials: true,
      jar,
    });

    console.log(res)
  } catch (err) {
    console.log('-> ', err);
  }

}



module.exports = router;
