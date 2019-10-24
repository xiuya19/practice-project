<template>
  <!-- 课程种类列表 -->
  <div class="topFixed">

    <Head :title="title"></Head>
    <!-- course-type-box begin -->
    <div class="course-type-box">
      <!-- 路由 ->对应种类课程的列表 begin -->
      <router-link class="course-type"
                   v-for="it in courseTypes"
                   :key="it.id"
                   :to="{name:'courseList',query:{courseTypeId:it.id}}">
        <img :src="it.src"
             :alt="it.type" />
        <p>{{it.type}}</p>
      </router-link>
      <!-- 路由 ->对应种类课程的列表 end -->
    </div>
    <!-- course-type-box end -->
  </div>
</template>

<script>
import routerMap from '../routerMap/routerMap'
const axiosPath = 'api/courseTypeList'//本页面请求url
export default {
  name: 'courseTypeList',
  data () {
    return {
      title: '课程选择',
      courseTypes: []
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
      this.courseTypes = []
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
    }
    next()
  },
  activated () {
    /**
     * 非初次进入或者非后退时要重新请求
     */
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      this.deleteData()
      this.getData(axiosPath, (res) => {
        this.courseTypes = this.$deepCloneJson(res.data.message)
      })
    }
    this.$route.meta.isBack = false
    this.isFirstEnter = false
  }
};
</script>
<style scoped>
/* module courseTypeList begin */

/*course-type-box begin*/
.course-type-box {
  width: 58em;
  margin: 0 1.75em 0 1.75em;
  padding-top: 1em;
  display: flex;
  flex-wrap: wrap;
}
.course-type-box .course-type {
  display: block;
  border: 1px solid #000;
  width: 18.5em;
  margin-top: 2em;
  box-sizing: border-box;
  text-decoration: none;
  text-align: center;
}
/* 中间的元素撑开左右间距 */
.course-type-box .course-type:nth-child(3n-1) {
  margin-left: 1em;
  margin-right: 1em;
}
.course-type-box .course-type * {
  width: 100%;
}
.course-type-box .course-type p {
  font-size: 2.5em;
  color: #000;
}
/*course-type-box end*/

/* module courseTypeList end */
</style>