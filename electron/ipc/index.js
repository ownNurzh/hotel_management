const authHandlers = require("./auth");
const sessiongHandlers = require("./session");
module.exports = () => {
	authHandlers();
	sessiongHandlers();
};
