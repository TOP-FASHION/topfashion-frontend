webpackHotUpdate("main",{

/***/ "./src/decorators/MainDecorator/MainDecorator.js":
/*!*******************************************************!*\
  !*** ./src/decorators/MainDecorator/MainDecorator.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var _components_Fragment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Fragment */ "./src/components/Fragment/index.js");
/* harmony import */ var _components_Group__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Group */ "./src/components/Group/index.js");
/* harmony import */ var _utils_isShowModalAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/isShowModalAction */ "./src/utils/isShowModalAction.js");
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Header */ "./src/decorators/Header/index.js");
/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Footer */ "./src/decorators/Footer/index.js");
/* harmony import */ var _pages_Home__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../pages/Home */ "./src/pages/Home/index.js");
/* harmony import */ var _pages_NotFound__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../pages/NotFound */ "./src/pages/NotFound/index.js");
(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};





 // components


 // pages




var MainDecorator =
/*#__PURE__*/
function (_Component) {
  _inherits(MainDecorator, _Component);

  function MainDecorator() {
    _classCallCheck(this, MainDecorator);

    return _possibleConstructorReturn(this, _getPrototypeOf(MainDecorator).apply(this, arguments));
  }

  _createClass(MainDecorator, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !Object(_utils_isShowModalAction__WEBPACK_IMPORTED_MODULE_4__["default"])(nextProps, nextState);
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Fragment__WEBPACK_IMPORTED_MODULE_2__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Group__WEBPACK_IMPORTED_MODULE_3__["default"], {
        id: "main"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "main-decorator__wrapper"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Header__WEBPACK_IMPORTED_MODULE_5__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Group__WEBPACK_IMPORTED_MODULE_3__["default"], {
        className: "main-decorator__content"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        path: "/",
        component: _pages_Home__WEBPACK_IMPORTED_MODULE_7__["default"],
        exact: true
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        component: _pages_NotFound__WEBPACK_IMPORTED_MODULE_8__["default"]
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", {
        className: "main-decorator__footer"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Footer__WEBPACK_IMPORTED_MODULE_6__["default"], null))));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return MainDecorator;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var _default = MainDecorator;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(MainDecorator, "MainDecorator", "D:\\Project\\tigran\\tigran-frontend\\src\\decorators\\MainDecorator\\MainDecorator.js");
  reactHotLoader.register(_default, "default", "D:\\Project\\tigran\\tigran-frontend\\src\\decorators\\MainDecorator\\MainDecorator.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/pages/NotFound/index.js":
/*!*************************************!*\
  !*** ./src/pages/NotFound/index.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module, __dirname) {/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "./node_modules/path-browserify/index.js");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-plugin-universal-import/universalImport */ "./node_modules/babel-plugin-universal-import/universalImport.js");
/* harmony import */ var babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_universal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-universal-component */ "./node_modules/react-universal-component/dist/index.js");
/* harmony import */ var react_universal_component__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_universal_component__WEBPACK_IMPORTED_MODULE_2__);



(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};



var _default = react_universal_component__WEBPACK_IMPORTED_MODULE_2___default()(function () {
  return babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
    id: "./NotFound",
    load: function load() {
      return Promise.all([__webpack_require__.e(/*! import() | NotFound */ "NotFound").then(__webpack_require__.bind(null, /*! ./NotFound */ "./src/pages/NotFound/NotFound.js"))]).then(function (proms) {
        return proms[0];
      });
    },
    path: function path() {
      return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, './NotFound');
    },
    resolve: function resolve() {
      return /*require.resolve*/(/*! ./NotFound */ "./src/pages/NotFound/NotFound.js");
    },
    chunkName: function chunkName() {
      return "NotFound";
    }
  });
}, {
  timeout: 60000
});

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "D:\\Project\\tigran\\tigran-frontend\\src\\pages\\NotFound\\index.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module), "/"))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZGVjb3JhdG9ycy9NYWluRGVjb3JhdG9yL01haW5EZWNvcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL05vdEZvdW5kL2luZGV4LmpzIl0sIm5hbWVzIjpbIk1haW5EZWNvcmF0b3IiLCJuZXh0UHJvcHMiLCJuZXh0U3RhdGUiLCJpc1Nob3dNb2RhbEFjdGlvbiIsIkhvbWUiLCJOb3RGb3VuZCIsIkNvbXBvbmVudCIsInVuaXZlcnNhbCIsInRpbWVvdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0NBR0E7O0FBQ0E7Q0FHQTs7QUFDQTtBQUNBOztJQUVNQSxhOzs7Ozs7Ozs7Ozs7OzBDQUNtQkMsUyxFQUFXQyxTLEVBQVc7QUFDM0MsYUFBTyxDQUFDQyx3RUFBaUIsQ0FBQ0YsU0FBRCxFQUFZQyxTQUFaLENBQXpCO0FBQ0Q7Ozs2QkFFUztBQUNSLGFBQ0UsMkRBQUMsNERBQUQsUUFDRSwyREFBQyx5REFBRDtBQUFPLFVBQUUsRUFBQztBQUFWLFNBQ0U7QUFBSyxpQkFBUyxFQUFDO0FBQWYsU0FDRSwyREFBQywrQ0FBRCxPQURGLEVBRUUsMkRBQUMseURBQUQ7QUFBTyxpQkFBUyxFQUFDO0FBQWpCLFNBQ0UsMkRBQUMsc0RBQUQ7QUFBTyxZQUFJLEVBQUMsR0FBWjtBQUFnQixpQkFBUyxFQUFFRSxtREFBM0I7QUFBaUMsYUFBSztBQUF0QyxRQURGLEVBRUUsMkRBQUMsc0RBQUQ7QUFBTyxpQkFBUyxFQUFFQyx1REFBUUE7QUFBMUIsUUFGRixDQUZGLENBREYsRUFRRTtBQUFRLGlCQUFTLEVBQUM7QUFBbEIsU0FDRSwyREFBQywrQ0FBRCxPQURGLENBUkYsQ0FERixDQURGO0FBZ0JEOzs7Ozs7Ozs7OztFQXRCeUJDLCtDOztlQXlCYk4sYTtBQUFBOzs7Ozs7Ozs7OzBCQXpCVEEsYTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkTjs7ZUFFZU8sZ0VBQVMsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFNLHVKQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx5RUFBYSxZQUFiO0FBQUE7QUFBQTtBQUFBLGlDQUFhLG9EQUFiO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLENBQUQsRUFBNkI7QUFDbkRDLFNBQU8sRUFBRTtBQUQwQyxDQUE3QixDOztBQUFUIiwiZmlsZSI6Im1haW4uMjFkMjE1NDY4YmZmZjAxMjgxMGEuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgUm91dGUgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xyXG5pbXBvcnQgRnJhZ21lbnQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9GcmFnbWVudCdcclxuaW1wb3J0IEdyb3VwIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvR3JvdXAnXHJcbmltcG9ydCBpc1Nob3dNb2RhbEFjdGlvbiBmcm9tICcuLi8uLi91dGlscy9pc1Nob3dNb2RhbEFjdGlvbidcclxuXHJcbi8vIGNvbXBvbmVudHNcclxuaW1wb3J0IEhlYWRlciBmcm9tICcuLi9IZWFkZXInXHJcbmltcG9ydCBGb290ZXIgZnJvbSAnLi4vRm9vdGVyJ1xyXG5cclxuLy8gcGFnZXNcclxuaW1wb3J0IEhvbWUgZnJvbSAnLi4vLi4vcGFnZXMvSG9tZSdcclxuaW1wb3J0IE5vdEZvdW5kIGZyb20gJy4uLy4uL3BhZ2VzL05vdEZvdW5kJ1xyXG5cclxuY2xhc3MgTWFpbkRlY29yYXRvciBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlIChuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gICAgcmV0dXJuICFpc1Nob3dNb2RhbEFjdGlvbihuZXh0UHJvcHMsIG5leHRTdGF0ZSlcclxuICB9XHJcblxyXG4gIHJlbmRlciAoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8RnJhZ21lbnQ+XHJcbiAgICAgICAgPEdyb3VwIGlkPSdtYWluJz5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtYWluLWRlY29yYXRvcl9fd3JhcHBlcic+XHJcbiAgICAgICAgICAgIDxIZWFkZXIgLz5cclxuICAgICAgICAgICAgPEdyb3VwIGNsYXNzTmFtZT0nbWFpbi1kZWNvcmF0b3JfX2NvbnRlbnQnPlxyXG4gICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPScvJyBjb21wb25lbnQ9e0hvbWV9IGV4YWN0IC8+XHJcbiAgICAgICAgICAgICAgPFJvdXRlIGNvbXBvbmVudD17Tm90Rm91bmR9IC8+XHJcbiAgICAgICAgICAgIDwvR3JvdXA+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxmb290ZXIgY2xhc3NOYW1lPSdtYWluLWRlY29yYXRvcl9fZm9vdGVyJz5cclxuICAgICAgICAgICAgPEZvb3RlciAvPlxyXG4gICAgICAgICAgPC9mb290ZXI+XHJcbiAgICAgICAgPC9Hcm91cD5cclxuICAgICAgPC9GcmFnbWVudD5cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1haW5EZWNvcmF0b3JcclxuIiwiaW1wb3J0IHVuaXZlcnNhbCBmcm9tICdyZWFjdC11bml2ZXJzYWwtY29tcG9uZW50J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdW5pdmVyc2FsKCgpID0+IGltcG9ydCgnLi9Ob3RGb3VuZCcpLCB7XHJcbiAgdGltZW91dDogNjAwMDBcclxufSlcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==