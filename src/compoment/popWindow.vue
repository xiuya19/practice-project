<template>
  <div v-show="showPop">
    <div class="corver"></div>
    <div class="pop-main">
      <span>X</span>
      <p class="pop-title">{{title}}</p>
      <p class="pop-content">{{content}}</p>
      <button @click="popCommit">确定</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'popWindow',
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    showPop: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    popCommit() {
      this.$emit('popCommit');
    }
  }
}
</script>
<style scoped>
.corver {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #999;
  z-index: 1000;
  opacity: 0.7;
}
.pop-main {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 40em;
  height: 25em;
  border-radius: 2em;
  box-sizing: border-box;
  background-color: #fff;
  z-index: 1001;
  text-align: center;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.3);
}
.pop-main .pop-title {
  background-color: #ffcc00;
  box-sizing: border-box;
  border-radius: 0.6em 0.6em 0 0;
  color: #fff;
  font-size: 3em;
  line-height: 2em;
}
.pop-main span {
  position: absolute;
  font-size: 3em;
  line-height: 2em;
  right: 0.5em;
  color: #fff;
}
.pop-main .pop-content {
  box-sizing: border-box;
  font-size: 2.5em;
  line-height: 1.5em;
  padding-top: 1em;
}
.pop-main button {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  font-size: 2.5em;
  margin: 0;
  padding: 0;
  color: #fff;
  background-color: #2E2EFE;
  border-radius: 0 0 0.6em 0.6em;
  border: 0px solid transparent;
  outline: none;
}
</style>