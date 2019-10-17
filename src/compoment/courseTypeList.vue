<template>
  <div class="topFixed">
    <Head :title="title"></Head>
    <div class="course-type-box">
      <router-link
        class="courseType"
        v-for="it in courseTypes"
        :key="it.id"
        :to="{name:'courseList',query:{courseTypeId:it.id}}"
      >
        <img :src="it.src" alt />
        <p>{{it.type}}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "courseTypeList",
  props: {},
  data() {
    return {
      title: "课程选择",
      courseTypes:[]
    };
  },
  created() {
    this.$axios
      .get("api/courseTypeList")
      .then(res => {
        this.courseTypes = res.data.message;
      })
      .catch(err => console.log("列表获取错误", err));
  }
};
</script>
<style scoped>
.course-type-box {
  width: 96%;
  margin: 0 2% 0 2%;
  padding-top: 1em;
  display: flex;
  flex-wrap: wrap;
}
.course-type-box .courseType {
  display: block;
  border: 1px solid #000;
  width: 32%;
  margin-top: 2em;
  box-sizing: border-box;
  text-decoration: none;
  text-align: center;
}
.course-type-box .courseType:nth-child(3n-1) {
  margin-left: 2%;
  margin-right: 2%;
}
.course-type-box .courseType * {
  width: 100%;
}
.course-type-box .courseType p {
  font-size: 2.5em;
  color: #000;
}
</style>