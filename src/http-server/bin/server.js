#! /usr/bin/env node

const program = require("commander");
const config = require("./serverConfig");
const Server = require("../src/index");
const { forEachObj } = require("../util");

program.name = "mhs";
forEachObj(config, (val) => {
  program.option(val.option, val.descriptor);
});

program.on("--help", () => {
  console.log("\nExamples:");
  forEachObj(config, (val) => {
    console.log("  " + val.usage);
  });
});

// --port 3000  --directory d:  --cache
program.parse(process.argv); // 没有这一步 即使是--help也是没法接收到的

const finalConfig = {}
forEachObj(config, (value, key) => {
    finalConfig[key] = program[key] || value.default
});


const server = new Server(finalConfig);

server.start();