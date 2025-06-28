<template>
  <p class="text-xl font-bold">Count: {{ counter.count }}</p>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/entities/counter/model';
const counter = useCounterStore();
</script>
