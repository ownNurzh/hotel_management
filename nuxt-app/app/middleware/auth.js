export default defineNuxtRouteMiddleware(async () => {
	if (import.meta.server) {
		return;
	}

	const isLogged = await window?.session?.isLogged();

	if (!isLogged) {
		return navigateTo("/auth");
	}
});
