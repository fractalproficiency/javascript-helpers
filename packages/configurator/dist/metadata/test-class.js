"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_decorator_1 = require("./config.decorator");
var option_decorator_1 = require("./option.decorator");
var Config = /** @class */ (function () {
    function Config(stuff) {
    }
    __decorate([
        option_decorator_1.Option({
            alias: 'we'
        }),
        __metadata("design:type", String)
    ], Config.prototype, "whatever", void 0);
    __decorate([
        option_decorator_1.Option({
            boolean: true
        }),
        __metadata("design:type", Boolean)
    ], Config.prototype, "switch", void 0);
    Config = __decorate([
        config_decorator_1.ConfigClass(),
        __metadata("design:paramtypes", [Object])
    ], Config);
    return Config;
}());
exports.Config = Config;
var cfg = new Config();
//# sourceMappingURL=test-class.js.map