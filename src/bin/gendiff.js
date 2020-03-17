#!/home/alex/.nvm/versions/node/v13.9.0/bin/node
import commander from 'commander';



const program = commander;
let fileFormat;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .action(function(env, options) {
  	fileFormat = options.format;
  });

  program.parse(process.argv);

  if(program.format) {
  	console.log("Format = ",fileFormat);
  }