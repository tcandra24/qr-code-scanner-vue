import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore(
  "app",
  () => {
    const base_url = ref("");
    const scan_end_point = ref("");
    const token = ref("");

    const changeSetting = (payload) => {
      // console.log(base_url);
      // console.log(scan_end_point);
      // console.log(token);
      base_url.value = payload.base_url;
      scan_end_point.value = payload.scan_end_point;
      token.value = payload.token;
    };

    return {
      base_url,
      scan_end_point,
      token,
      changeSetting,
    };
  },
  {
    persist: true,
  }
);
