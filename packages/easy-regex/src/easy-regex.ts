import { StringHelpers } from '@fractal-proficiency/helpers';
import * as _ from 'lodash';
import { RegexArgs } from './opts';

export class EasyRegex {
    private _flags: string[];
    private escape: boolean;

    set flags(flags: string) {
        this.setFlags(flags, true);
    }

    get flags(): string {
        return this._flags.join('');
    }

    set global(global: boolean) {
        this.setFlagValue('g', global);
    }

    get global(): boolean {
        return this.getFlagValue('g');
    }

    set ignoreCase(ignoreCase: boolean) {
        this.setFlagValue('i', ignoreCase);
    }

    get ignoreCase(): boolean {
        return this.getFlagValue('i');
    }

    set multiline(multiline: boolean) {
        this.setFlagValue('m', multiline);
    }

    get multiline(): boolean {
        return this.getFlagValue('m');
    }

    get regExp(): RegExp {
        return EasyRegex.castRegExp(this.source, this._flags, this.escape);
    }

    protected unsetFlags(...flags: (string | string[])[]) {
        this._flags = _.difference(
            this._flags, _.flattenDeep(flags));
    }

    protected setFlags(flags: string | string[], refresh?: boolean) {
        if (refresh) {
            this._flags = _.castArray(flags);
        } else {
            this._flags = EasyRegex.mergeFlags(this._flags, flags);
        }
    }

    protected getFlagValue(flag: string): boolean {
        return !!_.find(this._flags, f => f == flag);
    }

    protected setFlagValue(flag: string, value: boolean) {
        if (value) {
            this.setFlags(flag);
        } else {
            this.unsetFlags(flag);
        }
    }

    exec() {
        var re
    }

    constructor(protected source: string | RegExp, opts: RegexArgs) {
        if (_.isString(opts) || _.isArray(opts)) {
            this._flags = _.castArray(opts).join('');
        } else {
            _.assign(this, opts);
        }
    }

    static getRegexp(
        source: string,
        flags: (string | string[]),
        escape?: boolean): RegExp 
    {
        source = escape
            ? _.escapeRegExp(source)
            : source;
        return new RegExp(source, EasyRegex.mergeFlags(
            flags
        ).join(''))
    }

    static castRegExp(
        target: string | RegExp, 
        flags?: string | string[],
        escape?: boolean
    ) : RegExp 
    {
        return target instanceof RegExp
            ? EasyRegex.regExpSetFlags(target, flags)
            : EasyRegex.getRegexp(target, flags)
    }

    static regExpSetFlags(regexp: RegExp, flags: string | string[]): RegExp {
        return EasyRegex.getRegexp(
            regexp.source, EasyRegex.mergeFlags(
                flags, 
                _.get(regexp, 'flags')
            )
        );
    }

    static mergeFlags(...flags: (string | string[])[]): string[] {
        return _(flags)
            .flattenDeep()
            .filter(_.isString)
            .reject(_.isEmpty)
            .map(StringHelpers.getCharArray)
            .flatten()
            .uniq()
            .value();
    }
}