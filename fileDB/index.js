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
    const isFile = fs.existsSync(path.join("fileDB", `${name}.json`));

    if (!isFile) {
      console.log(`${name} file does not exist`);
      return;
    }
    const fileName = path.join(__dirname, `${name}.json`);

    function getAllTable () {
      try {
        return JSON.parse(fs.readFileSync(fileName).toString());
      } catch (err) {
        console.log(err);
      }
    }

    function getTableById (id) {
      try {
        const table = JSON.parse(fs.readFileSync(fileName).toString());
        return table.find(el => el.id === id);
      } catch (err) {
        console.log(err);
      }
    }

    async function createTable (data) {
      try {
        data.id = uuidv4();

        if (checkSchemaKeys(data)) {
          const table = JSON.parse(fs.readFileSync(fileName).toString());
          table.push(data);
          await saveTable(table);
        } else {
          console.log("Wrong key is entered");
        }
      } catch (err) {
        console.log(err);
      }
    }

    async function updateTable (id, updateData) {
      try {
        const table = JSON.parse(fs.readFileSync(fileName).toString());
        const currentObject = getTableById(id);
        const schemaKeys = Object.keys(schemas[schemaName]);
        const objectKeys = Object.keys(updateData);

        for (const key of objectKeys) {
          if (schemaKeys.includes(key)) {
            table.forEach(el => {
              if (el.id === id) {
                el[key] = updateData[key];
              }
            });
          } else {
            console.log("Wrong key is entered");
            return;
          }
        }

        if (checkSchemaKeys(currentObject)) await saveTable(table);
      } catch (err) {
        console.log(err);
      }
    }

    async function deleteTable (id) {
      try {
        let table = JSON.parse(fs.readFileSync(fileName).toString());
        table = table.filter(el => el.id !== id);

        if (table) {
          await saveTable(table);
        }
      } catch (err) {
        console.log(err);
      }
    }

    async function saveTable (table) {
      try {
        const data = JSON.stringify(table, null, 2);
        await fs.writeFileSync(fileName, data);
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
