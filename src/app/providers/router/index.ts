import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '@/pages/home';

const routes: RouteRecordRaw[] = [
  { path: '/', component: HomePage }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
