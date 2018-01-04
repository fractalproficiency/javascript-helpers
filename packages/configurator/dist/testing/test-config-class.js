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
var ConfigClassWithOptions = /** @class */ (function () {
    function ConfigClassWithOptions() {
    }
    __decorate([
        metadata_1.Switch({
            alias: 'd',
            description: 'Do dry run'
        }),
        __metadata("design:type", Boolean)
    ], ConfigClassWithOptions.prototype, "dryRun", void 0);
    __decorate([
        metadata_1.Option({
            alias: 'f',
            description: 'Does stuff',
            default: 'bar'
        }),
        __metadata("design:type", String)
    ], ConfigClassWithOptions.prototype, "foo", void 0);
    __decorate([
        metadata_1.Option({
            alias: 'e',
            description: 'List of files or folders to exclude'
        }),
        __metadata("design:type", Object)
    ], ConfigClassWithOptions.prototype, "exclude", void 0);
    ConfigClassWithOptions = __decorate([
        metadata_1.ConfigClass()
    ], ConfigClassWithOptions);
    return ConfigClassWithOptions;
}());
exports.ConfigClassWithOptions = ConfigClassWithOptions;
//# sourceMappingURL=test-config-class.js.map