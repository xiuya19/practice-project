<template>
  <div class="topFixed backgroud">

    <Head :title="title"></Head>
    <div class="course-list"
         v-for="course in courseList"
         :key="course.id">
      <router-link class="course-box"
                   :to="{name:'courseDetail',query:{courseId:course.id}}">
        <span>{{course.title}}</span>
        <span>&#62;</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import routerMap from '../routerMap/routerMap'
const axiosPath = 'api/courseList'
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
      this.courseList = []
    }
  },
  created () {
    this.isFirstEnter = true
  },
  beforeRouteEnter (to, from, next) {
    if (routerMap[to.name] === from.name) {
      to.meta.isBack = true
    }
    next()
  },
  activated () {
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
.course-list {
  width: 100%;
  padding: 2em;
  box-sizing: border-box;
  border: 1px solid #000;
}
.course-box {
  text-decoration: none;
}
.course-list span {
  font-size: 2.5em;
  color: #000;
}
.course-list span:last-of-type {
  float: right;
}
</style>