#! /usr/bin/env node

const program = require("commander");
const { openai } = require("./lib/openai");
const { checkEnvVars } = require("./config");
const package = require("./package.json");
const { writeDataToFileSync } = require("./lib/writeDataToFile");

checkEnvVars();

program
  .version(package.version)
  .description("A simple node CLI shell script boilerplate")
  .option("-f, --flag", "An example flag")
  //   .arguments("<args>")
  .action((args) => {
    console.log(program.version());
  });

program
  .command("usage")
  .alias("u")
  .description("Get OpenAI API usage information for the configured API KEY")
  .action(async () => {
    try {
      const res = await openai.usage();
      if (res.status > 199 && res.status < 299) {
        // success
        console.log("Response:");
        console.log(res.data);
      } else {
        console.log(res.data);
        // something went wrong
      }
    } catch (e) {
      console.error(e);
      //   console.log(e.response.data);
      process.exit(1);
    }
  });

program
  .command("prompt <prompt>")
  .alias("p")
  .option("-o, --out <out>", "Path for output file")
  .description(
    "Generate anything from a prompt. Optionally output to a file with -o <path>"
  )
  .action(async (args, opts) => {
    try {
      const res = await openai.completion(args);
      if (res.status > 199 && res.status < 299) {
        // success

        const data = res.data;

        const text = data.choices[0].text.trim();

        if (!!opts.out) {
          console.log(`Writing output to ${opts.out}`);
          writeDataToFileSync(text, opts.out);
        }
        console.log("Response:");
        console.log(text);
      } else {
        // something went wrong
      }
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  });

program.parse(process.argv);
