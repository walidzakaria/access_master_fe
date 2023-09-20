import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: () => import('@/views/Dashboard.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/pages/auth/Login.vue'),
    },
    {
      path: '/auth/forget-password',
      name: 'forgetpassword',
      component: () => import('@/views/pages/auth/ForgetPassword.vue'),
    },
    {
      path: '/auth/password/reset/confirm/:uid/:token/',
      name: 'resetpassword',
      component: () => import('@/views/pages/auth/ResetPassword.vue'),
    },
    {
      path: '/auth/change-password',
      name: 'changepassword',
      component: () => import('@/views/pages/auth/ChangePassword.vue'),
    },
    {
      path: '/entry',
      name: 'Entry',
      component: () => import('@/components/EntryForm.vue'),
    },
    {
      path: '/entry/:qrcode/',
      name: 'EntryScann',
      component: () => import('@/components/EntryForm.vue'),
    },
    {
      path: '/qr-codes',
      name: 'QrCodes',
      component: () => import('@/components/QrCodeForm.vue'),
    },
  ],
});

export default router;
