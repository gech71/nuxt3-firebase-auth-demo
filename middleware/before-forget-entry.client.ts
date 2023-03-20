export default defineNuxtRouteMiddleware(async (to, from) => {
  if (from.path !== "/auth/signIn") return false;
  return true;
});
