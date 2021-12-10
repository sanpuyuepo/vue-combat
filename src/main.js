import Vue from 'vue'
import App from './App.vue'
import router from '@/router'


import store from '@/store'
import "swiper/css/swiper.css";

// 导入全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/carousel'

// 注册全局组件 
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)

Vue.config.productionTip = false

// Mock
import './mock/mockServe'

new Vue({
  render: h => h(App),
  // 注册 router 路由, 组件实例身上都有 $route, $router 属性
  router,
  // 注册 vuex 仓库，组件实例会有一个 $store 属性
  store
}).$mount('#app')
