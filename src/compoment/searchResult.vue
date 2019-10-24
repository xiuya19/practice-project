<template>
  <div class="topFixed">

    <Head :title="title"></Head>
    <div class="search-title">查找的商品名：{{searchName}}</div>
    <div class="no-item"
         v-if="searchFailure">没有名为 {{searchName}} 的商品，请更换关键字搜索</div>
    <div class="search-list"
         v-if="searchSuccess">
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
  </div>
</template>
<script>
export default {
  name: 'searchRes',
  props: {},
  data () {
    return {
      isFirstEnter: true,
      searchRes: true,
      title: '搜索结果',
      searchName: '',
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
        .catch(err => console.log('搜索结果失败', err))
    },
    deleteData: function () {
      /**
       * 前进时初始化数据
       */
      this.itemLists = []
    }
  },
  computed: {
    searchSuccess: function () {
      return this.itemLists.length > 0
    },
    searchFailure: function () {
      return this.itemLists.length === 0
    }
  },
  created () {
    this.isFirstEnter = true
  },
  beforeRouteEnter (to, from, next) {
    /**
     * routerMap后退映射
     * isBack路由后退
     */
    if (from.name === 'itemDetail') {
      to.meta.isBack = true
    }
    next()
  },
  activated () {
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      this.deleteData()
      this.searchName = window.sessionStorage.getItem('searchName')
      this.getData(encodeURI(`api/search?itemName=${this.searchName}`), (res) => {
        if (res.data.code === 2000) {
          this.itemLists = this.$deepCloneJson(res.data.message.data)
        }
      })
    }
    this.$route.meta.isBack = false
  },
}
</script>
<style scoped>
.search-title {
  background-color: #aaa;
}
.search-title,
.no-item {
  width: 100%;
  font-size: 2.5em;
  text-align: center;
  padding: 0.5em 0 0.5em 0;
}
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