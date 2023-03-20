import { useApplicationStore } from "~~/store/store";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { setToSignInPageFrom } = useApplicationStore();
  setToSignInPageFrom(from.path);
  return true;
});
