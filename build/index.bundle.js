/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 1);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _createNode = __webpack_require__(/*! ./createNode */ 4);
	
	var _createNode2 = _interopRequireDefault(_createNode);
	
	var _render = __webpack_require__(/*! ./render */ 26);
	
	var _render2 = _interopRequireDefault(_render);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var todos = [];
	localStorage.setItem("todos", (0, _stringify2.default)(todos));
	
	var mapTodos = function mapTodos(todos) {
	  return todos.map(function (todo) {
	    return (0, _createNode2.default)("li", {
	      style: { "margin-bottom": "10px" }
	    }, [todo]);
	  });
	};
	
	var saveTodo = function saveTodo(e) {
	  e.preventDefault();
	  var $inputEl = document.getElementById("text");
	  todos.push($inputEl.value);
	  localStorage.setItem("todos", (0, _stringify2.default)(todos));
	  $inputEl.value = "";
	  (0, _render2.default)(makeTree(), domRoot);
	};
	
	var makeTree = function makeTree() {
	  return (0, _createNode2.default)("div", {}, [(0, _createNode2.default)("form", { style: { "margin-bottom": "20px" } }, [(0, _createNode2.default)("label", {
	    style: {
	      display: "block",
	      "margin-bottom": "10px",
	      "font-weight": 700
	    },
	    onDblClick: function onDblClick() {
	      return console.log("dblclick");
	    }
	  }, ["add a todo"]), (0, _createNode2.default)("input", {
	    style: { display: "block", "margin-bottom": "10px" },
	    type: "text",
	    id: "text"
	  }, [""]), (0, _createNode2.default)("button", {
	    style: { display: "block", "margin-bottom": "10px" },
	    type: "submit",
	    value: "save todo",
	    id: "submit",
	    onClick: saveTodo
	  }, ["Submit"])]), (0, _createNode2.default)("div", {
	    style: { "font-weight": 700 }
	  }, ["todos"]), (0, _createNode2.default)("ul", {}, mapTodos(JSON.parse(localStorage.todos)))]);
	};
	
	var domRoot = document.getElementById("root");
	(0, _render2.default)(makeTree(), domRoot);

/***/ }),
/* 1 */
/*!***************************************************!*\
  !*** ./~/babel-runtime/core-js/json/stringify.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/json/stringify */ 2), __esModule: true };

/***/ }),
/* 2 */
/*!************************************************!*\
  !*** ./~/core-js/library/fn/json/stringify.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

	var core = __webpack_require__(/*! ../../modules/_core */ 3);
	var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
	module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};


/***/ }),
/* 3 */
/*!********************************************!*\
  !*** ./~/core-js/library/modules/_core.js ***!
  \********************************************/
/***/ (function(module, exports) {

	var core = module.exports = { version: '2.6.12' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/*!***************************!*\
  !*** ./src/createNode.js ***!
  \***************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _VirtualNode = __webpack_require__(/*! ./constructors/VirtualNode */ 5);
	
	var createNode = function createNode(elType) {
	  var atts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	
	  return new _VirtualNode.VirtualNode(elType, atts, children);
	};
	
	exports.default = createNode;

/***/ }),
/* 5 */
/*!*****************************************!*\
  !*** ./src/constructors/VirtualNode.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.VirtualNode = exports.VirtualText = undefined;
	
	var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ 6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 25);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*
	 * create nodes
	 */
	var VirtualText = function VirtualText(text) {
	  (0, _classCallCheck3.default)(this, VirtualText);
	
	  this.text = text;
	};
	
	;
	
	var VirtualNode = function () {
	  function VirtualNode(elType, attributes, children) {
	    (0, _classCallCheck3.default)(this, VirtualNode);
	
	    this.elType = elType;
	    this.attributes = attributes;
	    this.children = this._createChildren(children);
	  }
	
	  (0, _createClass3.default)(VirtualNode, [{
	    key: '_createChildren',
	    value: function _createChildren(children) {
	      return children.map(function (child) {
	        if (child instanceof (VirtualNode || VirtualText)) {
	          return child;
	        } else if (typeof child === 'string' || typeof child === 'number') {
	          return new VirtualText(child);
	        } else {
	          return new VirtualNode(child);
	        }
	      });
	    }
	  }]);
	  return VirtualNode;
	}();
	
	;
	
	exports.VirtualText = VirtualText;
	exports.VirtualNode = VirtualNode;

/***/ }),
/* 6 */
/*!************************************************!*\
  !*** ./~/babel-runtime/helpers/createClass.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(/*! ../core-js/object/define-property */ 7);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ }),
/* 7 */
/*!***********************************************************!*\
  !*** ./~/babel-runtime/core-js/object/define-property.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/define-property */ 8), __esModule: true };

/***/ }),
/* 8 */
/*!********************************************************!*\
  !*** ./~/core-js/library/fn/object/define-property.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.define-property */ 9);
	var $Object = __webpack_require__(/*! ../../modules/_core */ 3).Object;
	module.exports = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};


/***/ }),
/* 9 */
/*!*****************************************************************!*\
  !*** ./~/core-js/library/modules/es6.object.define-property.js ***!
  \*****************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(/*! ./_export */ 10);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 19), 'Object', { defineProperty: __webpack_require__(/*! ./_object-dp */ 15).f });


/***/ }),
/* 10 */
/*!**********************************************!*\
  !*** ./~/core-js/library/modules/_export.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(/*! ./_global */ 11);
	var core = __webpack_require__(/*! ./_core */ 3);
	var ctx = __webpack_require__(/*! ./_ctx */ 12);
	var hide = __webpack_require__(/*! ./_hide */ 14);
	var has = __webpack_require__(/*! ./_has */ 24);
	var PROTOTYPE = 'prototype';
	
	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	module.exports = $export;


/***/ }),
/* 11 */
/*!**********************************************!*\
  !*** ./~/core-js/library/modules/_global.js ***!
  \**********************************************/
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 12 */
/*!*******************************************!*\
  !*** ./~/core-js/library/modules/_ctx.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(/*! ./_a-function */ 13);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};


/***/ }),
/* 13 */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_a-function.js ***!
  \**************************************************/
/***/ (function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};


/***/ }),
/* 14 */
/*!********************************************!*\
  !*** ./~/core-js/library/modules/_hide.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(/*! ./_object-dp */ 15);
	var createDesc = __webpack_require__(/*! ./_property-desc */ 23);
	module.exports = __webpack_require__(/*! ./_descriptors */ 19) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};


/***/ }),
/* 15 */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_object-dp.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(/*! ./_an-object */ 16);
	var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 18);
	var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 22);
	var dP = Object.defineProperty;
	
	exports.f = __webpack_require__(/*! ./_descriptors */ 19) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};


/***/ }),
/* 16 */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_an-object.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./_is-object */ 17);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};


/***/ }),
/* 17 */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_is-object.js ***!
  \*************************************************/
/***/ (function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};


/***/ }),
/* 18 */
/*!******************************************************!*\
  !*** ./~/core-js/library/modules/_ie8-dom-define.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(/*! ./_descriptors */ 19) && !__webpack_require__(/*! ./_fails */ 20)(function () {
	  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 21)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 19 */
/*!***************************************************!*\
  !*** ./~/core-js/library/modules/_descriptors.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(/*! ./_fails */ 20)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 20 */
/*!*********************************************!*\
  !*** ./~/core-js/library/modules/_fails.js ***!
  \*********************************************/
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};


/***/ }),
/* 21 */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_dom-create.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./_is-object */ 17);
	var document = __webpack_require__(/*! ./_global */ 11).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};


/***/ }),
/* 22 */
/*!****************************************************!*\
  !*** ./~/core-js/library/modules/_to-primitive.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(/*! ./_is-object */ 17);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};


/***/ }),
/* 23 */
/*!*****************************************************!*\
  !*** ./~/core-js/library/modules/_property-desc.js ***!
  \*****************************************************/
/***/ (function(module, exports) {

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};


/***/ }),
/* 24 */
/*!*******************************************!*\
  !*** ./~/core-js/library/modules/_has.js ***!
  \*******************************************/
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};


/***/ }),
/* 25 */
/*!***************************************************!*\
  !*** ./~/babel-runtime/helpers/classCallCheck.js ***!
  \***************************************************/
/***/ (function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ }),
/* 26 */
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _VirtualNode = __webpack_require__(/*! ./constructors/VirtualNode */ 5);
	
	var _diff = __webpack_require__(/*! ./diff */ 48);
	
	var _diff2 = _interopRequireDefault(_diff);
	
	var _patch = __webpack_require__(/*! ./patch */ 50);
	
	var _patch2 = _interopRequireDefault(_patch);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var tree = new _VirtualNode.VirtualNode("", {}, []);
	
	var render = function render(vRoot, domRoot) {
	  if (!tree.$el) {
	    tree.$el = domRoot;
	  }
	  var patches = (0, _diff2.default)(tree, vRoot);
	  (0, _patch2.default)(domRoot, patches);
	  var newTree = new _VirtualNode.VirtualNode("", {}, [vRoot]);
	  newTree.$el = domRoot;
	  tree = newTree;
	
	  console.log("patchNode", patches[0].patchNode);
	  console.log("vRoot", vRoot);
	
	  return tree;
	};
	
	exports.default = render;

/***/ }),
/* 27 */
/*!******************************!*\
  !*** ./src/createElement.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createElementStyles = undefined;
	
	var _keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ 28);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _VirtualNode = __webpack_require__(/*! ./constructors/VirtualNode */ 5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*
	 * create an HTML node element or text node
	 *
	 * node tree -> HTML element
	 */
	var createElement = function createElement(node) {
	  if (!(node instanceof _VirtualNode.VirtualNode) && !(node instanceof _VirtualNode.VirtualText)) {
	    console.error(node);
	    throw new Error('Please pass a valid node.');
	  }
	
	  if (node instanceof _VirtualNode.VirtualText) {
	    return document.createTextNode(node.text);
	  }
	
	  var elType = node.elType,
	      attributes = node.attributes,
	      children = node.children,
	      id = node.id;
	
	  var $el = document.createElement(elType);
	
	  (0, _keys2.default)(attributes).forEach(function (k) {
	    if (k === 'style') {
	      $el.setAttribute(k, createElementStyles(attributes[k]));
	    } else if (/^on\w*/.test(k)) {
	      $el.addEventListener(k.replace('on', '').toLowerCase(), attributes[k]);
	    } else {
	      $el.setAttribute(k, attributes[k]);
	    }
	  });
	
	  children.map(createElement).forEach($el.appendChild.bind($el));
	
	  return $el;
	};
	
	var createElementStyles = function createElementStyles(stylesMap) {
	  return (0, _keys2.default)(stylesMap).map(function (key) {
	    return key + ': ' + stylesMap[key];
	  }).join('; ');
	};
	
	exports.default = createElement;
	exports.createElementStyles = createElementStyles;

/***/ }),
/* 28 */
/*!************************************************!*\
  !*** ./~/babel-runtime/core-js/object/keys.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/keys */ 29), __esModule: true };

/***/ }),
/* 29 */
/*!*********************************************!*\
  !*** ./~/core-js/library/fn/object/keys.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.keys */ 30);
	module.exports = __webpack_require__(/*! ../../modules/_core */ 3).Object.keys;


/***/ }),
/* 30 */
/*!******************************************************!*\
  !*** ./~/core-js/library/modules/es6.object.keys.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(/*! ./_to-object */ 31);
	var $keys = __webpack_require__(/*! ./_object-keys */ 33);
	
	__webpack_require__(/*! ./_object-sap */ 47)('keys', function () {
	  return function keys(it) {
	    return $keys(toObject(it));
	  };
	});


/***/ }),
/* 31 */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_to-object.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(/*! ./_defined */ 32);
	module.exports = function (it) {
	  return Object(defined(it));
	};


/***/ }),
/* 32 */
/*!***********************************************!*\
  !*** ./~/core-js/library/modules/_defined.js ***!
  \***********************************************/
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};


/***/ }),
/* 33 */
/*!***************************************************!*\
  !*** ./~/core-js/library/modules/_object-keys.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(/*! ./_object-keys-internal */ 34);
	var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 46);
	
	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};


/***/ }),
/* 34 */
/*!************************************************************!*\
  !*** ./~/core-js/library/modules/_object-keys-internal.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	var has = __webpack_require__(/*! ./_has */ 24);
	var toIObject = __webpack_require__(/*! ./_to-iobject */ 35);
	var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 38)(false);
	var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 42)('IE_PROTO');
	
	module.exports = function (object, names) {
	  var O = toIObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};


/***/ }),
/* 35 */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_to-iobject.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(/*! ./_iobject */ 36);
	var defined = __webpack_require__(/*! ./_defined */ 32);
	module.exports = function (it) {
	  return IObject(defined(it));
	};


/***/ }),
/* 36 */
/*!***********************************************!*\
  !*** ./~/core-js/library/modules/_iobject.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(/*! ./_cof */ 37);
	// eslint-disable-next-line no-prototype-builtins
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};


/***/ }),
/* 37 */
/*!*******************************************!*\
  !*** ./~/core-js/library/modules/_cof.js ***!
  \*******************************************/
/***/ (function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};


/***/ }),
/* 38 */
/*!******************************************************!*\
  !*** ./~/core-js/library/modules/_array-includes.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(/*! ./_to-iobject */ 35);
	var toLength = __webpack_require__(/*! ./_to-length */ 39);
	var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 41);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};


/***/ }),
/* 39 */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_to-length.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(/*! ./_to-integer */ 40);
	var min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};


/***/ }),
/* 40 */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_to-integer.js ***!
  \**************************************************/
/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};


/***/ }),
/* 41 */
/*!*********************************************************!*\
  !*** ./~/core-js/library/modules/_to-absolute-index.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(/*! ./_to-integer */ 40);
	var max = Math.max;
	var min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};


/***/ }),
/* 42 */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_shared-key.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(/*! ./_shared */ 43)('keys');
	var uid = __webpack_require__(/*! ./_uid */ 45);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};


/***/ }),
/* 43 */
/*!**********************************************!*\
  !*** ./~/core-js/library/modules/_shared.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

	var core = __webpack_require__(/*! ./_core */ 3);
	var global = __webpack_require__(/*! ./_global */ 11);
	var SHARED = '__core-js_shared__';
	var store = global[SHARED] || (global[SHARED] = {});
	
	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: core.version,
	  mode: __webpack_require__(/*! ./_library */ 44) ? 'pure' : 'global',
	  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	});


/***/ }),
/* 44 */
/*!***********************************************!*\
  !*** ./~/core-js/library/modules/_library.js ***!
  \***********************************************/
/***/ (function(module, exports) {

	module.exports = true;


/***/ }),
/* 45 */
/*!*******************************************!*\
  !*** ./~/core-js/library/modules/_uid.js ***!
  \*******************************************/
/***/ (function(module, exports) {

	var id = 0;
	var px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};


/***/ }),
/* 46 */
/*!*****************************************************!*\
  !*** ./~/core-js/library/modules/_enum-bug-keys.js ***!
  \*****************************************************/
/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');


/***/ }),
/* 47 */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_object-sap.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(/*! ./_export */ 10);
	var core = __webpack_require__(/*! ./_core */ 3);
	var fails = __webpack_require__(/*! ./_fails */ 20);
	module.exports = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
	};


/***/ }),
/* 48 */
/*!*********************!*\
  !*** ./src/diff.js ***!
  \*********************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.recursivelyAssignEls = exports.attsAreSame = exports.walk = undefined;
	
	var _keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ 28);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _VirtualPatch = __webpack_require__(/*! ./constructors/VirtualPatch */ 49);
	
	var _VirtualPatch2 = _interopRequireDefault(_VirtualPatch);
	
	var _VirtualNode = __webpack_require__(/*! ./constructors/VirtualNode */ 5);
	
	var _createElement = __webpack_require__(/*! ./createElement */ 27);
	
	var _createElement2 = _interopRequireDefault(_createElement);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*
	 * diff two trees
	 *
	 * return array of patches
	 */
	var diff = function diff(oldTree, newTree) {
	  // this grabs the first child from the #root element,
	  // which we don't want to modify
	  var oldNode = oldTree.children[0];
	  return walk(oldNode, newTree, oldTree);
	};
	
	var walk = function walk(oldNode, newNode, oldParentNode) {
	  if (oldNode === newNode) {
	    return;
	  }
	
	  if (!oldNode) {
	    // ADD
	    recursivelyAssignEls((0, _createElement2.default)(newNode), newNode);
	    return [new _VirtualPatch2.default(newNode, oldParentNode, 'ADD')];
	  } else if (!newNode) {
	    // DEL
	    return [new _VirtualPatch2.default(oldNode, oldParentNode, 'DEL')];
	  } else if (oldNode instanceof _VirtualNode.VirtualText && newNode instanceof _VirtualNode.VirtualText) {
	    if (oldNode.text !== newNode.text) {
	      // REPL
	      // a. is text node with different values
	      recursivelyAssignEls((0, _createElement2.default)(newNode), newNode);
	      return [new _VirtualPatch2.default(newNode, oldParentNode, 'REPL', oldNode)];
	    }
	    // b. no difference
	    return;
	  } else {
	    if (oldNode.elType !== newNode.elType || !attsAreSame(oldNode.attributes, newNode.attributes)) {
	      // REPL
	      // c. are different types
	      // d. have different attributes
	      // TODO: only change the atts, not entire node
	      recursivelyAssignEls((0, _createElement2.default)(newNode), newNode);
	      return [new _VirtualPatch2.default(newNode, oldParentNode, 'REPL', oldNode)];
	    } else {
	      // check children
	      // TODO: allow for individual children to change, rather than modifying
	      // all children after a changed node
	
	      newNode.$el = oldNode.$el;
	
	      var maxChildren = Math.max(oldNode.children.length, newNode.children.length);
	      var childPatchesArray = [];
	
	      for (var i = 0; i <= maxChildren; i++) {
	        var oldNodeChild = oldNode.children[i];
	        var newNodeChild = newNode.children[i];
	        var childPatch = walk(oldNodeChild, newNodeChild, oldNode);
	        if (childPatch) {
	          childPatchesArray = childPatchesArray.concat(childPatch);
	        }
	      }
	      return childPatchesArray;
	    }
	  }
	};
	
	var recursivelyAssignEls = function recursivelyAssignEls($node, newNode) {
	  newNode.$el = $node;
	  if ($node.hasChildNodes() && $node.nodeType !== 3) {
	    for (var i = 0; i < $node.childNodes.length; i++) {
	      recursivelyAssignEls($node.childNodes[i], newNode.children[i]);
	    }
	  }
	};
	
	var attsAreSame = function attsAreSame(oldTreeAtts, newTreeAtts) {
	  if (!oldTreeAtts || !newTreeAtts) return true;
	
	  var oldTreeAttsKeys = (0, _keys2.default)(oldTreeAtts);
	  var newTreeAttsKeys = (0, _keys2.default)(newTreeAtts);
	
	  if (oldTreeAttsKeys.length !== newTreeAttsKeys.length) {
	    return false;
	  }
	
	  for (var i = 0; i < oldTreeAttsKeys.length; i++) {
	    var key = oldTreeAttsKeys[i];
	    if (oldTreeAtts.hasOwnProperty(key) && newTreeAtts.hasOwnProperty(key)) {
	      if (key === 'style') {
	        if (!attsAreSame(oldTreeAtts[key], newTreeAtts[key])) {
	          return false;
	        }
	      } else if (/^on\w*/.test(key)) {
	        if (newTreeAtts[key].toString() !== oldTreeAtts[key].toString()) {
	          return false;
	        }
	      } else {
	        if (oldTreeAtts[key] !== newTreeAtts[key]) {
	          return false;
	        }
	      }
	    }
	  }
	
	  return true;
	};
	
	exports.default = diff;
	exports.walk = walk;
	exports.attsAreSame = attsAreSame;
	exports.recursivelyAssignEls = recursivelyAssignEls;

/***/ }),
/* 49 */
/*!******************************************!*\
  !*** ./src/constructors/VirtualPatch.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 25);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var VirtualPatch = function VirtualPatch(patchNode, parentNode, type, replTarget) {
	  (0, _classCallCheck3.default)(this, VirtualPatch);
	
	  this.patchNode = patchNode;
	  this.parentNode = parentNode;
	  this.type = type;
	  this.replTarget = replTarget;
	};
	
	;
	
	exports.default = VirtualPatch;

/***/ }),
/* 50 */
/*!**********************!*\
  !*** ./src/patch.js ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.applyPatch = undefined;
	
	var _VirtualPatch = __webpack_require__(/*! ./constructors/VirtualPatch */ 49);
	
	var _VirtualPatch2 = _interopRequireDefault(_VirtualPatch);
	
	var _VirtualNode = __webpack_require__(/*! ./constructors/VirtualNode */ 5);
	
	var _createElement = __webpack_require__(/*! ./createElement */ 27);
	
	var _createElement2 = _interopRequireDefault(_createElement);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*
	 * apply patches to root tree
	 *
	 * apply patches to dom nodes
	 */
	var patch = function patch(domNode, patches) {
	  // need to reverse patches so they get applied in order
	  patches.reverse().forEach(applyPatch);
	
	  return domNode;
	};
	
	var applyPatch = function applyPatch(_ref) {
	  var patchNode = _ref.patchNode,
	      parentNode = _ref.parentNode,
	      type = _ref.type,
	      replTarget = _ref.replTarget;
	
	  if (type === 'ADD') {
	    parentNode.$el.appendChild(patchNode.$el);
	  } else if (type === 'DEL') {
	    parentNode.$el.removeChild($patchEl);
	  } else if (type === 'REPL') {
	    parentNode.$el.replaceChild(patchNode.$el, replTarget.$el);
	  }
	};
	
	exports.default = patch;
	exports.applyPatch = applyPatch;

/***/ })
/******/ ]);
//# sourceMappingURL=index.bundle.js.map