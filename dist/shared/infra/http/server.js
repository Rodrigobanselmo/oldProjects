"use strict";

var _app = require("./app");

_app.app.listen(process.env.PORT, () => console.log(`Server is running on http://${process.env.HOST}:${process.env.PORT}/`));