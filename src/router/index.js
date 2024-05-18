import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/Admin.vue')
    },
    {
      path: '/projectList',
      name: 'projectList',
      component: () => import('@/views/projectList/ProjectList.vue')
    },
    {
      path: '/project',
      name: 'project',
      component: () => import('@/views/project/Project.vue')
    },
    {
      path: '/patient',
      name: 'patient',
      component: () => import('@/views/patient/Patient.vue')
    }
  ]
})

export default router
