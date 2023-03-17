export default defineNuxtRouteMiddleware(async (to, from) => {
  if (from.path.toLocaleLowerCase() !== "/authentication/signin") return false;
  return true;
});
