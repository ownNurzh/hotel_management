const { DatabaseSync } = require("node:sqlite");

const fs = require("node:fs");
const path = require("node:path");
const config = require("../config");

const db = new DatabaseSync(path.join(config.userDataPath, "hotel.db"));

const initSQL = fs.readFileSync(path.join(__dirname, "init.sql"), "utf-8");
db.exec(initSQL);

module.exports = { db };
