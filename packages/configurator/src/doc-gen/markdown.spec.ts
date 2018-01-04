import 'mocha';
import { expect } from 'chai';
import 'reflect-metadata';
import { ConfigClassWithOptions } from '../testing';
import { MarkdownTools } from './markdown';
const expectedUsage =
    'Name|Alias|Boolean|Default|Description\n...|...|...|...|...\ndryRun|d|true||Do dry run\nfoo|f||bar|Does stuff\nexclude|e|||List of files or folders to exclude';
describe('Metadata Parser', () => {
    let configInstance: ConfigClassWithOptions;

    beforeEach(() => {
        configInstance = new ConfigClassWithOptions();
    });

    it('should be able to parse metadata', () => {});

    it('should be able to get usage', () => {
        expect(MarkdownTools.usageTable(configInstance)).to.be.deep.equal(expectedUsage);
    });
});
