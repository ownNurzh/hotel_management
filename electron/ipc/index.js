const authHandlers = require("./auth");
const sessiongHandlers = require("./session");
const userHandlers = require("./user");
module.exports = () => {
	authHandlers();
	sessiongHandlers();
	userHandlers();
};
