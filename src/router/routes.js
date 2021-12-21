import Home from '@/pages/Home/'
import Search from '@/pages/search/'
import Login from '@/pages/Login/'
import Register from '@/pages/Register/'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

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
    props: route => ({ keyword: route.params.keyword })
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
  },
  {
    path: '/trade',
    component: Trade,
    meta: {
      showFooter: true
    },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path === '/shopCart') {
        next()
      } else {
        next(false) // 中断当前导航，从哪儿来回哪儿去
      }
    }
  },
  {
    path: '/pay',
    component: Pay,
    meta: {
      showFooter: true
    },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path === '/trade') {
        next()
      } else {
        next(false) // 中断当前导航，从哪儿来回哪儿去
      }
    }
  },
  {
    path: '/paySuccess',
    component: PaySuccess,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/center',
    component: Center,
    meta: {
      showFooter: true
    },
    children: [
      {
        // 二级路由不用写 / 
        path: 'myOrder',
        component: MyOrder,
      },
      {
        path: 'groupOrder',
        component: GroupOrder,
      },
      {
        path: '/center',
        redirect: '/center/myOrder',
      }
    ]
  },

  // 重定向
  {
    path: '*',
    redirect: '/home'
  }
]