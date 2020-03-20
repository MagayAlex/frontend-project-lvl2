#!/usr/bin/env node
import genDiff from '../index.js';
import commander from 'commander';

;
const program = commander;
program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<file1>, <file2>')
  .action((file1, file2) => {
  	genDiff(file1, file2);
  });

  program.parse(process.argv);


