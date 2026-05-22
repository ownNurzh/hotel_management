export default defineNuxtRouteMiddleware(async (to) => {
	if (import.meta.server) return;

	const isLogged = await window?.session?.isLogged();

	if (to.path === "/") {
		return navigateTo(isLogged ? "/monitoring/main" : "/auth");
	}

	if (!isLogged && to.path !== "/auth") {
		return navigateTo("/auth");
	}
});
