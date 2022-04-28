import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new Router({
  mode: 'hash',
  routes: [
  
    {
      path: '/',
      name: 'login',
      component: require('@/components/login').default
    }, {
      path: '/index',
      name: 'main',
      component: require('@/components/main/main').default,
      children: [
        {
          path: '/zdcs',
          name: 'ZDCS',
          component: require('@/components/view/ZDCS').default
        },
        {
          path: '/sdcs',
          name: 'SDCS',
          // meta: {
          //   keepAlive: true, //添加这个作为标志符，表明该页面需要保留状态
          // },
          component: require('@/components/view/SDCS/sdcs').default,
        },
        {
          path: '/zdsb',
          name: 'ZDSB',
          component: require('@/components/view/ZDSB').default
        },
        {
          path: '/txl',
          name: 'TXL',
          meta: {
            keepAlive: true, 
          },
          component: require('@/components/view/TXL/txl').default
        }, {
          path: '/sjcj',
          name: 'SJCJ',
          component: require('@/components/view/SJCJ/sjcj').default
        }, {
          path: '/xnpg',
          name: 'XNPG',
          component: require('@/components/view/XNPG').default
        },

      ]
    }, {
      path: '/spth',
      name: 'spth',
      component: require('@/components/dialog/spth').default
    }, {
      path: '/yyth',
      name: 'yyth',
      component: require('@/components/dialog/yyth').default
    }, {
      path: '/yyfs',
      name: 'yyfs',
      component: require('@/components/dialog/yyfs').default
    }, {
          path: '/sphy',
          name: 'sphy',
          component: require('@/components/dialog/sphy').default
    }, {
          path: '/drcs',
          name: 'drcs',
          component: require('@/components/dialog/drcs').default
    }, {
      path: '/dialog',
      name: 'dialogCenter',
      component: require('@/components/dialog/dialogCenter').default,
    }, {
      path: '/notify',
      name: 'notify',
      component: require('@/components/dialog/notify').default,
    },
  ]
})
router.beforeEach((to, from, next) => {
  console.log(to.path)
  if (to.matched.length === 0) {
    //next("/404");
  } else {
    //如果匹配到就跳转
    if (to.path !== "/404") {
      sessionStorage.setItem("routerCatch", to.path);
    }
    next();
  }
})
export default router