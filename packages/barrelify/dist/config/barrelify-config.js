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
var configuratifier_1 = require("configuratifier");
var BarrelifyConfig = /** @class */ (function () {
    function BarrelifyConfig() {
    }
    __decorate([
        configuratifier_1.Switch({
            alias: 'd',
            description: 'Run barrelify with no output (prints the name of generated files)'
        }),
        __metadata("design:type", Boolean)
    ], BarrelifyConfig.prototype, "dryRun", void 0);
    __decorate([
        configuratifier_1.Option({
            alias: 'h',
            description: 'Define the header line to be added to the top of each file',
            default: '// Generated File -- DO NOT EDIT'
        }),
        __metadata("design:type", String)
    ], BarrelifyConfig.prototype, "header", void 0);
    __decorate([
        configuratifier_1.Option({
            alias: 'e',
            description: 'List of files or folders to exclude'
        }),
        __metadata("design:type", Object)
    ], BarrelifyConfig.prototype, "exclude", void 0);
    BarrelifyConfig = __decorate([
        configuratifier_1.ConfigClass()
    ], BarrelifyConfig);
    return BarrelifyConfig;
}());
exports.BarrelifyConfig = BarrelifyConfig;
//# sourceMappingURL=barrelify-config.js.map