var express = require('express');
var router = express.Router();

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
    order_id: req.body.order_id
  };

  const values = {
    total_price: req.body.total_price,
    used_point: req.body.used_point,
    used_balance: req.body.used_balance
  };

  for(let key in values){
    if(values.hasOwnProperty(key)){
      values[key] += (multiplier * Math.floor(Math.random() * values[key]))
    }
  }

  res.json(Object.assign(values, data));
});


module.exports = router;
