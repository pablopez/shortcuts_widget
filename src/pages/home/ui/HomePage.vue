<template>
  <h1>Home Page</h1>
  <CounterDisplay />
  <IncrementButton />
</template>

<script setup lang="ts">
import { CounterDisplay } from '@/features/counter-display';
import { IncrementButton } from '@/features/counter-increment';
</script>
