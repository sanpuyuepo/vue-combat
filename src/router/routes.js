import Home from '@/pages/Home/'
import Search from '@/pages/search/'
import Login from '@/pages/Login/'
import Register from '@/pages/Register/'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

export default [
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
    props: route => ({ keyword: route.params.keyword})
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
  {
    path: '/detail/:skuid',
    component: Detail,
    meta: {
      showFooter: true
    }
  },
  {
    name: 'addCartSuccess',
    path: '/addCartSuccess',
    component: AddCartSuccess,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/shopCart',
    component: ShopCart,
    meta: {
      showFooter: true
    }
  },,
  // 重定向
  {
    path: '*',
    redirect: '/home'
  }
]