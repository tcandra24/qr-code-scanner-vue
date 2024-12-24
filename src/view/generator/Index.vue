<script setup>
import LayoutDefault from "../../layouts/Default.vue";
import { QrcodeCanvas } from "qrcode.vue";

import { ref } from "vue";

const text = ref("");
const qrRef = ref(null);

const downloadQrCode = () => {
  const canvas = qrRef.value.querySelector("canvas");
  const url = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = url;
  link.download = "qrcode.png";
  link.click();
};
</script>

<template>
  <div>
    <LayoutDefault>
      <div
        class="w-full h-full flex justify-center flex-col items-center bg-cover gap-2"
      >
        <div class="w-auto">
          <textarea
            cols="5"
            rows="5"
            class="w-96 border-2 rounded border-gray-300"
            v-model="text"
          ></textarea>
        </div>
        <div class="w-auto" ref="qrRef">
          <qrcode-canvas
            v-if="text"
            class="relative border-8 overflow-hidden border-gray-600 bg-gray-60 rounded-3xl flex flex-col w-96 h-96 justify-center items-center bg-no-repeat bg-cover shadow-2xl"
            :value="text"
            :size="400"
            :margin="1"
          />
        </div>
        <div className="w-auto">
          <button
            @click="downloadQrCode"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Download QR Code
          </button>
        </div>
      </div>
    </LayoutDefault>
  </div>
</template>
