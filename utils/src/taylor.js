//
//  taylor.js
//  Converts a text file with a list of strings to a i18n compatible object
//
//  Usage: npm run taylor -- {file} [prefix]
//  Output: A stringified JSON object
//

const fs = require('fs')
const filename = process.argv[2];
const prefix = process.argv[3];

if (process.argv.length < 3) {
    console.log('Usage: npm run taylor -- {file} [prefix]]');
    process.exit(1);
}

fs.readFile(filename, 'utf8', function (err, data) {
    if (err)
        throw err;

    let strings = data.split(/\r?\n/);
    let ids     = data.toLowerCase().split(/\r?\n/);
    let output  = {};

    for (var n = 0; n < ids.length; n++) {
        let id = ids[n].split(' ').join('_').replace(/\W/g, '').replace(/_+$/, '');
        if (id.charAt(0) === '_')
            id = id.substr(1);

        if (prefix)
            id = prefix + '_' + id;

        output[id] = strings[n];
    }
    console.log(JSON.stringify(output, undefined, 2));
    console.log('------------------');
});