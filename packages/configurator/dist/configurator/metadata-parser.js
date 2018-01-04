"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CircularJson = require("circular-json");
var _ = require("lodash");
var debug = require('debug')('metadata-parser');
var MetadataParser = /** @class */ (function () {
    function MetadataParser() {
    }
    MetadataParser.parseMetadata = function (metadata) {
        return _.mapValues(metadata, function (val) {
            try {
                return CircularJson.parse(val || {});
            }
            catch (e) {
                debug('parseMetadata: failed to parse', val);
                return {};
            }
        });
    };
    MetadataParser.getMetadata = function (target) {
        var reflect = Reflect;
        if (!reflect || !_.isFunction(reflect.getMetadata)) {
            reflect = require('reflect-metadata').Reflect;
        }
        var rawMetadata = Reflect.getMetadata(MetadataParser.optsKey, target);
        debug('rawMetadata', rawMetadata);
        return rawMetadata || {};
    };
    MetadataParser.getParsedMetadata = function (target) {
        return MetadataParser.parseMetadata(MetadataParser.getMetadata(target));
    };
    MetadataParser.decorate = function (target, key, metadata) {
        var existing = MetadataParser.getMetadata(target);
        existing[key] = CircularJson.stringify(metadata);
        Reflect.defineMetadata(MetadataParser.optsKey, existing, target);
    };
    MetadataParser.getUsage = function (target, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.include, include = _c === void 0 ? [] : _c, _d = _b.exclude, exclude = _d === void 0 ? [] : _d;
        return _(target)
            .thru(MetadataParser.getParsedMetadata)
            .mapValues(function (val, name) { return _.assign(val, { name: name }); })
            .thru(function (parsed) { return _(parsed)
            .values()
            .flatMap(_.keys)
            .concat(['name'])
            .uniq()
            .difference(exclude)
            .thru(function (columns) { return _.isEmpty(include)
            ? columns
            : _.intersection(columns, include); })
            .thru(function (columns) { return [parsed, columns]; })
            .value(); })
            .thru(function (_a) {
            var parsed = _a[0], columns = _a[1];
            return _(parsed).map(function (opt) {
                return _(columns).reduce(function (row, col) {
                    return _.set(row, col, _.get(opt, col, null));
                }, {});
            })
                .thru(function (rows) { return ({ columns: columns, rows: rows }); })
                .value();
        })
            .value();
    };
    return MetadataParser;
}());
exports.MetadataParser = MetadataParser;
//# sourceMappingURL=metadata-parser.js.map