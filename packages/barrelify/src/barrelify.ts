import * as fse from 'fs-extra';
import * as path from 'path';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { IBarrelifyConfig } from './config/barrelify-config.interface';


const debug = require('debug')('barrelify');

// const config = {
//     header: '// GENERATED FILE, DO NOT EDIT\n'
// }

export function makeBarrel(dir, config: IBarrelifyConfig = {}) {
    return Observable.from(fse.readdir(dir))
        // .do(() => {}, e => debug('Failed to read', dir, e))
        .catch(e => Observable.empty())
        .flatMap((contents: string[]) => contents)
        .do(item => debug('Found', item))
        .filter(item => item != 'node_modules')
        .filter(item => item != 'bin')
        .let(thisObs => Observable.merge(
            thisObs.filter(item => _.endsWith(item, '.ts'))
                .filter(item => item != 'index.ts')
                .filter(item => !_.endsWith(item, '.d.ts'))
                .filter(item => !_.endsWith(item, '.spec.ts'))
                .do(item => debug('Raw output, post filter', item)), 
            thisObs.flatMap(item => makeBarrel(path.join(dir, item))
                .do(item => debug('Recursed output', item))
                .filter(result => result)
                .mapTo(item))
            )
        )
        .do(item => debug('Post merge', item))
        .map((item: string) => _.replace(item, /\.ts$/, ''))
        .map(item => `export * from './${item}'`)
        .do(item => debug('Line', item))
        .toArray()
        .filter(items => items.length > 0)
        .flatMap(items => {
            let contents = [
                config.header,
                ...items
            ].join('\n') + '\n';
            const outfile = path.join(dir, 'index.ts');
            debug('Write file:', outfile);
            if (config.dryRun) {
                debug('Is dry run, skip write file');
                return Observable.of(outfile);
            }
            return Observable.from(fse.writeFile(
                outfile, 
                contents, 
                { encoding: 'utf8' })
            )
            .map(() => outfile);
        })
        .do(output => debug('Emit:', output))
        .defaultIfEmpty(false);

}
