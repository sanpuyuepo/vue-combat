import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '@/pages/Home/Index.vue'
import Search from '@/pages/Search/Index.vue'
import Login from '@/pages/Login/Index.vue'
import Register from '@/pages/Register/Index.vue'



// * 编程式路由跳转，参数不变时，多次执行会抛出 NavigationDuplicated 警告错误？
/* 
出现这个错误的原因是 vue-router@3.5.3 引入了 promise , 调用 router 实例的方法如push等会返回一个promise，通过传递相应的成功、失败回调，可以捕获当前错误来解决，但是这种方法治标不治本 

治本的方法：如下：
*/
const originPush = VueRouter.prototype.push;
// 重写 push | replace
VueRouter.prototype.push = function(location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}


export default new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home,
      meta: {
        showFooter: true
      }
    },
    {
      name: 'search',
      path: '/search/:keyword?', // * 占位符后添加 问号，指定 params 选择性传递
      component: Search,
      meta: {
        showFooter: true
      },
      // ? 路由组件传递 props 数据：
      // 布尔值写法：props 被设置为 true，route.params 将会被设置为组件属性
      // props: true 

      // 对象写法：额外的给路由组件传递一些props
      // props: {
      //   a: 1,
      //   b: 2
      // }

      // * 函数写法：可以将 params / query 参数通过 props 传递给路由组件
      props: route => ({ keyword: route.params.keyword, k: route.query.k })
    },
    {
      path: '/login',
      component: Login,
      meta: {
        showFooter: false
      }
    },
    {
      path: '/register',
      component: Register,
      meta: {
        showFooter: false
      }
    },

    // 重定向
    {
      path: '*',
      redirect: '/home'
    }
  ]
})