<template>
  <div class="topFixed bottomFixed">

    <Head :title="course.name"></Head>
    <div class="course-detail-box">
      <div class="course-detail">
        <p>{{course.content}}</p>
      </div>
      <div class="choseTo">
        <span>选择课程给</span>
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
      </div>
      <div class="score">
        <span>完成的分数为</span>
        <div class="input-score">
          <input type="text"
                 v-model="score" />
          <span>分</span>
        </div>
      </div>
    </div>
    <div class="commit">
      <button @click="toOrder">确&nbsp;&nbsp;定</button>
    </div>
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
      this.course = {
        name: ''
      },
        this.children = []
    },
    choseId (id) {
      return `child${id}`;
    },
    toOrder () {
      window.sessionStorage.setItem('course', JSON.stringify(this.course))
      window.sessionStorage.setItem('score', this.score)
      let temp1 = this.selectChildrenId.sort((a, b) => a - b)
      // console.log('temp', temp1)
      // console.log('this.children', this.children)
      // console.log('this.selectChildrenId', this.selectChildrenId)
      let temp2 = temp1.map(el => {
        for (const index in this.children) {
          if (this.children[index].id === el) {
            return this.children[index]
          }
        }
      })
      // console.log(temp2)
      window.sessionStorage.setItem('selectChildren', JSON.stringify(temp2))
      // window.sessionStorage.setItem('selectChildren', JSON.stringify(this.selectChildrenId.sort((a,b) => a-b).map(el => this.children[el])))
      this.$router.push({ name: 'order' });
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
.course-detail-box {
  width: 100%;
  overflow: hidden;
}
.course-detail {
  width: 100%;
  border: 1px solid #000;
  box-sizing: border-box;
  padding: 0.5em 1em 3em 1em;
  font-size: 2.5em;
}
.choseTo {
  width: 100%;
  border: 1px solid #000;
  box-sizing: border-box;
  padding: 2em 2em 2em 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.choseTo > span {
  font-size: 2.5em;
}
.children {
  font-size: 2.5em;
}
.children input {
  margin-left: 1em;
  width: 1em;
  height: 1em;
}
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
.commit {
  width: 100%;
  position: fixed;
  bottom: 0;
}
.commit button {
  width: 100%;
  color: #fff;
  background-color: #0066ff;
  font-size: 3em;
  text-align: center;
}
</style>