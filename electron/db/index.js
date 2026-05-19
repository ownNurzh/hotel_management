const Database = require("better-sqlite3");
const { drizzle } = require("drizzle-orm/better-sqlite3");

const fs = require("node:fs");
const path = require("node:path");
const config = require("../config");
const schema = require("./schema");

const sqlite = new Database(path.join(config.userDataPath, "hotel.db"));

const initSQL = fs.readFileSync(path.join(__dirname, "init.sql"), "utf-8");
sqlite.exec(initSQL);

const db = drizzle(sqlite, { schema });

module.exports = { db };
