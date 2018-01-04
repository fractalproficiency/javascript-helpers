import { Switch, Option } from '../metadata';

export class ClassWithOptions {
    @Switch({
        alias: 'd',
        description:
            'Do dry run'
    })
    dryRun: boolean;
    @Option({
        alias: 'f',
        description:
            'Does stuff',
        default: 'bar'
    })
    foo: string;
    @Option({
        alias: 'e',
        description: 'List of files or folders to exclude'
    })
    exclude: string | RegExp[];
}
