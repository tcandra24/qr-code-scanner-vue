<script setup>
import LayoutDefault from "../../layouts/Default.vue";
import { onMounted } from "vue";
import { useAppStore } from "../../stores/appStore";
import { useGroupStore } from "../../stores/groupStore";
import { storeToRefs } from "pinia";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import CardImage from "../../components/CardImage.vue";

const store = useAppStore();
const storeGroup = useGroupStore();
const { base_url, group_end_point, group_detail_end_point, token } =
  storeToRefs(store);
const { groups } = storeToRefs(storeGroup);

const getData = () => {
  if (base_url.value && group_end_point.value && group_detail_end_point.value) {
    try {
      const payload = {
        base_url: base_url.value,
        group_end_point: group_end_point.value,
        token: token.value,
      };
      storeGroup.getGroups(payload);
    } catch (error) {
      toast.error(error);
    }
  }
};

onMounted(() => {
  getData();
});
</script>

<template>
  <LayoutDefault>
    <div class="flex flex-row flex-wrap gap-5 justify-center">
      <CardImage
        v-if="groups && groups.length > 0"
        v-for="(group, index) of groups"
        :key="index"
        :group="group"
      />

      <div v-else class="lg:w-1/4 w-full">
        <div
          class="flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50"
          role="alert"
        >
          <svg
            class="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
            />
          </svg>
          <span class="sr-only">Info</span>
          <div><span class="font-medium">Info!</span> Group is Empty</div>
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>
