import { defineStore } from "pinia";
import { ref } from "vue";

import api from "../services/api";

export const useGroupStore = defineStore("group", () => {
  const groups = ref([]);
  const group = ref({});

  const getGroups = async ({ base_url, group_end_point, token }) => {
    const apiService = api(base_url);
    apiService.defaults.headers.common["Authorization"] = token;

    const { data } = await apiService.get(group_end_point);

    if (!data.success) {
      throw new Error(data.message);
    }

    groups.value = data.data;
  };

  const getGroup = (slug) => {
    //
  };

  return {
    groups,
    group,
    getGroups,
    getGroup,
  };
});