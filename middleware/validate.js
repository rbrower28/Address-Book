const validator = require('../helper/validate');

const newAddress = async (req, res, next) => {
  const validationRule = {
    "resident": "required|string"
  };

  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412)
        .send({
          success: false,
          message: 'Validation failed',
          data: err
        });
    } else {
      next();
    }
  }).catch( err => console.log(err))
}

module.exports = {
  newAddress
};