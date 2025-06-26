<template>
  <button @click="toggleHotkeys">
    {{ enabled ? 'Disable' : 'Enable' }} Shortcuts
  </button>
</template>

<script setup lang="ts">
import { useHotkeys } from '@/widgets/hotkeys';

const { enabled, toggleHotkeys } = useHotkeys();
</script>
