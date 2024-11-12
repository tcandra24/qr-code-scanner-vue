<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  classCustom: {
    type: String,
    required: false,
    default: "",
  },
});
</script>

<template>
  <div class="w-full px-3 mb-6 md:mb-0 p-3" :class="props.classCustom">
    <h3 class="uppercase tracking-wide text-gray-700 text-lg font-bold">
      {{ props.title }}
    </h3>
    <p class="text-base">{{ props.value ? props.value : "-" }}</p>
  </div>
</template>
