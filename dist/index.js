'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

// @ts-ignore
var JsonToUiContext = react.createContext({});
var useJsonToUiContext = function () {
    return react.useContext(JsonToUiContext);
};

var deriveTypeFromValue = function (value) {
    var fromTypeOf = typeof value;
    if (fromTypeOf === 'object') {
        if (!value) {
            return 'null';
        }
        return Array.isArray(value) ? 'array' : 'object';
    }
    return fromTypeOf;
};
var createPath = function (paths) {
    return paths.filter(function (value) { return !!value; }).join('.');
};

var JsonToUiSwitch = function (props) {
    var _a, _b;
    var _c = useJsonToUiContext(), componentByTypeMapping = _c.componentByTypeMapping, customComponentByTypeMapping = _c.customComponentByTypeMapping;
    var valueType = deriveTypeFromValue(props.value);
    var customComponentName = (_b = (_a = props.schema) === null || _a === void 0 ? void 0 : _a.ui) === null || _b === void 0 ? void 0 : _b.component;
    var CustomComponent = customComponentName && customComponentByTypeMapping[customComponentName];
    if (CustomComponent) {
        return jsxRuntime.jsx(CustomComponent, __assign({}, props));
    }
    var ComponentByType = componentByTypeMapping[valueType];
    if (!ComponentByType) {
        console.error("Could not map this value type to a component at path: ".concat(props.path));
        return null;
    }
    switch (valueType) {
        case 'object': {
            return (
            // @ts-ignore we know the value type
            jsxRuntime.jsx(componentByTypeMapping.object, __assign({}, props, { children: jsxRuntime.jsx(JsonToUiTraverse, __assign({}, props)) })));
        }
        case 'array': {
            return (
            // @ts-ignore we know the value type
            jsxRuntime.jsx(componentByTypeMapping.array, __assign({}, props, { children: jsxRuntime.jsx(JsonToUiTraverse, __assign({ isArray: true, Wrapper: componentByTypeMapping.arrayItem }, props)) })));
        }
        default: {
            var Component = componentByTypeMapping[valueType];
            if (!Component) {
                console.error("Could not find a component at path: ".concat(props.path));
                return null;
            }
            return jsxRuntime.jsx(Component, __assign({}, props));
        }
    }
};

var JsonToUiTraverse = function (_a) {
    var Wrapper = _a.Wrapper, isArray = _a.isArray, props = __rest(_a, ["Wrapper", "isArray"]);
    var children = Object.entries(props.value);
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: children.map(function (_a) {
            var _b, _c, _d;
            var key = _a[0], value = _a[1];
            var path = createPath([props.path, key]);
            var schema = isArray
                ? (_b = props.schema) === null || _b === void 0 ? void 0 : _b.items
                : (_d = (_c = props.schema) === null || _c === void 0 ? void 0 : _c.properties) === null || _d === void 0 ? void 0 : _d[key];
            var contentProps = {
                fieldName: key,
                value: value,
                schema: schema,
                path: path,
            };
            var content = jsxRuntime.jsx(JsonToUiSwitch, __assign({}, contentProps), path);
            if (Wrapper) {
                return (jsxRuntime.jsx(Wrapper, __assign({}, contentProps, { children: content }), path));
            }
            return content;
        }) }));
};

var JsonToUi = function (props) {
    return (jsxRuntime.jsx(JsonToUiContext.Provider, { value: props, children: jsxRuntime.jsx(JsonToUiTraverse, { path: "", schema: props.schema, value: props.value }) }));
};

module.exports = JsonToUi;
