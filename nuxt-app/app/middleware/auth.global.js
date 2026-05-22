const excludePaths = ["/auth", "/"];
export default defineNuxtRouteMiddleware(async (to) => {
	if (import.meta.server) {
		return;
	}

	if (excludePaths.includes(to.path)) return;
	const isLogged = await window?.session?.isLogged();

	if (!isLogged) {
		return navigateTo("/auth");
	}
});
