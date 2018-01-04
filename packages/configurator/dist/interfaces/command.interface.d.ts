/// <reference types="yargs" />
import { Options } from 'yargs';
export interface ICommand extends Options {
    command?: string | string[];
}
