export declare class MetadataParser {
    static readonly optsKey: string;
    static parseMetadata(metadata: any): any;
    static getMetadata(target: any): any;
    static getParsedMetadata(target: any): any;
    static decorate(target: any, key: string, metadata?: any): void;
    static getUsage(target: any, {include, exclude}?: {
        include?: any[];
        exclude?: any[];
    }): any;
}
