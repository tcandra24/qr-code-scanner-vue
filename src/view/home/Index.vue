<script setup>
import LayoutDefault from "../../layouts/Default.vue";
import QrCode from "../../components/QrCode.vue";
import { ref } from "vue";

import { useAppStore } from "../../stores/appStore";
import { storeToRefs } from "pinia";

const store = useAppStore();
const { base_url, scan_end_point, token } = storeToRefs(store);

const resultScan = ref("");

const onScan = (code) => {
  resultScan.value = code;
};

const isUrl = (value) => {
  const urlRegex =
    /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i;

  return urlRegex.test(value);
};
</script>

<template>
  <div>
    <LayoutDefault>
      <div
        className="w-full h-full flex justify-center flex-col items-center bg-cover gap-2"
      >
        <div className="w-auto">
          <div
            className="relative border-8 overflow-hidden border-gray-600 bg-gray-60 rounded-3xl flex flex-col w-96 h-96 justify-center items-center bg-no-repeat bg-cover shadow-2xl"
          >
            <QrCode @onScan="onScan" />
          </div>
        </div>
        <div className="relative flex gap-2">
          <div className="w-1/4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Test
            </button>
          </div>
        </div>
        <div v-if="isUrl(resultScan)" className="relative flex my-3">
          <a :href="resultScan" target="_blank">
            <span
              class="bg-blue-100 text-blue-800 text-xl font-medium me-2 px-2.5 py-0.5 rounded"
            >
              {{ resultScan }}
            </span>
          </a>
        </div>
        <div v-else className="relative flex my-3">
          <textarea
            className="w-96 border-2 rounded border-gray-300"
            cols="30"
            rows="5"
            v-model="resultScan"
          ></textarea>
        </div>
      </div>
    </LayoutDefault>
  </div>
</template>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
.barcode-format-checkbox {
  margin-right: 10px;
  white-space: nowrap;
  display: inline-block;
}
</style>
