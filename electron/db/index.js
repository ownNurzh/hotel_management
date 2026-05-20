const { DatabaseSync } = require("node:sqlite");

const fs = require("node:fs");
const path = require("node:path");
const { drizzle } = require("drizzle-orm/sqlite-proxy");
const config = require("../config");
const schema = require("./schema");

const sqlite = new DatabaseSync(path.join(config.userDataPath, "hotel.db"));

const initSQL = fs.readFileSync(path.join(__dirname, "init.sql"), "utf-8");
sqlite.exec(initSQL);

const db = drizzle(
	(sql, params, method) => {
		const stmt = sqlite.prepare(sql);
		if (method === "run") {
			stmt.run(...params);
			return { rows: [] };
		}
		const rows =
			method === "get" ? [stmt.get(...params)] : stmt.all(...params);
		return { rows: rows.filter(Boolean) };
	},
	{ schema },
);

module.exports = { db };
