const http = require("http");
const config = require("./config");
const fileDB = require("./fileDB");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

let port = config.get("PORT");
let requestCount = 0;
const fileName = "newspost";

const newspostSchema = {
  id: String,
  title: String,
  text: String,
  createDate: Date
};

fileDB.registerSchema(fileName, newspostSchema);

const server = http.createServer((req, res) => {
  requestCount++;
  res.statusCode = 200;

  const isFile = fs.existsSync(path.join("fileDB", `${fileName}.json`));
  if (isFile) {
    const newspostTable = fileDB.getTable(fileName);
    const createTable = {
      title: "У зоопарку Чернігова лисичка народила лисеня",
      text: "В Чернігівському заопарку сталася чудова подія! Лисичка на ім'я Руда народила чудове лисенятко! Тож поспішайте навідатись та подивитись на це миле створіння!",
      createDate: new Date()
    };

    const updateTable = {
      title: "Маленька лисичка"
      // test: "incorrect key"
    };

    // console.log(newspostTable.getAllTable());
    // console.log(newspostTable.getTableById("1"));
    // newspostTable.createTable(createTable);
    // newspostTable.updateTable("1", updateTable);
    // newspostTable.deleteTable("1");
  } else {
    console.log(`${fileName} file does not exist`);
  }

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
