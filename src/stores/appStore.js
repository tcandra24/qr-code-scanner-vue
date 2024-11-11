import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore(
  "app",
  () => {
    const base_url = ref("");
    const scan_end_point = ref("");
    const group_end_point = ref("");
    const group_detail_end_point = ref("");
    const token = ref("");

    const changeSetting = (payload) => {
      base_url.value = payload.base_url;
      scan_end_point.value = payload.scan_end_point;
      group_end_point.value = payload.group_end_point;
      group_detail_end_point.value = payload.group_detail_end_point;
      token.value = payload.token;
    };

    return {
      base_url,
      scan_end_point,
      group_end_point,
      group_detail_end_point,
      token,
      changeSetting,
    };
  },
  {
    persist: true,
  }
);
