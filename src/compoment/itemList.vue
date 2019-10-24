<template>
  <!-- 对应种类物品的列表 -->
  <div class="topFixed">

    <Head :title="title"></Head>
    <div class="item-list-box">
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
      /**
       * 前进时初始化数据
       */
      this.itemLists = []
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
    if (routerMap[to.name] === from.name) {
      to.meta.isBack = true
      window.sessionStorage.setItem('item', '')
    }
    next()
  },
  activated () {
    /**
     * 非初次进入或者非后退时要重新请求
     */
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
/* module itemList begin */

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
  box-sizing:border-box;
  border: 0.2em solid #fff;
  padding: 1em;
  margin-bottom: 1em;
  border-radius: 1em;
  justify-content: space-between;
  background-color: #fff;
  text-decoration: none;
}

/* item-img-box begin */
.item-list-box .item-list .item-img-box img{
  width: 20em;
  height: 20em;
}
/* item-img-box end */

/* item-info-box begin */
.item-list-box .item-list .item-info-box{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1em 1em 1em 0;
  box-sizing: border-box;
}
.item-info-box p{
  text-align: right;
  font-size: 3em;
  color: #000;
}
/* item-info-box end */
/* item-list end */
/* item-list-box end */
/* module itemList end */
</style>