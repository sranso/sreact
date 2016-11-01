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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 48);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _createNode = __webpack_require__(/*! ./createNode */ 1);
	
	var _createNode2 = _interopRequireDefault(_createNode);
	
	var _render = __webpack_require__(/*! ./render */ 23);
	
	var _render2 = _interopRequireDefault(_render);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var todos = [];
	localStorage.setItem('todos', (0, _stringify2.default)(todos));
	
	var mapTodos = function mapTodos(todos) {
	  return todos.map(function (todo) {
	    return (0, _createNode2.default)('li', { style: { 'margin-bottom': '10px' } }, [todo]);
	  });
	};
	
	var saveTodo = function saveTodo(e) {
	  e.preventDefault();
	  var $inputEl = document.getElementById('text');
	  todos.push($inputEl.value);
	  localStorage.setItem('todos', (0, _stringify2.default)(todos));
	  $inputEl.value = '';
	  (0, _render2.default)(makeTree(), domRoot);
	};
	
	var makeTree = function makeTree() {
	  return (0, _createNode2.default)('div', {}, [(0, _createNode2.default)('form', { style: { 'margin-bottom': '20px' } }, [(0, _createNode2.default)('label', {
	    style: { display: 'block', 'margin-bottom': '10px', 'font-weight': 700 },
	    onDblClick: function onDblClick() {
	      return console.log('dblclick');
	    }
	  }, ['add a todo']), (0, _createNode2.default)('input', {
	    style: { display: 'block', 'margin-bottom': '10px' },
	    type: 'text',
	    id: 'text'
	  }, ['']), (0, _createNode2.default)('input', {
	    style: { display: 'block', 'margin-bottom': '10px' },
	    type: 'submit',
	    value: 'save todo',
	    id: 'submit',
	    onClick: saveTodo
	  }, [''])]), (0, _createNode2.default)('div', { style: { 'font-weight': 700 } }, ['todos']), (0, _createNode2.default)('ul', {}, mapTodos(JSON.parse(localStorage.todos)))]);
	};
	
	var domRoot = document.getElementById('root');
	(0, _render2.default)(makeTree(), domRoot);

/***/ },
/* 1 */
/*!***************************!*\
  !*** ./src/createNode.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _VirtualNode = __webpack_require__(/*! ./constructors/VirtualNode */ 2);
	
	var createNode = function createNode(elType) {
	  var atts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	
	  return new _VirtualNode.VirtualNode(elType, atts, children);
	};
	
	exports.default = createNode;

/***/ },
/* 2 */
/*!*****************************************!*\
  !*** ./src/constructors/VirtualNode.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.VirtualNode = exports.VirtualText = undefined;
	
	var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ 3);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 22);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*
	 * create a node tree
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

/***/ },
/* 3 */
/*!************************************************!*\
  !*** ./~/babel-runtime/helpers/createClass.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(/*! ../core-js/object/define-property */ 4);
	
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

/***/ },
/* 4 */
/*!***********************************************************!*\
  !*** ./~/babel-runtime/core-js/object/define-property.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/define-property */ 5), __esModule: true };

/***/ },
/* 5 */
/*!************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/fn/object/define-property.js ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.define-property */ 6);
	var $Object = __webpack_require__(/*! ../../modules/_core */ 9).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 6 */
/*!*********************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es6.object.define-property.js ***!
  \*********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(/*! ./_export */ 7);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 17), 'Object', {defineProperty: __webpack_require__(/*! ./_object-dp */ 13).f});

/***/ },
/* 7 */
/*!**************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_export.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(/*! ./_global */ 8)
	  , core      = __webpack_require__(/*! ./_core */ 9)
	  , ctx       = __webpack_require__(/*! ./_ctx */ 10)
	  , hide      = __webpack_require__(/*! ./_hide */ 12)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
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
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
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

/***/ },
/* 8 */
/*!**************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_global.js ***!
  \**************************************************************/
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 9 */
/*!************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_core.js ***!
  \************************************************************/
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 10 */
/*!***********************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_ctx.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(/*! ./_a-function */ 11);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 11 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_a-function.js ***!
  \******************************************************************/
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 12 */
/*!************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_hide.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(/*! ./_object-dp */ 13)
	  , createDesc = __webpack_require__(/*! ./_property-desc */ 21);
	module.exports = __webpack_require__(/*! ./_descriptors */ 17) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 13 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-dp.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(/*! ./_an-object */ 14)
	  , IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 16)
	  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 20)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(/*! ./_descriptors */ 17) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 14 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_an-object.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./_is-object */ 15);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 15 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_is-object.js ***!
  \*****************************************************************/
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 16 */
/*!**********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_ie8-dom-define.js ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(/*! ./_descriptors */ 17) && !__webpack_require__(/*! ./_fails */ 18)(function(){
	  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 19)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 17 */
/*!*******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_descriptors.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(/*! ./_fails */ 18)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 18 */
/*!*************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_fails.js ***!
  \*************************************************************/
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 19 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_dom-create.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./_is-object */ 15)
	  , document = __webpack_require__(/*! ./_global */ 8).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 20 */
/*!********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_to-primitive.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(/*! ./_is-object */ 15);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 21 */
/*!*********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_property-desc.js ***!
  \*********************************************************************/
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 22 */
/*!***************************************************!*\
  !*** ./~/babel-runtime/helpers/classCallCheck.js ***!
  \***************************************************/
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 23 */
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createElement = __webpack_require__(/*! ./createElement */ 24);
	
	var _createElement2 = _interopRequireDefault(_createElement);
	
	var _createNode = __webpack_require__(/*! ./createNode */ 1);
	
	var _createNode2 = _interopRequireDefault(_createNode);
	
	var _VirtualNode = __webpack_require__(/*! ./constructors/VirtualNode */ 2);
	
	var _diff = __webpack_require__(/*! ./diff */ 45);
	
	var _diff2 = _interopRequireDefault(_diff);
	
	var _patch = __webpack_require__(/*! ./patch */ 47);
	
	var _patch2 = _interopRequireDefault(_patch);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var tree = new _VirtualNode.VirtualNode('', {}, []);
	
	var render = function render(vRoot, domRoot) {
	  if (!tree.$el) {
	    tree.$el = domRoot;
	  }
	  var patches = (0, _diff2.default)(tree, vRoot);
	  (0, _patch2.default)(domRoot, patches);
	  var newTree = new _VirtualNode.VirtualNode('', {}, [vRoot]);
	  newTree.$el = domRoot;
	  tree = newTree;
	
	  return tree;
	};
	
	exports.default = render;

/***/ },
/* 24 */
/*!******************************!*\
  !*** ./src/createElement.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createElementStyles = undefined;
	
	var _keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ 25);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _VirtualNode = __webpack_require__(/*! ./constructors/VirtualNode */ 2);
	
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
	
	  var elType = node.elType;
	  var attributes = node.attributes;
	  var children = node.children;
	  var id = node.id;
	
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

/***/ },
/* 25 */
/*!************************************************!*\
  !*** ./~/babel-runtime/core-js/object/keys.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/keys */ 26), __esModule: true };

/***/ },
/* 26 */
/*!*************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/fn/object/keys.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.keys */ 27);
	module.exports = __webpack_require__(/*! ../../modules/_core */ 9).Object.keys;

/***/ },
/* 27 */
/*!**********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es6.object.keys.js ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(/*! ./_to-object */ 28)
	  , $keys    = __webpack_require__(/*! ./_object-keys */ 30);
	
	__webpack_require__(/*! ./_object-sap */ 44)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 28 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_to-object.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(/*! ./_defined */ 29);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 29 */
/*!***************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_defined.js ***!
  \***************************************************************/
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 30 */
/*!*******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-keys.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(/*! ./_object-keys-internal */ 31)
	  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 43);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 31 */
/*!****************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-keys-internal.js ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(/*! ./_has */ 32)
	  , toIObject    = __webpack_require__(/*! ./_to-iobject */ 33)
	  , arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 36)(false)
	  , IE_PROTO     = __webpack_require__(/*! ./_shared-key */ 40)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 32 */
/*!***********************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_has.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 33 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_to-iobject.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(/*! ./_iobject */ 34)
	  , defined = __webpack_require__(/*! ./_defined */ 29);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 34 */
/*!***************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_iobject.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(/*! ./_cof */ 35);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 35 */
/*!***********************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_cof.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 36 */
/*!**********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_array-includes.js ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(/*! ./_to-iobject */ 33)
	  , toLength  = __webpack_require__(/*! ./_to-length */ 37)
	  , toIndex   = __webpack_require__(/*! ./_to-index */ 39);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 37 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_to-length.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(/*! ./_to-integer */ 38)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 38 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_to-integer.js ***!
  \******************************************************************/
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 39 */
/*!****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_to-index.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(/*! ./_to-integer */ 38)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 40 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_shared-key.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(/*! ./_shared */ 41)('keys')
	  , uid    = __webpack_require__(/*! ./_uid */ 42);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 41 */
/*!**************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_shared.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(/*! ./_global */ 8)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 42 */
/*!***********************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_uid.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 43 */
/*!*********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_enum-bug-keys.js ***!
  \*********************************************************************/
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 44 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-sap.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(/*! ./_export */ 7)
	  , core    = __webpack_require__(/*! ./_core */ 9)
	  , fails   = __webpack_require__(/*! ./_fails */ 18);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 45 */
/*!*********************!*\
  !*** ./src/diff.js ***!
  \*********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.recursivelyAssignEls = exports.attsAreSame = exports.walk = undefined;
	
	var _keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ 25);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _VirtualPatch = __webpack_require__(/*! ./constructors/VirtualPatch */ 46);
	
	var _VirtualPatch2 = _interopRequireDefault(_VirtualPatch);
	
	var _VirtualNode = __webpack_require__(/*! ./constructors/VirtualNode */ 2);
	
	var _createElement = __webpack_require__(/*! ./createElement */ 24);
	
	var _createElement2 = _interopRequireDefault(_createElement);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*
	 * diff two trees
	 *
	 * return array of patches
	 */
	var diff = function diff(oldTree, newTree) {
	  return walk(oldTree.children[0], newTree, oldTree);
	};
	
	var walk = function walk(oldTree, newTree, parentNode) {
	  if (oldTree === newTree) {
	    return;
	  }
	
	  if (!oldTree) {
	    // ADD
	    newTree.$el = (0, _createElement2.default)(newTree);
	    recursivelyAssignEls(newTree.$el, newTree);
	    return [new _VirtualPatch2.default(newTree, parentNode, 'ADD')];
	  } else if (!newTree) {
	    // DEL
	    return [new _VirtualPatch2.default(oldTree, parentNode, 'DEL')];
	  } else if (oldTree instanceof _VirtualNode.VirtualText && newTree instanceof _VirtualNode.VirtualText) {
	    if (oldTree.text !== newTree.text) {
	      // REPL
	      // a. is text node with diff values
	      newTree.$el = (0, _createElement2.default)(newTree);
	      recursivelyAssignEls(newTree.$el, newTree);
	      return [new _VirtualPatch2.default(newTree, parentNode, 'REPL', oldTree)];
	    } else {
	      return;
	    }
	  } else {
	    if (oldTree.elType !== newTree.elType || !attsAreSame(oldTree.attributes, newTree.attributes)) {
	      // REPL
	      // b. are different types
	      // c. have different attributes
	      // TODO: only change the atts, not entire node
	      newTree.$el = (0, _createElement2.default)(newTree);
	      recursivelyAssignEls(newTree.$el, newTree);
	      return [new _VirtualPatch2.default(newTree, parentNode, 'REPL', oldTree)];
	    } else {
	      // check children
	      // TODO: allow for individual children to change, rather than modifying
	      // all children after a changed node
	
	      newTree.$el = oldTree.$el;
	
	      var maxChildren = Math.max(oldTree.children.length, newTree.children.length);
	      var childPatchesArray = [];
	
	      for (var i = 0; i <= maxChildren; i++) {
	        var oldTreeChild = oldTree.children[i];
	        var newTreeChild = newTree.children[i];
	        var childPatch = walk(oldTreeChild, newTreeChild, oldTree);
	        if (childPatch) {
	          childPatchesArray = childPatchesArray.concat(childPatch);
	        }
	      }
	      return childPatchesArray;
	    }
	  }
	};
	
	var recursivelyAssignEls = function recursivelyAssignEls(node, newTree) {
	  newTree.$el = node;
	  if (node.childNodes && node.nodeType !== 3) {
	    for (var i = 0; i < node.childNodes.length; i++) {
	      recursivelyAssignEls(node.childNodes[i], newTree.children[i]);
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

/***/ },
/* 46 */
/*!******************************************!*\
  !*** ./src/constructors/VirtualPatch.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 22);
	
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

/***/ },
/* 47 */
/*!**********************!*\
  !*** ./src/patch.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.applyPatch = undefined;
	
	var _VirtualPatch = __webpack_require__(/*! ./constructors/VirtualPatch */ 46);
	
	var _VirtualPatch2 = _interopRequireDefault(_VirtualPatch);
	
	var _VirtualNode = __webpack_require__(/*! ./constructors/VirtualNode */ 2);
	
	var _createElement = __webpack_require__(/*! ./createElement */ 24);
	
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
	  var patchNode = _ref.patchNode;
	  var parentNode = _ref.parentNode;
	  var type = _ref.type;
	  var replTarget = _ref.replTarget;
	
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

/***/ },
/* 48 */
/*!***************************************************!*\
  !*** ./~/babel-runtime/core-js/json/stringify.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/json/stringify */ 49), __esModule: true };

/***/ },
/* 49 */
/*!****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/fn/json/stringify.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(/*! ../../modules/_core */ 9)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ }
/******/ ]);
//# sourceMappingURL=index.bundle.js.map