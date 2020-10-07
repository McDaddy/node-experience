module.exports = {
  port: {
    option: "-p,--port <v>", // program.option('-p,--port<val>','xxx')
    descriptor: "set you server port",
    usage: "mhs --port 3000",
    default: 8080,
  },
  directory: {
    option: "-d,--directory <v>",
    descriptor: "set you server start directory",
    usage: "mhs --directory D:",
    default: process.cwd(),
  },
};
