import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import VueLazyload from 'vue-lazyload'

import loading from '@/assets/loading.gif'
Vue.use(VueLazyload, {
  loading: loading,
})

import store from '@/store'
import "swiper/css/swiper.css";
import { MessageBox } from 'element-ui'

// 导入全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/carousel'
import Pagination from './components/pagination'

// 注册全局组件 
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

Vue.config.productionTip = false

// Mock
import './mock/mockServe'

import '@/plugins/validate'
// 统一引入
import * as API from '@/api'

new Vue({
  render: h => h(App),
  // 全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API
  },
  // 注册 router 路由, 组件实例身上都有 $route, $router 属性
  router,
  // 注册 vuex 仓库，组件实例会有一个 $store 属性
  store
}).$mount('#app')
