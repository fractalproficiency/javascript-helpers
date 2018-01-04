/// <reference types="yargs" />
import { Options } from 'yargs';
export declare function Option(opt?: Options): (target: any, propKey: any) => void;
export declare function Switch(opt?: Options): (target: any, propKey: any) => void;
