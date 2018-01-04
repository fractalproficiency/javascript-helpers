import * as _ from 'lodash';

export class StringHelpers {
    static getCharArray(str: string) {
        str = _.isString(str)
            ? str
            : '';

        return _.map(str, c => c);
    } 
}