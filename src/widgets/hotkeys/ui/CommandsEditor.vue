<template>
  <div>
    <button @click="show = true">Editar Comandos</button>
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-4 rounded max-h-[90vh] overflow-auto">
        <h2>Editar comandos</h2>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Comando</th>
              <th>Descripción</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(combo, name) in localKeymap" :key="name">
              <td>{{ name }}</td>
              <td>
                <span v-if="editing !== name">{{ combo }}</span>
                <span v-else>Pulse combinación de botones</span>
              </td>
              <td>{{ actions[name]?.description }}</td>
              <td>
                <button v-if="editing !== name" @click="startEditing(name)">Editar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-4 flex gap-2">
          <button @click="exportFile">Exportar</button>
          <input type="file" @change="importFile" accept="application/json" />
          <button @click="close">Cerrar</button>
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
    window.removeEventListener('keydown', handler);
  };
  window.addEventListener('keydown', handler);
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

