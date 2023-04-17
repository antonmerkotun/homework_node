const http = require("http");
const config = require("./config");
const fileDB = require("./fileDB");
require("dotenv").config();

let port = config.get("PORT");
let requestCount = 0;

const newspostSchema = {
  id: Number,
  title: String,
  text: String,
  createDate: Date
};

fileDB.registerSchema("newspost", newspostSchema);

const server = http.createServer((req, res) => {
  requestCount++;
  res.statusCode = 200;

  const newspostTable = fileDB.getTable("newspost");

  // const createTable = {
  //   name: "Dima",
  //   age: 33
  // };

  // const updateTable = {
  //   name: "Vika",
  //   age: 25
  // };

  // console.log(newspostTable.getAllTable());
  // console.log(newspostTable.getTableById("1"));
  // newspostTable.createTable(createTable);
  // newspostTable.updateTable("1", updateTable);
  // newspostTable.deleteTable("1");

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
