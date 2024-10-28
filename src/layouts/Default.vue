<script setup>
import HeaderSection from "../components/HeaderSection.vue";
</script>

<template>
  <HeaderSection />

  <div className="container mx-auto mt-16">
    <slot></slot>
  </div>
</template>
