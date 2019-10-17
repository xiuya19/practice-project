<template>
  <keep-alive>
    <router-view />
  </keep-alive>
</template>

<script>
export default {
  data() {
    return {
      itemListTitle: [],
      children: [],
      order:{}
    };
  },
  created() {
    this.$axios
      .get("api/children")
      .then(res => {
        this.children = res.data.message.children;
      })
      .catch(err => console.log("列表获取错误", err));
    this.$axios
      .get("api/itemListTitle")
      .then(res => {
        this.itemListTitle = res.data.message;
        this.$bus.emit("item-list-title", this.itemListTitle);
      })
      .catch(err => console.log("列表获取错误", err));
  },
  updated() {
    this.$bus.emit("children-list", this.children);
  }
};
</script>

<style scoped>
</style>
