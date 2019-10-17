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
          <div v-for="child in children" :key="child.id">
            <label :for="choseId(child.id)">{{child.name}}</label>
            <input type="checkbox" :id="choseId(child.id)" />
          </div>
        </div>
      </div>
      <div class="score">
        <span>完成的分数为</span>
        <div class="input-score">
          <input type="text" />
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
export default {
  name: "courseDetail",
  data() {
    return {
      course: {
        name: ""
      },
      children: []
    };
  },
  methods: {
    choseId(id) {
      return `child${id}`;
    },
    toOrder() {
      this.$router.push({ name: "order" });
    }
  },
  created() {
    this.$axios
      .get("api/courseDetail")
      .then(res => {
        this.course = res.data.message;
      })
      .catch(err => console.log("课程获取错误", err));
  },
  mounted() {
    this.$bus.on("children-list", data => {
      this.children = data;
    });
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