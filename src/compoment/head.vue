<template>
  <header>
    <span @click="back">&lt;</span>
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
      if (this.$route.path === "/home") {
        window.location = '/abc.html'
      }
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
header {
  position: fixed;
  top:0;
  width: 100%;
  padding: 2em 0 2em 0;
  text-align: center;
  overflow: hidden;
  background-color: #7d75eb;
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
</style>