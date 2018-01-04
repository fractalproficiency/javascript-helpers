import { MetadataParser } from "../configurator";
import * as _ from 'lodash';
import { construct } from "../util";
var escape = require('markdown-escape');

if (_.endsWith(__filename, 'js')) {
    require('ts-node').register({
        compilerOptions: {
            emitDecoratorMetadata: true,
            experimentalDecorators: true
        }
    });
}

export class MarkdownTools {
    static usageTable = (instance, {include = [], exclude= []} = {}) => 
        _(instance)
            .thru(i => MetadataParser.getUsage(i, {include,exclude}))
            .thru(({ rows, columns }) => _(columns)
            .sort()
            .sortBy(c => c !== 'name')
            .thru(cols => [
                _.map(cols, _.startCase),
                _.map(cols, col => '---'),
                ..._.map(rows, row => 
                    _.map(
                        cols, 
                        col => _.get(row, col, ' ')
                    )
                )
            ])
            .map(row => {
                try {
                    return _(row)
                        .map(val => _.isNil(val) ? 
                            ' ' 
                            : val
                        )
                        .map(val => _.toString(val))
                        .map(val => escape(val))
                        .value();
                } catch (e) {
                    console.log('caught error while cleaning row',row, e);
                    return row;
                }
            }
            )
            .map(row => _.join(row, '|'))
            .join('\n')
        )
        .value();

    static usageTableFromFile(filename: string, {include = [], exclude= []} = {}) {
        try {
            const imported = require(filename);
            return _(imported)
                .map(importedClass => importedClass)
                .concat(imported)
                .map(importedClass => {
                    try {
                        let instance = construct(importedClass, []);
                        return MarkdownTools.usageTable(instance, { include, exclude });
                    } catch(e) {
                        return;
                    }
                })
                .reject(_.isNil)
                .value();
        } catch (e) {
            const errMessage = 'Could not import file ' + filename;
            console.error(errMessage, e);
            const error = new Error(errMessage);
            error['internal'] = e;
            throw error;
        }
        
    }
}
