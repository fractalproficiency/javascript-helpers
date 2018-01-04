"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var Yargs = require("yargs");
var configurator_1 = require("../configurator");
var util_1 = require("../util");
function ConfigClass() {
    return function (target) {
        var opts;
        var original = target;
        function getOpts(constructed) {
            return configurator_1.MetadataParser.getParsedMetadata(constructed);
        }
        var f = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var constructed = util_1.construct(original, args);
            opts = opts || getOpts(constructed);
            var argv = Yargs.options(opts)
                .argv;
            _.assign(constructed, _.pickBy(argv, function (val, key) { return _.has(opts, key); }));
            return constructed;
        };
        f.prototype = original.prototype;
        return f;
    };
}
exports.ConfigClass = ConfigClass;
//# sourceMappingURL=config.decorator.js.map