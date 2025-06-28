<template>
  <h1>Home Page</h1>
  <CounterDisplay />
  <IncrementButton />
  <HotkeysToggle />
  <CommandsEditor />
</template>

<script setup lang="ts">
import { CounterDisplay } from '@/features/counter-display';
import { IncrementButton } from '@/features/counter-increment';
import { HotkeysToggle, CommandsEditor } from '@/widgets/hotkeys';
</script>
