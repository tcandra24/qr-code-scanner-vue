<script setup>
import LayoutDefault from "../../layouts/Default.vue";
import { useAppStore } from "../../stores/appStore";
import { useGroupStore } from "../../stores/groupStore";
import { storeToRefs } from "pinia";

import { useRoute } from "vue-router";

const store = useAppStore();
const storeGroup = useGroupStore();
const { base_url, group_end_point, group_detail_end_point, token } =
  storeToRefs(store);
const { group } = storeToRefs(storeGroup);

const route = useRoute();

const slug = route.params.slug;

const getData = () => {
  try {
    const payload = {
      base_url: base_url.value,
      group_end_point: group_end_point.value,
      token: token.value,
    };
    storeGroup.getGroups(slug, payload);
  } catch (error) {
    toast.error(error);
  }
};

onMounted(() => {
  getData();
});
</script>

<template>
  <LayoutDefault>
    <div class="max-w-5xl lg:mx-auto mx-5 mt-8">
      <h2
        class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl lg:text-6xl"
      >
        {{ group.name }}
      </h2>
      <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl">
        {{ group.description }}
      </p>
      <div
        v-for="(registration, index) of group.registration"
        :key="index"
        class="w-full rounded overflow-hidden shadow-lg my-4"
      >
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">
            <h2 class="text-gray-700">
              {{ registration.registration_number }}
            </h2>
          </div>
          <div class="flex flex-col md:flex-row md:justify-between">
            <div class="my-4 md:mb-0">
              <p class="text-gray-500 text-base font-medium">
                {{ registration.fullname }}
              </p>
            </div>
            <div class="my-2 md:mb-0">
              <span
                class="text-sm font-medium me-2 px-2.5 py-0.5 rounded-full"
                :class="[
                  registration.is_scan === 'Sudah Scan'
                    ? 'bg-green-300 text-green-900'
                    : 'bg-red-300 text-red-900',
                ]"
              >
                {registration.is_scan}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>
