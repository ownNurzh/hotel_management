const { authService } = require("../services");

module.exports = () => {
	try {
		authService.register("Admin FN", "Admin SN", "admin", "admin", 1);
	} catch (e) {}
};
