<template>
  <div class="topFixed">
    <Head :title="title"></Head>
    <router-link
      class="item-list-box clearFix"
      v-for="it in itemLists"
      :key="it.id"
      :to="{name:'itemDetail',query:{itemId:it.itemId}}"
    >
      <div class="item-box">
        <img :src="it.src" alt />
        <span>{{it.itemName}}</span>
      </div>
      <div class="price-box">
        <p>价格：{{it.price}}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "itemList",
  data() {
    return {
      title: "",
      itemLists: []
    };
  },
  created() {
    this.$axios
      .get(`api/itemLists?listId=${this.$route.query.listId}`)
      .then(res => {
        this.title = res.data.message.title;
        this.itemLists = res.data.message.data;
      })
      .catch(err => console.log("列表获取错误", err));
  },
  methods: {
    query(id) {
      return {
        itemId: id,
        listId: this.$route.query.listId
      };
    }
  },
};
</script>
<style scoped>
.item-list-box {
  width: 100%;
  box-sizing: border-box;
  display: block;
  padding: 2em;
  border: 1px solid #000;
}
.item-list-box .item-box {
  float: left;
  display: flex;
  line-height: 20em;
}
.item-list-box .item-box img {
  width: 20em;
  height: 20em;
}
.item-list-box .price-box {
  float: right;
  line-height: 20em;
}
p,
span {
  font-size: 3em;
  color: #777;
}
span {
  padding-left: 1em;
}
</style>