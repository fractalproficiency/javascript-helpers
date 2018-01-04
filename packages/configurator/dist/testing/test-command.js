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
var metadata_1 = require("../metadata");
var test_config_class_1 = require("./test-config-class");
var CommandTest = /** @class */ (function () {
    function CommandTest() {
    }
    CommandTest.prototype.doSomething = function (config) {
    };
    __decorate([
        metadata_1.Command(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [test_config_class_1.ConfigClassWithOptions]),
        __metadata("design:returntype", void 0)
    ], CommandTest.prototype, "doSomething", null);
    return CommandTest;
}());
exports.CommandTest = CommandTest;
//# sourceMappingURL=test-command.js.map