<template>
  <div class="topFixed">

    <Head :title='title'></Head>
    <Search></Search>
    <div class="item-type-list">
      <router-link class="item-type"
                   v-for="it in typeList"
                   :key="it.id"
                   :to="{name:'itemList',query:{listId:it.id}}">
        <img :src="it.src"
             alt />
        <p>{{it.type}}</p>
      </router-link>
    </div>
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
      this.typeList = []
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
.item-type-list {
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  margin-top: 3em;
}
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
.item-type-list .item-type img {
  width: inherit;
}
.item-type-list .item-type p {
  font-size: 2.5em;
  color: #000;
}
</style>