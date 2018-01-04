const childProcess = require('child_process');
const path = require('path');
function getUsage() {
    try {
        const configuratifier = require('configuratifier');
        const table = configuratifier.MarkdownTools
            .usageTableFromFile(path.resolve('src', 'config', 'barrelify-config.ts'));
        console.log('got table', table);
        return table;
    } catch (e) {
        console.error('Failed to get output', e);
    }
}

module.exports = {
    transforms: {
        VERSIONBADGE: require('markdown-magic-version-badge'),
        USAGE(content, options) {
            return getUsage();
        }
    },
    callback: function() {
        console.log('done');
    }
};
