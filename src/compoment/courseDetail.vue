<template>
  <!-- 课程详情 -->
  <div class="topFixed bottomFixed">

    <Head :title="course.name"></Head>
    <!-- course-detail-box begin -->
    <div class="course-detail-box">
      <!-- course-detail begin -->
      <div class="course-detail">
        <p>{{course.content}}</p>
      </div>
      <!-- course-detail end -->

      <!-- chose-to-children begin -->
      <div class="chose-to-children">
        <span>选择课程给</span>
        <!-- children-list begin -->
        <div class="children">
          <div v-for="child in children"
               :key="child.id">
            <label :for="choseId(child.id)">{{child.name}}</label>
            <input type="checkbox"
                   :id="choseId(child.id)"
                   v-model="selectChildrenId"
                   :value="child.id" />
          </div>
        </div>
        <!-- children-list begin -->
      </div>
      <!-- chose-to-children end -->

      <!-- score end -->
      <div class="score">
        <span>完成的分数为</span>
        <div class="input-score">
          <input type="text"
                 v-model="score" />
          <span>分</span>
        </div>
      </div>
    </div>
    <!-- score end -->

    <!-- commit begin -->
    <div class="course-commit">
      <button @click="toOrder">确&nbsp;&nbsp;定</button>
    </div>
    <!-- commit end -->
  </div>
</template>

<script>
import routerMap from '../routerMap/routerMap'
const axiosPath1 = 'api/courseDetail'
const axiosPath2 = 'api/children'
export default {
  name: 'courseDetail',
  data () {
    return {
      score: '',
      course: {
        name: ''
      },
      children: [],
      selectChildrenId: []
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
        .catch(err => console.log('列表获取失败', err))
    },
    deleteData: function () {
      /**
       * 前进时初始化数据
       */
      this.score = ''
      this.course = {
        name: ''
      }
      this.children = []
      this.selectChildrenId = []
    },
    choseId (id) {
      /*label用绑定id */
      return `child${id}`;
    },
    toOrder () {
      /**
       * 路由跳转至order
       * 设置存储
       */
      if (!this.score) {
        alert('课程分数为空')
        return 
      }
      if (!this.selectChildrenId.length) {
        alert('请至少选择一个孩子')
        return
      }
      window.sessionStorage.setItem('course', JSON.stringify(this.course))
      window.sessionStorage.setItem('score', this.score)
      let temp1 = this.selectChildrenId.sort((a, b) => a - b)
      let temp2 = temp1.map(el => {
        for (const index in this.children) {
          if (this.children[index].id === el) {
            return this.children[index]
          }
        }
      })
      window.sessionStorage.setItem('selectChildren', JSON.stringify(temp2))
      this.$router.push({ name: 'order' });
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
     * routerMap后退映射
     * isBack路由后退
     */
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      this.deleteData()
      this.getData(`${axiosPath1}?courseId=${this.$route.query.courseId}`, (res) => {
        this.title = res.data.message.name
        this.course = this.$deepCloneJson(res.data.message)
      })
      this.getData(axiosPath2, (res) => {
        this.children = this.$deepCloneJson(res.data.message.children)
        // window.sessionStorage.setItem('children', JSON.stringify(this.children))
      })
    }
    this.$route.meta.isBack = false
    this.isFirstEnter = false
  }
};
</script>
<style scoped>
/* module courseDetail begin */

/* course-detail-box begin */
.course-detail-box {
  width: 100%;
  overflow: hidden;
}
/* course-detail-box end */

/* course-detail begin */
.course-detail {
  width: 100%;
  border: 1px solid #000;
  box-sizing: border-box;
  padding: 0.5em 1em 3em 1em;
  font-size: 2.5em;
}
/* course-detail end */

/* chose-to-children begin */
.chose-to-children {
  width: 100%;
  border: 1px solid #000;
  box-sizing: border-box;
  padding: 2em 2em 2em 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.chose-to-children > span {
  font-size: 2.5em;
}

/* children begin */
.chose-to-children .children {
  font-size: 2.5em;
}
.chose-to-children .children input {
  margin-left: 1em;
  width: 1em;
  height: 1em;
}
/* children end */

/* chose-to-children end */

/* score begin */
.score {
  width: 100%;
  border: 1px solid #000;
  box-sizing: border-box;
  padding: 2em 2em 2em 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.score span {
  font-size: 2.5em;
}
.input-score input {
  width: 2.5em;
  font-size: 2.5em;
  outline: none;
  border: 0;
  border-bottom: 2px solid #000;
}
/* score end */

/* course-commit begin */
.course-commit {
  width: 100%;
  position: fixed;
  bottom: 0;
}
.course-commit button {
  width: 100%;
  color: #fff;
  background-color: #0066ff;
  font-size: 3em;
  text-align: center;
}
/* course-commit end */

/* module courseDetail end */
</style>