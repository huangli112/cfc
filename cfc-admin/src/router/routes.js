import { AppLayout } from '@/components/Layout'

export const otherRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/auth/login')
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/error/404')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

export const appRoutes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: AppLayout,
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '首页',
          icon: 'home'
        },
        component: () => import(/* webpackChunkName: "table" */ '@/views/home/home')
      },
      {
        path: '/about-company',
        name: 'about-company',
        meta: {
          title: '关于公司',
          icon: 'project'
        },
        component: () => import(/* webpackChunkName: "table" */ '@/views/about/about')
      },
      {
        path: '/soft',
        name: 'soft',
        meta: {
          title: '软件产品',
          icon: 'project'
        },
        component: () => import('@/views/soft/soft')
      },
      {
        path: '/train',
        name: 'train',
        meta: {
          title: '实训板块',
          icon: 'appstore'
        },
        component: () => import(/* webpackChunkName: "table" */ '@/views/train/train')
      },
      {
        path: '/company-info',
        name: 'company-info',
        meta: {
          title: '企业信息化',
          icon: 'folder-open'
        },
        component: () => import(/* webpackChunkName: "table" */ '@/views/companyInfo/companyInfo')
      },
      {
        path: '/partner',
        name: 'partner',
        meta: {
          title: '合作伙伴',
          icon: 'user'
        },
        component: () => import(/* webpackChunkName: "table" */ '@/views/partner/partner')
      },
      {
        path: '/news',
        name: 'news',
        meta: {
          title: '新闻动态',
          icon: 'file-markdown'
        },
        component: () => import(/* webpackChunkName: "table" */ '@/views/news/news')
      },
      {
        path: '/news-detail/:id',
        name: 'news-detail',
        component: () => import(/* webpackChunkName: "table" */ '@/views/news/newsDetail')
      },
      {
        path: '/concat-us',
        name: 'concat-us',
        meta: {
          title: '联系我们',
          icon: 'phone'
        },
        component: () => import(/* webpackChunkName: "table" */ '@/views/contactUs/contactUs')
      }
    ]
  }
]

const routes = [...otherRoutes, ...appRoutes]

export default routes
