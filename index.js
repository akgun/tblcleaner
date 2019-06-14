#!/usr/bin/env node

const program = require('commander');
const data = require('./data');

program
    .command('clear').alias('c')
    .description('Clear archive file.')
    .action(() => {
        data.trimArchive();
        console.log('Cleared archive file.');
    });

program
    .command('normalize').alias('n')
    .description('Normalize storage file.')
    .action(() => {
        data.normalizeStorage();
        console.log('Normalized storage file.');
    });

if (process.argv.length < 3) {
    program.help();
}

program.parse(process.argv);
