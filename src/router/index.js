import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/case/manage',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/case',
    component: Layout,
    redirect: '/case/manage',
    name: '案例',
    title: '案例',
    meta: {
      module: 'case'
    },
    children: [
      {
        path: '/case/manage',
        name: 'manage',
        component: () => import('@/views/case/manage'),
        meta: { title: '案例管理', icon: 'tree' }
      },
      {
        path: '/case/manage/details/:id',
        name: 'details',
        hidden: true,
        component: () => import('@/views/case/details'),
        meta: { title: '案例详情', icon: 'tree' }
      },
      {
        path: '/case/manage/study/:casestudyid',
        name: 'study',
        hidden: true,
        component: () => import('@/views/case/study'),
        meta: { title: '回答列表', icon: 'tree' }
      },
      {
        path: '/case/themes',
        name: 'themes',
        // component: () => import('@/views/case/manage'),
        component: () => import('@/views/case/theme'),
        meta: { title: '案例主题管理', icon: 'table' }
      },
      {
        path: '/case/title',
        name: 'study',
        component: () => import('@/views/case/title'),
        meta: { title: '案例题目管理', icon: 'tree' }
      }
    ]
  },

  {
    path: '/study',
    component: Layout,
    redirect: '/study/subject',
    name: '学生管理',
    title: '学生管理',
    meta: {
      module: 'study'
    },
    children: [
      {
        path: '/study/subject',
        name: 'subject',
        component: () => import('@/views/study/subject'),
        meta: { title: '学生案例管理', icon: 'form' }
      },
      {
        path: '/study/manage',
        name: 'manage',
        component: () => import('@/views/study/manage'),
        meta: { title: '学生信息管理', icon: 'form' }
      }
    ]
  },

  {
    path: '/notices',
    component: Layout,
    redirect: '/notices/index',
    title: '公告',
    meta: {
      module: 'notices'
    },
    children: [
      {
        path: '/notices/index',
        name: 'Form',
        component: () => import('@/views/notices/index'),
        meta: { title: '通知中心', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
