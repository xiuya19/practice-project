<template>
  <div class="topFixed">

    <Head :title="title"></Head>
    <router-link class="item-list-box clearFix"
                 v-for="it in itemLists"
                 :key="it.id"
                 :to="{name:'itemDetail',query:{itemId:it.itemId}}">
      <div class="item-box">
        <img :src="it.src"
             alt />
        <span>{{it.itemName}}</span>
      </div>
      <div class="price-box">
        <p>价格：{{it.price}}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
import routerMap from '../routerMap/routerMap'
const axiosPath = 'api/itemLists'
export default {
  name: 'itemList',
  data () {
    return {
      title: '',
      isFirstEnter: true,
      itemLists: []
    }
  },
  methods: {
    getData: function (path, callback) {
      /**
       * 根据path进行axios请求
       * 获取的数据传入callback执行
       */
      this.$axios
        .get(path)
        .then(res => {
          callback(res)
        })
        .catch(err => console.log('物品列表获取失败', err))
    },
    deleteData: function () {
      this.itemLists = []
    }
  },
  created () {
    this.isFirstEnter = true
  },
  beforeRouteEnter (to, from, next) {
    if (routerMap[to.name] === from.name) {
      to.meta.isBack = true
    }
    next()
  },
  activated () {
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      this.deleteData()
      this.getData(`${axiosPath}?listId=${this.$route.query.listId}`, (res) => {
        this.itemLists = this.$deepCloneJson(res.data.message.data)
        this.title = res.data.message.title
      })
    }
    this.$route.meta.isBack = false
    this.isFirstEnter = false
  }
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