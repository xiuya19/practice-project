<template>
  <div class="topFixed backgroud">
    <Head :title="title"></Head>
    <div 
      class="course-list" 
      v-for="course in courseList" 
      :key="course.id">
      <router-link 
        class="course-box" 
        :to="{name:'courseDetail',query:{courseId:course.id}}"
      >
        <span>{{course.title}}</span>
        <span>&#62;</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      title: "",
      courseList:[]
    };
  },
  created() {
    this.$axios
      .get(`api/courseList?listId=${this.$route.query.courseTypeId}`)
      .then(res => {
        this.title = res.data.message.title;
        this.courseList = res.data.message.list;

      })
      .catch(err => console.log("列表获取错误", err));
  }
};
</script>
<style scoped>
.course-list {
  width: 100%;
  padding: 2em;
  box-sizing: border-box;
  border:1px solid #000;
}
.course-box{
  text-decoration: none;
}
.course-list span{
  font-size: 2.5em;
  color:#000;
}
.course-list span:last-of-type{
  float: right;
}
</style>