import Vue from 'vue'
import Router from 'vue-router'
import ItemClassification from '../compoment/itemClassification.vue'
import ItemList from '../compoment/itemList.vue'
import ItemDetail from '../compoment/itemDetail.vue'
import CourseTypeList from '../compoment/courseTypeList.vue'
import CourseList from '../compoment/courseList.vue'
import CourseDetail from '../compoment/courseDetail.vue'
import Order from '../compoment/order.vue'
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect:{
                name:'itemClassification'
              }
        },
        {
            path: '/home',
            name: 'itemClassification',
            component: ItemClassification,
        },
        {
            path: '/itemList',
            name: 'itemList',
            component: ItemList,
        },
        {
            path: '/itemDetail',
            name: 'itemDetail',
            component: ItemDetail,
        },
        {
            path: '/courseTypeList',
            name: 'courseTypeList',
            component: CourseTypeList,
        },
        {
            path: '/courseList',
            name: 'courseList',
            component: CourseList,
        },
        {
            path: '/courseDetail',
            name: 'courseDetail',
            component: CourseDetail,
        },
        {
            path:'/order',
            name: 'order',
            component: Order,
        }
    ]
})

export default router;