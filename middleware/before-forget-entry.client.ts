export default defineNuxtRouteMiddleware(async (to, from) => {
  if (from.path !== "/authentication/signIn") return false;
  return true;
});
