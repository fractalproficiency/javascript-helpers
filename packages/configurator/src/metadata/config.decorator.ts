import * as _ from 'lodash';
import * as Yargs from 'yargs';
import { MetadataParser } from '../configurator';
import { construct } from '../util'; 

export function ConfigClass() {
    return target => {
        let opts;
        var original = target;

        function getOpts(constructed) {
            return MetadataParser.getParsedMetadata(constructed);
        }
  
        var f: any = function(...args) {
            let constructed = construct(original, args);
            opts = opts || getOpts(constructed);
            let argv = Yargs.options(opts)
                .argv;
            _.assign(
                constructed, 
                _.pickBy(argv, (val, key) => _.has(opts, key))
            );
            return constructed;
        };


        f.prototype = original.prototype;

        return f;
    };
}
