const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET request to /products'
  });
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Handling POST request to /products'
  });
});

router.get('/:id', (req, res, next) => {
  const checkId = req.params.id;

  if (checkId === 'special') {
    res.status(200).json({
      message: 'YOU discovered the special ID',
      checkId: checkId
    });
  } else {
    res.status(200).json({
      message: 'Ups, Wrong ID'
    });
  }
});

router.patch('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Updated product!'
  });
});

router.delete('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Deleted product!'
  });
});

module.exports = router;
