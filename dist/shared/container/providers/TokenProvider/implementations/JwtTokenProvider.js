"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JwtTokenProvider = void 0;

var _auth = _interopRequireDefault(require("../../../../../config/auth"));

var _jsonwebtoken = require("jsonwebtoken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class JwtTokenProvider {
  generateToken(id, roles) {
    const {
      secret_token,
      expires_in_token
    } = _auth.default.jwt;
    const token = (0, _jsonwebtoken.sign)({
      roles
    }, secret_token, {
      subject: id,
      expiresIn: expires_in_token
    });
    return token;
  }

  generateRefreshToken(id, email, roles) {
    const {
      secret_refresh_token,
      expires_in_refresh_token
    } = _auth.default.jwt;
    const token = (0, _jsonwebtoken.sign)({
      email,
      roles
    }, secret_refresh_token, {
      subject: id,
      expiresIn: expires_in_refresh_token
    });
    return token;
  }

  expiresRefreshTokenDays() {
    const {
      expires_refresh_token_days
    } = _auth.default.jwt;
    return expires_refresh_token_days;
  }

  verifyIsValidToken({
    secret_type,
    token
  }) {
    const {
      secret_refresh_token,
      secret_token
    } = _auth.default.jwt;
    let secret;

    if (secret_type === 'refresh') {
      secret = secret_refresh_token;
    } else {
      secret = secret_token;
    }

    const decode = (0, _jsonwebtoken.verify)(token, secret, {
      algorithms: ['HS256']
    });
    return decode;
  }

}

exports.JwtTokenProvider = JwtTokenProvider;