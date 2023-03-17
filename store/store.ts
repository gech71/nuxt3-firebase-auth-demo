import { defineStore } from "pinia";

export const useApplicationStore = defineStore({
  id: "hibirlink-app-store",
  state: () => {
    return { toSignInPageFrom: "" };
  },
  actions: {
    setToSignInPageFrom(from: string) {
      this.toSignInPageFrom = from;
    },
  },
});
