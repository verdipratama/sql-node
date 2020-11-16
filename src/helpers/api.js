import Joi from 'joi';

export function getNextExpirationDate(date = new Date()) {
  return new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
}

export function validateData(data, schema) {
  return new Promise((resolve, reject) => {
    Joi.validate(data, schema, (err, res) => {
      if (err) {
        err.statusCode = 422;
        reject(err);
      }

      resolve(res);
    });
  });
}

export function handleError(err) {
  err.statusCode = err.statusCode || 500;

  return err;
}

export function handleSuccess(data) {
  return {
    status: true,
    data,
    message: null,
  };
}
