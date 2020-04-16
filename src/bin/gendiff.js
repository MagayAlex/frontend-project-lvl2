#!/usr/bin/env node
import program from 'commander';
import genDiff from '../index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'json')
  .arguments('<file1>, <file2>')
  .action((file1, file2) => {
    console.log(genDiff(file1, file2, program.format));
  })
  .parse(process.argv);
