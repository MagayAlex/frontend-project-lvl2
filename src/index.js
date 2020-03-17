const program = require ('commander');

program
  .version('0.0.1').
  command('hello')
  .description('Compares two configuration files and shows a difference.')
  .action(() => {
  	consol.log("Hello world!");
  });

  program.parse(process.argv);