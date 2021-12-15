import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes'

Vue.use(VueRouter);





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
  routes,
  // 路由切换滚动行为
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { y: 0 }
  }
})