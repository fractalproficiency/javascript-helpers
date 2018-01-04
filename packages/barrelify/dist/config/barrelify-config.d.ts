import { IBarrelifyConfig } from './barrelify-config.interface';
export declare class BarrelifyConfig implements IBarrelifyConfig {
    dryRun: boolean;
    header: string;
    exclude: string | RegExp[];
}
