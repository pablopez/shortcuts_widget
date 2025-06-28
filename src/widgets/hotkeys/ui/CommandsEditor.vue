<template>
  <div>
    <button
      @click="show = true"
      class="bg-blue-500 text-white px-4 py-2 rounded mb-2"
    >
      Editar Comandos
    </button>
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded shadow-lg max-h-[90vh] overflow-auto">
        <h2 class="text-xl font-semibold mb-4">Editar comandos</h2>
        <table class="table-auto w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 text-left">
              <th class="p-2 border-b">Comando</th>
              <th class="p-2 border-b">Descripción</th>
              <th class="p-2 border-b"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(combo, name) in localKeymap" :key="name" class="odd:bg-gray-50">
              <td class="p-2 border-b">
                <span v-if="editing !== name">{{ combo }}</span>
                <span v-else>Pulse combinación de botones</span>
              </td>
              <td class="p-2 border-b">{{ actions[name]?.description }}</td>
              <td class="p-2 border-b text-right">
                <button
                  v-if="editing !== name"
                  @click="startEditing(name)"
                  class="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-4 flex gap-2 justify-end">
          <button @click="exportFile" class="bg-green-500 text-white px-3 py-1 rounded">Exportar</button>
          <input type="file" @change="importFile" accept="application/json" class="border" />
          <button @click="close" class="bg-red-500 text-white px-3 py-1 rounded">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { actions } from '../actions';
import { keymap } from '../keymap';
import { updateKeymap } from '../useHotkeys';

const show = ref(false);
const editing = ref<string | null>(null);
const localKeymap = reactive({ ...keymap });

const startEditing = (name: string) => {
  editing.value = name;
  const handler = (e: KeyboardEvent) => {
    if (['control', 'shift', 'alt', 'meta'].includes(e.key.toLowerCase())) {
      return;
    }
    e.preventDefault();
    const parts: string[] = [];
    if (e.ctrlKey) parts.push('ctrl');
    if (e.shiftKey) parts.push('shift');
    if (e.altKey) parts.push('alt');
    if (e.metaKey) parts.push('meta');
    parts.push(e.key.toLowerCase());
    localKeymap[name] = parts.join('+');
    updateKeymap({ ...localKeymap });
    editing.value = null;
    window.removeEventListener('keydown', handler, true);
  };
  window.addEventListener('keydown', handler, true);
};

const close = () => {
  show.value = false;
  editing.value = null;
};

const exportFile = () => {
  const data = Object.keys(localKeymap).map((name) => ({
    title: name,
    command: localKeymap[name],
    description: actions[name]?.description || '',
  }));
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'commands.json';
  link.click();
  URL.revokeObjectURL(url);
};

const importFile = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result as string) as Array<{ title: string; command: string }>;
      imported.forEach((cmd) => {
        if (cmd.title && cmd.command) {
          localKeymap[cmd.title] = cmd.command;
        }
      });
      updateKeymap({ ...localKeymap });
    } catch {
      alert('Archivo no válido');
    }
  };
  reader.readAsText(file);
};
</script>

