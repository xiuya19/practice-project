<template>
  <!-- 标题模块 -->
  <header>
    <!-- 后退键 -->
    <span @click="back">&lt;</span>
    <!-- 标题 -->
    <h1>{{title}}</h1>
  </header>
</template>

<script>
export default {
  name: "Head",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    back: function() {
      // console.log(`router ${this.$route.path}`)
      if (this.$route.path === "/home") {
        window.location = '/fatherIndex.html'
      }
      else {
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style scoped>
/* module head begin */
header {
  position: fixed;
  top:0;
  width: 100%;
  padding: 2em 0 2em 0;
  text-align: center;
  overflow: hidden;
  background-color: #FFCC00;
}
header span {
  float: left;
  margin-top: 0.2em;
  margin-left: 0.5em;
  font-size: 4em;
}
header h1 {
  font-size: 5em;
  display: inline;
  margin-right: 0.75em;
}
/* module head end */
</style>