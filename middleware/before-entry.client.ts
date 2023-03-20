import { useApplicationStore } from "~~/store/store";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { token } = useApplicationStore();
  if (token) return true;
  else return navigateTo("/authentication/signIn");
});
