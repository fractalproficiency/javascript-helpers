import { Options } from 'yargs';
import * as Yargs from 'yargs';
import * as _ from 'lodash';
import { MetadataParser } from '../index';


export function Option(opt?: Options) {
    return (target, propKey) => {
        MetadataParser.decorate(target, propKey, opt);
    }
}

export function Switch(opt?: Options) {
    _.assign(opt, { boolean: true });
    return Option(opt);
}