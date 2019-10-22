<template>
  <div>
    <Head :title="title"></Head>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: ['礼品商城'],
      itemListTitle: [],
      children: [],
      order: {}
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
  watch: {
    title() {
      console.log(this.title);
    }
  },
  mounted() {
    this.$bus.emit("children-list", this.children);
    this.$bus.off('title');
    this.$bus.on('title', e => {
      this.title.push(e)
    });
  }
};
</script>

<style scoped>
</style>
