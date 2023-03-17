import { useApplicationStore } from "~~/store/store";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { setToSignInPageFrom, toSignInPageFrom } = useApplicationStore();
  setToSignInPageFrom(from.path.toLocaleLowerCase());

  return true;
});
