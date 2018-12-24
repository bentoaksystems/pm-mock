
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

    console.log('-> ', 'offline system has logged in successfully' );
  } catch (err) {
    console.log('-> ');
    throw err;
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

router.post('/order/invoice', function (req, res, next) {

  console.log('-> invoice: ', req.body);

  const data = {
    orderId: req.body.orderId,
    userId: req.body.userId,
    category: req.body.mobileNo,
    invoiceNo: `no-${Math.floor(Math.random() * 1000)}`,
    loyaltyPoints: Math.floor(Math.random() * 100)
  };

  setTimeout(() => {
    post('verifyInvoice', data)
  }, 5000);

  res.json({});

});

router.post('/order/inventory', function (req, res, next) {

  console.log('-> inventory: ', req.body);
  const data = {
    orderId: req.body.orderId,
    orderLineId: req.body.orderLineId,
    warehouseId: req.body.warehouseId,
    userId: req.body.userId,
    barcode: req.body.barcode
  };


  setTimeout(() => {
    post('verifyOnlineWarehouse', data)
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
