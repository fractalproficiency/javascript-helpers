"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var configurator_1 = require("../configurator");
var _ = require("lodash");
var util_1 = require("../util");
var escape = require('markdown-escape');
if (_.endsWith(__filename, 'js')) {
    require('ts-node').register({
        compilerOptions: {
            emitDecoratorMetadata: true,
            experimentalDecorators: true
        }
    });
}
var MarkdownTools = /** @class */ (function () {
    function MarkdownTools() {
    }
    MarkdownTools.usageTableFromFile = function (filename, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.include, include = _c === void 0 ? [] : _c, _d = _b.exclude, exclude = _d === void 0 ? [] : _d;
        try {
            var imported = require(filename);
            return _(imported)
                .map(function (importedClass) { return importedClass; })
                .concat(imported)
                .map(function (importedClass) {
                try {
                    var instance = util_1.construct(importedClass, []);
                    return MarkdownTools.usageTable(instance, { include: include, exclude: exclude });
                }
                catch (e) {
                    return;
                }
            })
                .reject(_.isNil)
                .value();
        }
        catch (e) {
            var errMessage = 'Could not import file ' + filename;
            console.error(errMessage, e);
            var error = new Error(errMessage);
            error['internal'] = e;
            throw error;
        }
    };
    MarkdownTools.usageTable = function (instance, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.include, include = _c === void 0 ? [] : _c, _d = _b.exclude, exclude = _d === void 0 ? [] : _d;
        return _(instance)
            .thru(function (i) { return configurator_1.MetadataParser.getUsage(i, { include: include, exclude: exclude }); })
            .thru(function (_a) {
            var rows = _a.rows, columns = _a.columns;
            return _(columns)
                .sort()
                .sortBy(function (c) { return c !== 'name'; })
                .thru(function (cols) { return [
                _.map(cols, _.startCase),
                _.map(cols, function (col) { return '---'; })
            ].concat(_.map(rows, function (row) {
                return _.map(cols, function (col) { return _.get(row, col, ' '); });
            })); })
                .map(function (row) {
                try {
                    return _(row)
                        .map(function (val) { return _.isNil(val) ?
                        ' '
                        : val; })
                        .map(function (val) { return _.toString(val); })
                        .map(function (val) { return escape(val); })
                        .value();
                }
                catch (e) {
                    console.log('caught error while cleaning row', row, e);
                    return row;
                }
            })
                .map(function (row) { return _.join(row, '|'); })
                .join('\n');
        })
            .value();
    };
    return MarkdownTools;
}());
exports.MarkdownTools = MarkdownTools;
//# sourceMappingURL=markdown.js.map