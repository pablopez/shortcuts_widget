<template>
  <div class="p-4 space-y-4 max-w-md mx-auto text-center">
    <h1 class="text-2xl font-semibold">Home Page</h1>
    <CounterDisplay />
    <IncrementButton />
    <HotkeysToggle />
    <CommandsEditor />
  </div>
</template>

<script setup lang="ts">
import { CounterDisplay } from '@/features/counter-display';
import { IncrementButton } from '@/features/counter-increment';
import { HotkeysToggle, CommandsEditor } from '@/widgets/hotkeys';
</script>
