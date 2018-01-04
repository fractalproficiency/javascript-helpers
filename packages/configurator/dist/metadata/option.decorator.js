"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var index_1 = require("../index");
function Option(opt) {
    return function (target, propKey) {
        index_1.MetadataParser.decorate(target, propKey, opt);
    };
}
exports.Option = Option;
function Switch(opt) {
    _.assign(opt, { boolean: true });
    return Option(opt);
}
exports.Switch = Switch;
//# sourceMappingURL=option.decorator.js.map