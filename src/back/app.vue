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
      children: []
    };
  },
  created() {
    this.$axios
      .get("api/children")
      .then(res => {
        this.children = res.data.message.children;
        this.$bus.emit("children-list", this.children);
      })
      .catch(err => console.log("列表获取错误", err));
    this.$axios
      .get("api/itemListTitle")
      .then(res => {
        this.itemListTitle = res.data.message;
        this.$bus.emit("item-list-title", this.itemListTitle);
      })
      .catch(err => console.log("列表获取错误", err));
    console.group(
      "%c%s",
      "color:red",
      "created 创建完毕状态===============组件1》"
    );
  },

  beforeCreate() {
    console.group(
      "%c%s",
      "color:red",
      "beforeCreate 创建前状态===============组件1》"
    );
  },
  beforeMount() {
    console.group(
      "%c%s",
      "color:red",
      "beforeMount 挂载前状态===============组件1》"
    );
  },
  mounted() {
    console.group(
      "%c%s",
      "color:red",
      "mounted 挂载状态===============组件1》"
    );
  },
  beforeUpdate() {
    console.group(
      "%c%s",
      "color:red",
      "beforeUpdate 更新前状态===============组件1》"
    );
  },
  updated() {
    console.group(
      "%c%s",
      "color:red",
      "updated 更新状态===============组件1》"
    );
  },
  beforeDestroy() {
    console.group(
      "%c%s",
      "color:red",
      "beforeDestroy 破前状态===============组件1》"
    );
  },
  destroyed() {
    console.group(
      "%c%s",
      "color:red",
      "destroyed 破坏状态===============组件1》"
    );
  },
  activated() {
    console.group(
      "%c%s",
      "color:red",
      "destroyed 激活后===============组件1》"
    );
  },
  deactivated() {
    console.group(
      "%c%s",
      "color:red",
      "destroyed 退出后===============组件1》"
    );
  }
};
</script>

<style scoped>
</style>
