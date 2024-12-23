<script setup>
import LayoutDefault from "../../layouts/Default.vue";
import QrCode from "../../components/QrCode.vue";

import { ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import { useAppStore } from "../../stores/appStore";
import { storeToRefs } from "pinia";
import Swal from "sweetalert2";

import api from "../../services/api";

const store = useAppStore();
const { base_url, scan_end_point, token } = storeToRefs(store);

const resultScan = ref("");
const isCopied = ref(false);

const onScan = async (code) => {
  const value = code;
  resultScan.value = code;
  isCopied.value = false;

  if (base_url.value && scan_end_point.value) {
    try {
      const apiService = api(base_url.value);
      apiService.defaults.headers.common["Authorization"] = token.value;

      const { data } = await apiService.post(scan_end_point.value, {
        token: value,
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      const badgeHtml = data.data.seats
        .map(
          (tag) =>
            `<span class="bg-green-100 text-green-800 font-medium me-2 px-2.5 py-0.5 rounded">
              ${tag.name}
            </span>`
        )
        .join(" ");

      Swal.fire({
        title: data.message,
        html: `
            <p class="text-gray-700">${data.data.registration_number}</p>
            <div class="flex justify-center my-3">
              ${badgeHtml}
            </div>
          `,
        showConfirmButton: true,
        confirmButtonText: "Ok",
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: "colored",
      });
    }
  }
};

const isUrl = (value) => {
  const urlRegex =
    /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i;

  return urlRegex.test(value);
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(resultScan.value);
    isCopied.value = true;
    console.log("Copied to clipboard");
  } catch (error) {
    isCopied.value = false;
    console.log(error);
  }
};
</script>

<template>
  <div>
    <LayoutDefault>
      <div
        class="w-full h-full flex justify-center flex-col items-center bg-cover gap-2"
      >
        <div class="w-auto">
          <div
            class="relative border-8 overflow-hidden border-gray-600 bg-gray-60 rounded-3xl flex flex-col w-96 h-96 justify-center items-center bg-no-repeat bg-cover shadow-2xl"
          >
            <QrCode @onScan="onScan" />
          </div>
        </div>
        <div v-if="isUrl(resultScan)" class="relative flex my-3">
          <a :href="resultScan" target="_blank">
            <span
              class="bg-blue-100 text-blue-800 text-xl font-medium me-2 px-2.5 py-0.5 rounded"
            >
              {{ resultScan }}
            </span>
          </a>
        </div>
        <div v-else class="relative flex flex-col my-3">
          <textarea
            class="w-96 border-2 rounded border-gray-300"
            cols="30"
            rows="5"
            v-model="resultScan"
          ></textarea>
          <div class="flex justify-center">
            <button
              @click="copyToClipboard()"
              class="bg-gray-500 hover:bg-gray-700 my-3 text-white font-bold py-2 px-4 rounded"
            >
              {{ isCopied ? "Copied" : "Copy" }}
            </button>
          </div>
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
