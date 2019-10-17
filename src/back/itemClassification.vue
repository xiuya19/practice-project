<template>
  <div class="topFixed">
    <Head :title="title"></Head>
    <Search></Search>
    <div class="item-classification">
      <router-link
        class="item-category"
        v-for="it in itemCategorys"
        :key="it.id"
        :to="{name:'courseDetail',query:{courseId:0}}"
      >
        <img :src="it.src" alt />
        <p>{{it.type}}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import Search from "./search.vue";
export default {
  name: "itemClassification",
  data() {
    return {
      title: "礼品商城",
      itemCategorys: [],
      children: []
    };
  },

  components: {
    Search
  },
  mounted() {
    this.$bus.on("item-list-title", data => {
      this.itemCategorys = data;
      // this.$bus.off("item-list-title");
      console.log(this.itemCategorys);
    });
    console.group(
      "%c%s",
      "color:red",
      "mounted 挂载状态===============组件2》"
    );
  },

  beforeCreate() {
    console.group(
      "%c%s",
      "color:red",
      "beforeCreate 创建前状态===============组件2》"
    );
  },
  created() {
    console.group(
      "%c%s",
      "color:red",
      "created 创建完毕状态===============组件2》"
    );
  },
  beforeMount() {
    console.group(
      "%c%s",
      "color:red",
      "beforeMount 挂载前状态===============组件2》"
    );
  },
  beforeUpdate() {
    console.group(
      "%c%s",
      "color:red",
      "beforeUpdate 更新前状态===============组件2》"
    );
  },
  updated() {
    console.group(
      "%c%s",
      "color:red",
      "updated 更新状态===============组件2》"
    );
  },
  beforeDestroy() {
    console.group(
      "%c%s",
      "color:red",
      "beforeDestroy 破前状态===============组件2》"
    );
  },
  destroyed() {
    console.group(
      "%c%s",
      "color:red",
      "destroyed 破坏状态===============组件2》"
    );
  },
  activated() {
    console.group(
      "%c%s",
      "color:red",
      "activated 激活后===============组件2》"
    );
  },
  deactivated() {
    console.group(
      "%c%s",
      "color:red",
      "deactivated 退出后===============组件2》"
    );
  }
};
</script>
<style scoped>
.item-classification {
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  margin-top: 3em;
}
.item-classification .item-category {
  cursor: pointer;
  width: 25.5em;
  margin-left: 2.5em;
  margin-right: 2.5em;
  margin-bottom: 3em;
  border: 1px solid #000;
  text-align: center;
  text-decoration: none;
}
.item-classification .item-category img {
  width: inherit;
}
.item-classification .item-category p {
  font-size: 2.5em;
  color: #000;
}
</style>