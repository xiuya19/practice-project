<template>
  <!-- 课程对应种类的具体列表 -->
  <div class="topFixed backgroud">

    <Head :title="title"></Head>
    <!-- course-list begin -->
    <div class="course-list-box">
      <router-link class="course-box"
                   v-for="course in courseList"
                   :key="course.id"
                   :to="{name:'courseDetail',query:{courseId:course.id}}">
        <span>{{course.title}}</span>
        <span>&#62;</span>
      </router-link>
    </div>
    <!-- course-list end -->
  </div>
</template>

<script>
import routerMap from '../routerMap/routerMap'
const axiosPath = 'api/courseList'//本页面请求url
export default {
  name: 'courseList',
  props: {},
  data () {
    return {
      title: '',
      courseList: []
    };
  },
  methods: {
    getData: function (path, callback) {
      /**
       * 根据path进行axios请求
       * 获取的数据传入callback执行
       */
      this.$axios
        .get(path)
        .then(res => {
          callback(res)
        })
        .catch(err => console.log('物品类型列表获取失败', err))
    },
    deleteData: function () {
      /**
       * 前进时初始化数据
       */
      this.courseList = []
    }
  },
  created () {
    this.isFirstEnter = true
  },
  beforeRouteEnter (to, from, next) {
    /**
     * routerMap后退映射
     * isBack路由后退
     */
    if (routerMap[to.name] === from.name) {
      to.meta.isBack = true
      window.sessionStorage.setItem('score', '')
      window.sessionStorage.setItem('course', '')
      window.sessionStorage.setItem('selectChildren', '')
    }
    next()
  },
  activated () {
    /**
     * 非初次进入或者非后退时要重新请求
     */
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      this.deleteData()
      this.getData(`${axiosPath}?listId=${this.$route.query.courseTypeId}`, (res) => {
        this.title = res.data.message.title
        this.courseList = this.$deepCloneJson(res.data.message.data)
      })
    }
    this.$route.meta.isBack = false
    this.isFirstEnter = false
  }
};
</script>
<style scoped>
/* module courseList begin */

/* course-list-box begin */
.course-list-box {
  width: 58em;
  box-sizing: border-box;
  padding-top: 1em;
  margin: 0 auto;
  /* border: 1px solid #000; */
}
.course-box {
  background-color: #fff;
  text-decoration: none;
  display: flex;
  margin-bottom: 1em;
  border-radius: 1em;
  padding: 1.5em;
  justify-content: space-between;
}
.course-list-box span {
  font-size: 3em;
  color: #000;
}
.course-list-box span:last-of-type {
  float: right;
}
/* course-list end */

/* module courseList end */
</style>