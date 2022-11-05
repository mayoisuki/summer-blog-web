import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import LayoutFront from '@/layout-front'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/backend/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/backend/register/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: LayoutFront,
    children: [
      {
        path: '/',
        name: 'List',
        component: () => import('@/views/frontend/article-list/index')
      },
      {
        path: '/details/:id',
        name: 'Details',
        component: () => import('@/views/frontend/article-details/index')
      },
      {
        path: '/category/:categoryId',
        name: 'List',
        component: () => import('@/views/frontend/article-list/index')
      },
    ],
    hidden: true
  },

  {
    path: '/admin/dashboard',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Dashboard',
      component: () => import('@/views/backend/dashboard/index'),
      meta: { title: '仪表盘', icon: 'dashboard' }
    }]
  },

  {
    path: '/admin/article',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Article',
        component: () => import('@/views/backend/article/index'),
        meta: { title: '文章管理', icon: 'el-icon-s-promotion' }
      },
      {
        path: 'edit/:id',
        name: 'ArticleEdit',
        component: () => import('@/views/backend/article/edit'),
        meta: { title: '编辑文章', icon: 'el-icon-s-promotion' },
        hidden: true
      },
      {
        path: 'create',
        name: 'ArticleCreate',
        component: () => import('@/views/backend/article/edit'),
        meta: { title: '创建文章', icon: 'el-icon-s-promotion' },
        hidden: true
      }

    ]
  },

  {
    path: '/admin/category',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Category',
        component: () => import('@/views/backend/category/index'),
        meta: { title: '分类管理', icon: 'el-icon-s-order' }
      }
    ]
  },
  {
    path: '/admin/user',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'User',
        component: () => import('@/views/backend/user/index'),
        meta: { title: '用户管理', icon: 'el-icon-user-solid' }
      }
    ],
    //添加roles属性，如果登录用户不是admin就不展示这个菜单，具体控制在src\layout\components\Sidebar\SidebarItem.vue的created方法
    roles:['admin']
  },
  {
    path: '/admin/profile',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Profile',
        component: () => import('@/views/backend/profile/index'),
        meta: { title: '个人信息', icon: 'el-icon-user' }
      }
    ]
  },
  // {
  //   path: '/admin/test-tinymce',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Test',
  //       component: () => import('@/views/backend/test/index'),
  //       meta: { title: '测试', icon: 'el-icon-user' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
