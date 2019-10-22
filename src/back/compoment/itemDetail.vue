<template>
  <div class="topFixed">
    <Head :title="title"></Head>
    <div class="item">
      <img :src="item.src" alt />
      <p>{{fullName}}</p>
      <p class="price">￥{{item.price}}</p>
    </div>
    <div class="item-status">
      <p class="clearFix">
        <span>材料</span>
        <span>{{item.material}}</span>
      </p>
      <p class="clearFix">
        <span>尺寸</span>
        <span>{{item.size}}</span>
      </p>
    </div>
    <router-link class="choice clearFix" :to="{name:'courseTypeList'}">
      <span>课程选择</span>
      <span>&#62;</span>
    </router-link>
    <div class="item-detail">
      <p>细节图</p>
      <img v-for="it in item.detailSrc" :key="it.id" :src="it.src" alt />
    </div>
    <div class="button">
      <button class>联系客服</button>
      <p class="price">总共：￥{{finalPrice}}</p>
      <button class="buy">立即购买</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "itemDetail",
  props: {},
  data() {
    return {
      title: "商品详情",
      item: {}
    };
  },
  computed: {
    fullName() {
      return this.item.name + " " + this.item.subName;
    },
    finalPrice() {
      return this.item.price;
    }
  },
  created() {
    this.$axios
      .get(`api/itemDetail?itemId=${this.$route.query.itemId}`)
      .then(res => {
        
        this.item = res.data.message;
        this.$bus.emit('item-info', this.item);
      })
      .catch(err => console.log("商品详情获取失败", err));
  }
};
</script>
<style scoped>
.price {
  color: #ff3300;
}
.item {
  width: 100%;
  padding: 2em 2em 0 2em;
  box-sizing: border-box;
  border: 1px solid #000;
}
.item * {
  width: 100%;
  margin-bottom: 1em;
}
.item p {
  font-size: 2.5em;
}

.item-status {
  width: 100%;
  font-size: 2.5em;
}
.item-status p {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #000;
  padding: 0.5em 0 0.5em 0;
}
.item-status p span:first-of-type {
  float: left;
  margin-left: 2em;
}
.item-status p span:last-of-type {
  float: right;
  margin-right: 2em;
}

.choice {
  display: block;
  width: 100%;
  font-size: 2.5em;
  box-sizing: border-box;
  border: 1px solid #000;
  color: #000;
  padding: 0.5em 0 0.5em 0;
}
.choice span:first-of-type {
  float: left;
  margin-left: 2em;
}
.choice span:last-of-type {
  float: right;
  margin-right: 2em;
}

.item-detail {
  width: 100%;
  font-size: 2.5em;
  box-sizing: border-box;
  border: 1px solid #000;
  text-align: center;
}
.item-detail p {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #000;
}
.item-detail img {
  width: 100%;
  padding: 2em;
  box-sizing: border-box;
}

.button {
  width: 100%;
  display: flex;
}
.button p {
  flex-grow: 1;
  text-align: center;
  line-height: inherit;
  font-size: 2.5em;
}
.button button {
  font-size: 2.5em;
  width: 6em;
  height: 2em;
  color: #fff;
  outline: none;
}
.button button:first-of-type {
  background-color: #ffcc00;
}
.button button:last-of-type {
  background-color: #0066ff;
}
</style>