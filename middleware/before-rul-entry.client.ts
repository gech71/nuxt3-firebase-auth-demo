import { useApplicationStore } from "~~/store/store";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { uid } = useApplicationStore();
  if (uid) return true;
  else return abortNavigation();
});
