const { sqliteTable, text, integer, real } = require("drizzle-orm/sqlite-core");

const users = sqliteTable("users", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	login: text("login").unique().notNull(),
	password: text("password").notNull(),
	role: text("role").notNull().default("reception"),
});

module.exports = { users };
