const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const schemas = {};

const fileDB = {
  registerSchema (name, schema) {
    schemas[name] = schema;
  },

  getTable (name) {
    const fileName = path.join(__dirname, `${name}.json`);
    let table = [];

    try {
      const data = fs.readFileSync(fileName);
      table = JSON.parse(data);
    } catch (err) {
      console.log(err);
    }

    function getAllTable () {
      try {
        return table;
      } catch (err) {
        console.log(err);
      }
    }

    function getTableById (id) {
      try {
        return table.find(el => el.id === id);
      } catch (err) {
        console.log(err);
      }
    }

    function createTable (data) {
      try {
        data.id = uuidv4();
        table.push(data);
        saveTable();
      } catch (err) {
        console.log(err);
      }
    }

    function updateTable (id, updateData) {
      try {
        const allTable = getAllTable();
        const currentObject = allTable.find(el => el.id === id);
        Object.assign(currentObject, updateData);
        saveTable();
      } catch (err) {
        console.log(err);
      }
    }

    function deleteTable (id) {
      try {
        table = table.filter(el => el.id !== id);
        saveTable();
      } catch (err) {
        console.log(err);
      }
    }

    function saveTable () {
      try {
        const data = JSON.stringify(table, null, 2);
        fs.writeFileSync(fileName, data);
      } catch (err) {
        console.error(`Error writing ${fileName}: ${err}`);
      }
    }

    return {
      getAllTable,
      getTableById,
      createTable,
      updateTable,
      deleteTable
    };
  }
};

module.exports = fileDB;
