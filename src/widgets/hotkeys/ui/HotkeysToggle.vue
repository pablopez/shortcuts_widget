<template>
  <button @click="toggleHotkeys">
    {{ enabled ? 'Disable' : 'Enable' }} Shortcuts
  </button>
</template>

<script setup lang="ts">
import { useHotkeys } from '../useHotkeys';

const { enabled, toggleHotkeys } = useHotkeys();
</script>
