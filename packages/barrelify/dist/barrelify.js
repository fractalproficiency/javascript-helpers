"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fse = require("fs-extra");
var path = require("path");
var rxjs_1 = require("rxjs");
var _ = require("lodash");
var debug = require('debug')('barrelify');
// const config = {
//     header: '// GENERATED FILE, DO NOT EDIT\n'
// }
function makeBarrel(dir, config) {
    if (config === void 0) { config = {}; }
    return rxjs_1.Observable.from(fse.readdir(dir))
        .catch(function (e) { return rxjs_1.Observable.empty(); })
        .flatMap(function (contents) { return contents; })
        .do(function (item) { return debug('Found', item); })
        .filter(function (item) { return item != 'node_modules'; })
        .filter(function (item) { return item != 'bin'; })
        .let(function (thisObs) { return rxjs_1.Observable.merge(thisObs.filter(function (item) { return _.endsWith(item, '.ts'); })
        .filter(function (item) { return item != 'index.ts'; })
        .filter(function (item) { return !_.endsWith(item, '.d.ts'); })
        .filter(function (item) { return !_.endsWith(item, '.spec.ts'); })
        .do(function (item) { return debug('Raw output, post filter', item); }), thisObs.flatMap(function (item) { return makeBarrel(path.join(dir, item))
        .do(function (item) { return debug('Recursed output', item); })
        .filter(function (result) { return result; })
        .mapTo(item); })); })
        .do(function (item) { return debug('Post merge', item); })
        .map(function (item) { return _.replace(item, /\.ts$/, ''); })
        .map(function (item) { return "export * from './" + item + "'"; })
        .do(function (item) { return debug('Line', item); })
        .toArray()
        .filter(function (items) { return items.length > 0; })
        .flatMap(function (items) {
        var contents = [
            config.header
        ].concat(items).join('\n') + '\n';
        var outfile = path.join(dir, 'index.ts');
        debug('Write file:', outfile);
        if (config.dryRun) {
            debug('Is dry run, skip write file');
            return rxjs_1.Observable.of(outfile);
        }
        return rxjs_1.Observable.from(fse.writeFile(outfile, contents, { encoding: 'utf8' }))
            .map(function () { return outfile; });
    })
        .do(function (output) { return debug('Emit:', output); })
        .defaultIfEmpty(false);
}
exports.makeBarrel = makeBarrel;
//# sourceMappingURL=barrelify.js.map