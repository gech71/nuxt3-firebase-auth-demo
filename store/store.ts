import { defineStore } from "pinia";

export const useApplicationStore = defineStore({
  id: "hibirlink-app-store",
  state: () => {
    return { user: null as string | null };
  },
  actions: {
    updateUser(user: null | string) {
      this.user = user;
    },
  },
});
