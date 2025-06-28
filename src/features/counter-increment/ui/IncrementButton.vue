<template>
  <button
    @click="increment"
    class="bg-blue-500 text-white px-3 py-1 rounded"
  >
    Increment
  </button>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/entities/counter/model';
const counter = useCounterStore();
const increment = () => counter.increment();
</script>
