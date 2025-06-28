<template>
  <div>
    <button @click="show = true">Editar Comandos</button>
    <div v-if="show" class="modal">
      <div class="modal-content">
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
        <div class="controls">
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
    e.preventDefault();
    const parts: string[] = [];
    if (e.ctrlKey || e.key.toLowerCase() === 'control') parts.push('ctrl');
    if (e.shiftKey || e.key.toLowerCase() === 'shift') parts.push('shift');
    if (e.altKey || e.key.toLowerCase() === 'alt') parts.push('alt');
    if (e.metaKey || e.key.toLowerCase() === 'meta') parts.push('meta');
    const main = e.key.toLowerCase();
    if (!['control', 'shift', 'alt', 'meta'].includes(main)) {
      parts.push(main);
    }
    localKeymap[name] = parts.join('+');
    updateKeymap({ ...localKeymap });
    editing.value = null;
  };
  window.addEventListener('keydown', handler, { once: true });
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

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 1rem;
  border-radius: 4px;
  max-height: 90vh;
  overflow: auto;
}
.controls {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}
</style>
