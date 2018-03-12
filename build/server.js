/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__webpack_config_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__webpack_config_helpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__webpack_config_helpers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_routes__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_routes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__src_constants_routes__);





const app = __WEBPACK_IMPORTED_MODULE_0_express___default()();

// `${routes.BASE_URL}/assets`;
//
// app.use(`${routes.BASE_URL}/assets`, express.static(helpers.root('/build/assets')));
//
app.get('/', function(req, res) {
    res.sendFile(__WEBPACK_IMPORTED_MODULE_1__webpack_config_helpers___default.a.root('/build/index.html'));
});

app.use(`/${__WEBPACK_IMPORTED_MODULE_2__src_constants_routes___default.a.BASE_URL}`, __WEBPACK_IMPORTED_MODULE_0_express___default.a.static(__WEBPACK_IMPORTED_MODULE_1__webpack_config_helpers___default.a.root('/build')));

app.listen(8080, function () {
    console.log('routes.BASE_URL', __WEBPACK_IMPORTED_MODULE_2__src_constants_routes___default.a.BASE_URL);
    console.log('Example app listening on port 8080!');
});



/***/ }),
/* 1 */
/***/ (function(module, exports) {

const BASE_URL = process.env.NODE_ENV === 'production' ?
    'blockRouting/build/'
    : '/';

const MAIN_PAGE_ROUTE = '/';
const SUB_PAGE_ROUTE = MAIN_PAGE_ROUTE + 'sub';

module.exports = {
    BASE_URL,
    MAIN_PAGE_ROUTE,
    SUB_PAGE_ROUTE
};



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {const fs = __webpack_require__(4);

const path = __webpack_require__(5);

const ROOT = path.resolve(__dirname, '..');
const root = path.join.bind(path, ROOT);
const writeJSON = function (file) {
    fs.writeFile(root('result.webpack.config.json'), JSON.stringify(file, null, 4), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
};

exports.root = root;
exports.writeJSON = writeJSON;

/* WEBPACK VAR INJECTION */}.call(exports, "webpack-config"))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);