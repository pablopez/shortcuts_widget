<template>
  <p>Count: {{ counter.count }}</p>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/entities/counter/model';
const counter = useCounterStore();
</script>
