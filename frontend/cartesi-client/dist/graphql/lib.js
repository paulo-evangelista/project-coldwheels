"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInputNotFound = exports.getGraphqlUrl = exports.setDefaultGraphqlOptions = exports.DEFAULT_OUTPUT_INDEX = void 0;
var default_1 = require("../shared/default");
exports.DEFAULT_OUTPUT_INDEX = 0;
function setDefaultGraphqlOptions(options) {
    if (options === undefined)
        options = {};
    if (options.cartesiNodeUrl === undefined) {
        options.cartesiNodeUrl = default_1.DEFAULT_CARTESI_NODE_URL;
    }
    if (options.outputIndex === undefined) {
        options.outputIndex = exports.DEFAULT_OUTPUT_INDEX;
    }
    return options;
}
exports.setDefaultGraphqlOptions = setDefaultGraphqlOptions;
function getGraphqlUrl(options) {
    return "".concat(options.cartesiNodeUrl, "/graphql");
}
exports.getGraphqlUrl = getGraphqlUrl;
function parseError(error) {
    var errorObjIndexStart = error.message.indexOf(":") + 1;
    var errorObjString = error.message.slice(errorObjIndexStart);
    if (errorObjString.length === 0)
        return null;
    try {
        return JSON.parse(errorObjString);
    }
    catch (error) {
        return null;
    }
}
function isInputNotFound(error) {
    var errorObj = parseError(error);
    if (!errorObj)
        return null;
    for (var i = 0; i < errorObj.response.errors.length; i++) {
        var error_1 = errorObj.response.errors[i];
        if (error_1.message === "input not found")
            return true;
    }
    return false;
}
exports.isInputNotFound = isInputNotFound;
