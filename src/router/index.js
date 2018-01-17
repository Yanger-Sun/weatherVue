import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import weather from '@/components/weather'
import news from '@/components/new'
import book from '@/components/book'
import today from '@/components/today'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      
    },
    {
      path: '/weather',
      name: 'weather',
      component: weather
    },
    {
      path: '/new',
      name: 'new',
      component: news
    },
    {
      path: '/book',
      name: 'book',
      component: book
    },
    {
      path: '/today',
      name: 'today',
      component: today
    }
  ]
})




