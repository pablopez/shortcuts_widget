import { createApp } from 'vue';
import { setupStore } from './app/providers/store';
import { router } from "./app/providers/router";
import App from './app/App.vue';

const app = createApp(App);
const pinia = setupStore();
app.use(pinia);
app.use(router);

app.mount('#app');
