<script setup>
import { ref } from "vue";
import LayoutDefault from "../../layouts/Default.vue";
import { useAppStore } from "../../stores/appStore";

import { storeToRefs } from "pinia";

import SettingDisplay from "../../components/SettingDisplay.vue";

const store = useAppStore();
const {
  base_url: base_url_state,
  scan_end_point: scan_end_point_state,
  group_end_point: group_end_point_state,
  group_detail_end_point: group_detail_end_point_state,
  token: token_state,
} = storeToRefs(store);
const { changeSetting } = store;

const base_url = ref("");
const scan_end_point = ref("");
const group_end_point = ref("");
const group_detail_end_point = ref("");
const token = ref("");

const fileInput = ref(null);

const submit = () => {
  const payload = {
    base_url: base_url.value,
    scan_end_point: scan_end_point.value,
    group_end_point: group_end_point.value,
    group_detail_end_point: group_detail_end_point.value,
    token: token.value,
  };

  changeSetting(payload);

  base_url.value = "";
  scan_end_point.value = "";
  group_end_point.value = "";
  group_detail_end_point.value = "";
  token.value = "";
};

const readFile = () => {
  const file = fileInput.value.files[0];
  if (!file) {
    toast.error("No file selected");
    return;
  }

  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    try {
      const jsonData = JSON.parse(fileReader.result);

      base_url.value = jsonData.base_url;
      scan_end_point.value = jsonData.scan_end_point;
      group_end_point.value = jsonData.group_end_point;
      group_detail_end_point.value = jsonData.group_detail_end_point;
      token.value = jsonData.token;
    } catch (error) {
      toast.error(error);
    }
  };

  fileReader.readAsText(file, "UTF-8");
};
</script>

<template>
  <LayoutDefault>
    <div className="max-w-lg rounded mx-auto overflow-hidden mb-5">
      <div className="w-full max-w-lg">
        <div className="flex flex-wrap">
          <SettingDisplay title="Base URL" :value="base_url_state" />
          <SettingDisplay title="Token" :value="token_state" />
          <SettingDisplay
            title="Scan End Point"
            :value="scan_end_point_state"
            classCustom="md:w-1/2"
          />
          <SettingDisplay
            title="Group End Point"
            :value="group_end_point_state"
            classCustom="md:w-1/2"
          />
          <SettingDisplay
            title="Group Detail End Point"
            :value="group_detail_end_point_state"
            classCustom="md:w-1/2"
          />
        </div>
      </div>
    </div>
    <div
      class="max-w-lg rounded mx-auto overflow-hidden shadow-lg p-10 border-2"
    >
      <form @submit.prevent="submit" class="w-full max-w-lg">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="baseUrl"
            >
              Base URL
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="baseUrl"
              v-model="base_url"
              type="text"
              placeholder="Base URL"
            />
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="token"
            >
              Token
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="token"
              v-model="token"
              type="text"
              placeholder="Token"
            />
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-3">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="groupEndPoint"
            >
              Group End Point
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="groupEndPoint"
              v-model="group_end_point"
              type="text"
              placeholder="Group End Point"
            />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="groupDetailEndPoint"
            >
              Group Detail End Point
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="groupDetailEndPoint"
              v-model="group_detail_end_point"
              type="text"
              placeholder="Group Detail End Point"
            />
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-3">
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="scanEndPoint"
            >
              Scan End Point
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="scanEndPoint"
              v-model="scan_end_point"
              type="text"
              placeholder="Scan End Point"
            />
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-3">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="file-setting"
            >
              Import Setting
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight cursor-pointer focus:outline-none focus:bg-white focus:border-gray-500"
              id="file-setting"
              type="file"
              ref="fileInput"
              @change="readFile()"
              placeholder="File Setting"
              accept="application/JSON"
            />
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mt-3 justify-start">
          <div class="w-full md:w-1/4 px-1 mb-6 md:mb-0">
            <button
              class="shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none w-full text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Save
            </button>
          </div>
          <div class="w-full md:w-1/4 px-1 mb-6 md:mb-0">
            <button
              class="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none w-full text-white font-bold py-2 px-4 rounded"
              @click="store.resetSetting()"
              type="button"
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
  </LayoutDefault>
</template>
