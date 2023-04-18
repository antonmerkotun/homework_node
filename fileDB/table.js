const fileDB = require("./index");

const fileName = "newspost";
const newspostSchema = {
  id: String,
  title: String,
  text: String,
  createDate: Date
};

fileDB.registerSchema(fileName, newspostSchema);

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

function tableWorking () {
  console.log(newspostTable.getAllTable());
  // console.log(newspostTable.getTableById("1"));
  // newspostTable.createTable(createTable);
  // newspostTable.updateTable("1", updateTable);
  // newspostTable.deleteTable("1");
}

tableWorking();
