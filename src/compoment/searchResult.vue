<template>
  <div class="topFixed">

    <Head :title="title"></Head>
    <!-- search-title begin -->
    <div class="search-title">查找的商品名：{{searchName}}</div>
    <!-- search-title end -->

    <!-- no-item begin -->
    <div class="no-item"
         v-if="searchFailure">没有名为 {{searchName}} 的商品，请更换关键字搜索</div>
    <!-- no-item end -->

    <!-- item-list-box begin -->
    <div class="item-list-box"
         v-if="searchSuccess">
      <!-- 路由 ->物品详情 begin-->
      <router-link class="item-list"
                   v-for="it in itemLists"
                   :key="it.id"
                   :to="{name:'itemDetail',query:{itemId:it.itemId}}">
        <div class="item-img-box">
          <img :src="it.src"
               :alt="it.itemName" />
        </div>
        <div class="item-info-box">
          <p>{{it.itemName}}</p>
          <p>价格：{{it.price}}</p>
        </div>
      </router-link>
      <!-- 路由 对应种类物品的列表->物品详情 end-->
    </div>
    <!-- item-list-box begin -->
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
    /*是否查找到商品 */
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

/* item-list-box begin */
.item-list-box {
  width: 58em;
  margin: 0 auto;
  padding-top: 1em;
}
/* item-list begin */
.item-list-box .item-list {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  box-sizing: border-box;
  border: 0.2em solid #fff;
  padding: 1em;
  margin-bottom: 1em;
  border-radius: 1em;
  justify-content: space-between;
  background-color: #fff;
  text-decoration: none;
}

/* item-img-box begin */
.item-list-box .item-list .item-img-box img {
  width: 20em;
  height: 20em;
}
/* item-img-box end */

/* item-info-box begin */
.item-list-box .item-list .item-info-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1em 1em 1em 0;
  box-sizing: border-box;
}
.item-info-box p {
  text-align: right;
  font-size: 3em;
  color: #000;
}
/* item-info-box end */
/* item-list end */
/* item-list-box end */
</style>