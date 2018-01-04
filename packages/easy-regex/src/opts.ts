export interface IRegexOpts {
    global?: boolean;
    ignoreCase?: boolean;
    multiline?: boolean;
    escape?: boolean;
}

export type RegexArgs = IRegexOpts | string[] | string;