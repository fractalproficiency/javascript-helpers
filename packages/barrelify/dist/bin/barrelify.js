#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var barrelify_1 = require("../barrelify");
var barrelify_config_1 = require("../config/barrelify-config");
barrelify_1.makeBarrel(process.cwd(), new barrelify_config_1.BarrelifyConfig())
    .subscribe(function (file) { return console.log('Create barrel file:', file); }, function (err) { return console.error('Failed with error', err); }, function () { return console.log('done'); });
//# sourceMappingURL=barrelify.js.map