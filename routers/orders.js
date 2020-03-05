const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Order were fetched!'
  });
});

router.post('/', (req, res, next) => {
  const order = {
    id: req.body.id,
    price: req.body.price
  };

  res.status(201).json({
    message: 'Order was created!',
    createdOrder: order
  });
});

router.get('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Order details!',
    id: req.params.id
  });
});

router.delete('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Deleted product!'
  });
});

module.exports = router;
