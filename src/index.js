import fs from 'fs';
import swaggerParser from 'swagger-parser';
import mockParser from 'swagger-mock-parser';
import { stringify } from 'flatted';
// babel-polyfill only can be imported once
if (!global._babelPolyfill) {
    require('babel-polyfill');
}
export default function(swaggerFile, mockFile, cb) {
    if (!swaggerFile) {
        throw new Error('missing swagger file path');
    }
    let parserPromise = new Promise((resolve) => {
            swaggerParser.dereference(swaggerFile, (err, swagger) => {
            if (err) throw err;
            resolve(swagger);
        });
    });
    parserPromise.then((api) => {
        let paths = api.paths;
    try {
        for (let path in paths) {
            if (paths.hasOwnProperty(path)) {
                for (let action in paths[path]) {
                    if (paths[path].hasOwnProperty(action)) {
                        if (paths[path][action].responses) {
                            for (let resCode in paths[path][action].responses) {
                                if (paths[path][action].responses.hasOwnProperty(resCode)) {
                                    let schema = paths[path][action].responses[resCode].schema;
                                    if (schema) {
                                        // if example is defined and not empty,on override just skip it
                                        if (schema.example && schema.example !== '') {
                                            continue;
                                        } else {
                                            schema.example = new mockParser({useExample: true, fixedArray: true}).parse(schema);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        let cache = [];
        fs.writeFile(mockFile || 'swaggerWithMock.json', JSON.stringify(api, function(key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Circular reference found, use flatted's stringify to break
                    return JSON.parse(stringify(value));
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        }, 2), 'utf-8', (err) => {
            if (err) throw err;
            if (cb) cb();
        });
        cache = null;
    } catch (e) {
        console.log(e)
    }

});

};
