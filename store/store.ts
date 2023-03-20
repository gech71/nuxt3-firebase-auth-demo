import { defineStore } from "pinia";

export const useApplicationStore = defineStore({
  id: "hibirlink-app-store",
  state: () => {
    return { toSignInPageFrom: "", token: "", uid: "" };
  },
  actions: {
    setToSignInPageFrom(from: string) {
      this.toSignInPageFrom = from;
    },
    setToken(from: string) {
      this.token = from;
    },
    setUID(from: string) {
      this.uid = from;
    },
  },
  persist: true,
});
