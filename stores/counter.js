import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => {
    return {
      someState: "hello pinia",
    };
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
