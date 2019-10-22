<template>
  <div class="topFixed">
    <Search></Search>
    <div class="item-classification">
      <router-link
        class="item-category"
        v-for="it in itemCategorys"
        :key="it.id"
        :to="{name:'itemList',query:{listId:it.id}}"
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
    });
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