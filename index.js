const http = require("http");
const config = require("./config");
require("dotenv").config();

let port = config.get("PORT");
let requestCount = 0;

const server = http.createServer((req, res) => {
  requestCount++;
  res.statusCode = 200;

  res.end(JSON.stringify({
    message: "Request handled successfully",
    requestCount
  }));
});

const args = process.argv.slice(2);
const portArgIndex = args.findIndex(arg => arg.startsWith("--port="));
if (portArgIndex !== -1) {
  port = parseInt(args[portArgIndex].substring(7));
}

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
