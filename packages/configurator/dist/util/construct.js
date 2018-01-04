"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function construct(constructor, args) {
    var c = function () {
        return constructor.apply(this, args);
    };
    c.prototype = constructor.prototype;
    return new c();
}
exports.construct = construct;
//# sourceMappingURL=construct.js.map