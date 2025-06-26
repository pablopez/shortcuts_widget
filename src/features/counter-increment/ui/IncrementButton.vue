<template>
  <button @click="increment">Increment</button>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/entities/counter/model';
const counter = useCounterStore();
const increment = () => counter.increment();
</script>
