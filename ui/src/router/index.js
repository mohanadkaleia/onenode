import { createRouter, createWebHistory } from 'vue-router'

// Define your routes
const routes = [
  // Add your routes here, for example:
  // { path: '/', component: Home },
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
