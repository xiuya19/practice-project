<template>
  <!-- 物品种类列表 -->
  <div class="topFixed">

    <Head :title='title'></Head>
    <!-- search模块 begin-->
    <Search></Search>
    <!-- search模块 end-->

    <!-- 物品种类列表 begin-->
    <div class="item-type-list">
      <!-- 路由 ->对应种类的物品列表  begin-->
      <router-link class="item-type"
                   v-for="it in typeList"
                   :key="it.id"
                   :to="{name:'itemList',query:{listId:it.id}}">
        <img :src="it.src"
             :alt="it.type" />
        <p>{{it.type}}</p>
      </router-link>
      <!-- 路由 种类列表->对应种类的物品列表  end-->
    </div>
    <!-- 物品种类列表 end-->
  </div>
</template>

<script>
import Search from './search.vue'
import routerMap from '../routerMap/routerMap'
const axiosPath = 'api/itemListTitle'
export default {
  name: 'itemTypeList',
  data () {
    return {
      title: '礼品商城',
      isFirstEnter: true,
      typeList: [],
    };
  },
  components: {
    Search
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
        .catch(err => console.log('物品类型列表获取失败', err))
    },
    deleteData: function () {
      /**
       * 前进时初始化数据
       */
      this.typeList = []
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
    }
    next()
  },
  activated () {
    /**
     * 非初次进入或者非后退时要重新请求
     */
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      this.deleteData()
      this.getData(axiosPath, (res) => {
        this.typeList = this.$deepCloneJson(res.data.message)
      })
    }
    this.$route.meta.isBack = false
    this.isFirstEnter = false
  }
};
</script>
<style scoped>
/* module itemTypeList begin */

/* item-type-list begin */
.item-type-list {
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  margin-top: 3em;
}

/* item-type begin */
.item-type-list .item-type {
  cursor: pointer;
  width: 25.5em;
  margin-left: 2.5em;
  margin-right: 2.5em;
  margin-bottom: 3em;
  /* border: 1px solid #000; */
  text-align: center;
  text-decoration: none;
}
.item-type-list .item-type {
  background-color: #fff;
  border-radius: 1em;
}
.item-type-list .item-type img {
  width: inherit;
  border-radius: 1em 1em 0 0;
}
.item-type-list .item-type p {
  font-size: 2.5em;
  color: #000;
}
/* item-type end */

/* item-type-list end */

/* module itemTypeList end */
</style>