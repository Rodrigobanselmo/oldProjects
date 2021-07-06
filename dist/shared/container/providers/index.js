"use strict";

var _tsyringe = require("tsyringe");

var _DayJSProvider = require("./DateProvider/implementations/DayJSProvider");

var _BCryptProvider = require("./HashProvider/implementations/BCryptProvider");

var _EtherealMailProvider = require("./MailProvider/implementations/EtherealMailProvider");

var _JwtTokenProvider = require("./TokenProvider/implementations/JwtTokenProvider");

_tsyringe.container.registerSingleton('DateProvider', _DayJSProvider.DayJSProvider);

_tsyringe.container.registerSingleton('HashProvider', _BCryptProvider.BCryptProvider);

_tsyringe.container.registerInstance('MailProvider', new _EtherealMailProvider.EtherealMailProvider());

_tsyringe.container.registerSingleton('TokenProvider', _JwtTokenProvider.JwtTokenProvider);