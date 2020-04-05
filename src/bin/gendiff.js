#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../index.js';


const program = commander;
program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'json')
  .arguments('<file1>, <file2>')
  .action((file1, file2) => genDiff(file1, file2, program.format));
program.parse(process.argv);
