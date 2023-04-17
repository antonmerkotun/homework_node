const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const schemas = {};
let schemaName;

const fileDB = {
  registerSchema (name, schema) {
    schemas[name] = schema;
    schemaName = name;
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

        if (checkSchemaKeys(data)) {
          table.push(data);
          saveTable();
        } else {
          console.log("Wrong key is entered");
        }
      } catch (err) {
        console.log(err);
      }
    }

    function updateTable (id, updateData) {
      try {
        const currentObject = getTableById(id);
        const schemaKeys = Object.keys(schemas[schemaName]);
        const objectKeys = Object.keys(updateData);

        for (const key of objectKeys) {
          if (schemaKeys.includes(key)) {
            currentObject[key] = updateData[key];
          } else {
            console.log("Wrong key is entered");
            return;
          }
        }

        if (checkSchemaKeys(currentObject)) {
          Object.assign(currentObject, updateData);
          saveTable();
        }
      } catch (err) {
        console.log(err);
      }
    }

    function deleteTable (id) {
      try {
        table = table.filter(el => el.id !== id);

        if (table) {
          saveTable();
        }
      } catch (err) {
        console.log(err);
      }
    }

    function saveTable () {
      try {
        const data = JSON.stringify(table, null, 2);
        fs.writeFileSync(fileName, data);
        console.log("Table save");
      } catch (err) {
        console.error(`Error writing ${fileName}: ${err}`);
      }
    }

    function checkSchemaKeys (data) {
      const schemaKeys = Object.keys(schemas[schemaName]);
      const recordKeys = Object.keys(data);
      return schemaKeys.every(key => recordKeys.includes(key));
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
