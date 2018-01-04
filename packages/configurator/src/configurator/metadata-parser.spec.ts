import 'mocha';
import { expect } from 'chai';
import 'reflect-metadata';
import { ConfigClassWithOptions } from '../testing';
import { MetadataParser } from './metadata-parser';

const expectedUsage = {
    columns: ['alias', 'description', 'boolean', 'name', 'default'],
    rows: [
        {
            alias: 'd',
            description: 'Do dry run',
            boolean: true,
            name: 'dryRun',
            default: null
        },
        {
            alias: 'f',
            description: 'Does stuff',
            boolean: null,
            name: 'foo',
            default: 'bar'
        },
        {
            alias: 'e',
            description: 'List of files or folders to exclude',
            boolean: null,
            name: 'exclude',
            default: null
        }
    ]
};
describe('Metadata Parser', () => {
    let configInstance: ConfigClassWithOptions;

    beforeEach(() => {
        configInstance = new ConfigClassWithOptions();
    });

    it('should be able to parse metadata', () => {});

    it('should be able to get usage', () => {
        expect(
            MetadataParser.getUsage(configInstance)
        ).to.be.deep.equal(expectedUsage);
    });
});
