<script setup>
const props = defineProps({
  group: Object,
});
</script>

<template>
  <div class="lg:w-1/4 w-full rounded overflow-hidden shadow-lg">
    <router-link
      :to="{ name: 'group.show', params: { slug: props.group.slug } }"
    >
      <img class="w-full" :src="props.group.image" :alt="props.group.slug" />
    </router-link>
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ props.group.name }}</div>
      <p class="text-gray-700 text-base">{{ props.group.description }}</p>
    </div>
  </div>
</template>
