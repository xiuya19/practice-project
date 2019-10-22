import Vue from 'vue'
import Router from 'vue-router'
import ItemTypeList from '../compoment/itemTypeList.vue'
import ItemList from '../compoment/itemList.vue'
import ItemDetail from '../compoment/itemDetail.vue'
import CourseTypeList from '../compoment/courseTypeList.vue'
import CourseList from '../compoment/courseList.vue'
import CourseDetail from '../compoment/courseDetail.vue'
import Order from '../compoment/order.vue'
import SearchResult from '../compoment/searchResult.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'itemTypeList'
      }
    },
    {
      path: '/home',
      name: 'itemTypeList',
      component: ItemTypeList,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/itemList',
      name: 'itemList',
      component: ItemList,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/itemDetail',
      name: 'itemDetail',
      component: ItemDetail,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/courseTypeList',
      name: 'courseTypeList',
      component: CourseTypeList,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/courseList',
      name: 'courseList',
      component: CourseList,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/courseDetail',
      name: 'courseDetail',
      component: CourseDetail,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/searchResult',
      name: 'searchResult',
      component: SearchResult,
      meta: {
        keepAlive: true,
        isBack: false
      }
    }
  ],
  // mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
