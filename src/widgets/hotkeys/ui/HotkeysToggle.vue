<template>
  <button
    @click="toggleHotkeys"
    class="bg-gray-500 text-white px-3 py-1 rounded"
  >
    {{ enabled ? 'Disable' : 'Enable' }} Shortcuts
  </button>
</template>

<script setup lang="ts">
import { useHotkeys } from '../useHotkeys';

const { enabled, toggleHotkeys } = useHotkeys();
</script>
