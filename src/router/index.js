import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from '../views/main-layout.vue'
import SentimentAnalysis from '../views/sentiment-analysis.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout
  },
  {
    path: '/sentiment-analysis',
    name: 'SentimentAnalysis',
    component: SentimentAnalysis
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router