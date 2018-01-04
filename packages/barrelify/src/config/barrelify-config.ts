import { ConfigClass, Option, Switch } from 'configuratifier';
import { IBarrelifyConfig } from './barrelify-config.interface';

@ConfigClass()
export class BarrelifyConfig implements IBarrelifyConfig {
    @Switch({
        alias: 'd',
        description: 'Run barrelify with no output (prints the name of generated files)'
    })
    dryRun: boolean;
    @Option({
        alias: 'h',
        description: 'Define the header line to be added to the top of each file',
        default: '// Generated File -- DO NOT EDIT'
    })
    header: string;
    @Option({
        alias: 'e',
        description: 'List of files or folders to exclude'
    })
    exclude: string | RegExp[];
}