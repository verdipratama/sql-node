/* eslint-disable no-useless-catch */
import jwt from 'jsonwebtoken';
import { config } from './../../config/config';

export const TokenProcessor = (function () {
  const primaryOptions = {
    issuer: config.tokenIssuer,
    expiresIn: '5m',
  };

  const primarySecret = config.primarySecret;
  const syncSecret = config.syncSecret;

  const isPrimaryPayload = function (decoded) {
    return (
      decoded &&
      typeof decoded === 'object' &&
      Object.keys(decoded).length == 3 &&
      'id' in decoded &&
      'isAdmin' in decoded &&
      'ip' in decoded &&
      typeof decoded['id'] === 'number' &&
      typeof decoded['isAdmin'] === 'boolean' &&
      typeof decoded['ip'] === 'string'
    );
  };

  const isSyncPayload = function (decoded) {
    return decoded && typeof decoded === 'string';
  };

  const decodePrimaryToken = function (token) {
    try {
      const result = jwt.decode(token);

      if (!isPrimaryPayload(result)) {
        const err = new Error('Invalid token');
        err.statusCode = 422;

        throw err;
      }

      return result;
    } catch (err) {
      throw err;
    }
  };

  const verifyPrimaryToken = function (
    token,
    secret,
    options = primaryOptions,
  ) {
    try {
      const result = jwt.verify(token, secret, options);

      if (!isPrimaryPayload(result)) {
        const err = new Error('Invalid token');
        err.statusCode = 422;

        throw err;
      }

      return result;
    } catch (err) {
      throw err;
    }
  };

  const verifySyncToken = function (token, secret, comparator) {
    try {
      const result = jwt.verify(token, secret);

      if (!isSyncPayload(result) || result !== comparator) {
        const err = new Error('Invalid token');
        err.statusCode = 422;

        throw err;
      }

      return result;
    } catch (err) {
      throw err;
    }
  };

  return {
    generateToken: function (user) {
      try {
        if (!isPrimaryPayload(user)) {
          const err = new Error('Invalid primary payload');
          err.statusCode = 422;

          throw err;
        }

        const primaryRes = jwt.sign(user, primarySecret, primaryOptions);

        const syncRes = jwt.sign(primaryRes, syncSecret);

        return {
          primary: primaryRes,
          sync: syncRes,
        };
      } catch (err) {
        throw err;
      }
    },

    refreshToken: function (token) {
      try {
        const decoded = decodePrimaryToken(token);

        return this.generateToken(decoded);
      } catch (err) {
        throw err;
      }
    },

    verifyToken: function (token, sync) {
      try {
        const verifyPrimary = verifyPrimaryToken(token, primarySecret);
        verifySyncToken(sync, syncSecret, token);

        return verifyPrimary;
      } catch (err) {
        throw err;
      }
    },

    refreshable: async function (token, sync) {
      try {
        verifySyncToken(token, sync);
      } catch (err) {
        throw err;
      }
    },
  };
})();
