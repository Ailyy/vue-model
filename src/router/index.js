import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewsView from '../views/NewsView.vue'
import NoticeView from '../views/NoticeView.vue'
import DocumentView from '../views/DocumentView.vue'
import NewsDetailView from '../views/NewsDetailView.vue'
import NoticeDetailView from '../views/NoticeDetailView.vue'
import DocumentDetailView from '../views/DocumentDetailView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/header'
  },
  {
    path: '/header',
    name: 'home',
    component: HomeView
  },
  {
    path: '/news',
    name: 'news',
    component: NewsView
  },
  {
    path: '/news/:id',
    name: 'newsDetail',
    component: NewsDetailView
  },
  {
    path: '/notice',
    name: 'notice',
    component: NoticeView
  },
  {
    path: '/notice/:id',
    name: 'noticeDetail',
    component: NoticeDetailView
  },
  {
    path: '/document',
    name: 'document',
    component: DocumentView
  },
  {
    path: '/document/:id',
    name: 'documentDetail',
    component: DocumentDetailView
  },
]

const router = new VueRouter({
  routes
})

export default router
