const program = require("commander");

program
  .version("1.0.0")
  .description("A simple node CLI shell script boilerplate")
  .option("-f, --flag", "An example flag")
  .arguments("<args>")
  .action((args) => {
    console.log(`Received args: ${args}`);
  });

program
  .command("example <name>")
  .description("An example command")
  .action((name) => {
    console.log(`Hello, ${name}!`);
  });

program.parse(process.argv);
