import merge from 'deepmerge';
import { createBasicConfig } from '@open-wc/building-rollup';

const baseConfig = createBasicConfig({
    developmentMode: process.env.ROLLUP_WATCH === 'true',
    outputDir: undefined
});

export default merge(baseConfig, {
    input: './src/index.js',
    output: {
        file: "bundle.js"
    }
});
