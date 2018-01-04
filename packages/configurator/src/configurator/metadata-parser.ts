import * as CircularJson from 'circular-json';
import * as _ from 'lodash';
const debug = require('debug')('metadata-parser');



export class MetadataParser {
    static readonly optsKey: string;

    static parseMetadata(metadata) {
        return _.mapValues(metadata, val => {
            try {
                return CircularJson.parse(val || {})
            } catch(e) {
                debug('parseMetadata: failed to parse', val);
                return {};
            }
        });
    }

    static getMetadata(target) {
        let reflect = Reflect;
        if (!reflect || !_.isFunction(reflect.getMetadata)) {
            reflect = require('reflect-metadata').Reflect;
        }
        const rawMetadata = Reflect.getMetadata(MetadataParser.optsKey, target);
        debug('rawMetadata', rawMetadata);
        return rawMetadata || {};
    }

    static getParsedMetadata(target) {
        return MetadataParser.parseMetadata(
            MetadataParser.getMetadata(target));
    }

    static decorate(target, key: string, metadata?: any) {
        const existing = MetadataParser.getMetadata(target);
        existing[key] = CircularJson.stringify(metadata);
        Reflect.defineMetadata(
            MetadataParser.optsKey,
            existing,
            target
        );

    }

    static getUsage(target, { include = [], exclude = [] } = {}) {
        return _(target)
            .thru(MetadataParser.getParsedMetadata)
            .mapValues((val, name) => _.assign(val, { name }))
            .thru(parsed => _(parsed)
                    .values()
                    .flatMap(_.keys)
                    .concat(['name'])
                    .uniq()
                    .difference(exclude)
                    .thru(columns => _.isEmpty(include)
                        ? columns
                        : _.intersection(columns, include)
                    )
                    .thru(columns => [parsed, columns])
                    .value())
            .thru(([parsed, columns]) =>
                _(parsed).map(opt =>
                    _(columns).reduce((row, col) =>
                        _.set(row, col, _.get(opt, col, null))
                    , {})
                )
                .thru(rows => <any>{ columns, rows })
                .value()
            )
            .value();

    }
}