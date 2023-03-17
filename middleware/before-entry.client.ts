export default defineNuxtRouteMiddleware(async (to, from) => {
  const __user_cookie = useCookie("__current_user").value;
  if (__user_cookie) return true;
  else return navigateTo("/authentication/signIn");
});
