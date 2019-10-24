<template>
  <!-- 物品详情 -->
  <div class="topFixed  back-color">

    <Head :title="title"></Head>
    <!-- 物品主要信息 begin -->
    <div class="item-info">
      <img :src="item.src"
           alt />
      <p>{{fullName}}</p>
      <p class="price">￥{{item.price}}</p>
    </div>
    <!-- 物品主要信息 end -->

    <!-- 物品参数 begin -->
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
    <!-- 物品参数 end -->

    <!-- 物品细节图 begin-->
    <div class="item-detail">
      <p>细节图</p>
      <img v-for="it in item.detailSrc"
           :key="it.id"
           :src="it.src"
           alt />
    </div>
    <!-- 物品细节图 end -->

    <div class="item-router-button">
      <button class>联系客服</button>
      <p class="price">总共：￥{{finalPrice}}</p>
      <button class="buy"
              @click="toCourse">选择课程</button>
    </div>
  </div>
</template>

<script>
import routerMap from '../routerMap/routerMap'
const axiosPath = 'api/itemDetail'//本页面请求url
export default {
  name: 'itemDetail',
  props: {},
  data () {
    return {
      title: '商品详情',
      isFirstEnter: true,
      item: {}
    }
  },
  computed: {
    fullName () {
      /* 物品名拼接 */
      return this.item.name + " " + this.item.subName;
    },
    finalPrice () {
      /*留后续打折用接口 */
      return this.item.price;
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
        .catch(err => console.log('物品类型列表获取失败', err))
    },
    deleteData: function () {
      /**
       * 前进时初始化数据
       */
      this.item = {}
    },
    toCourse: function () {
      /**
       * 存储item的id
       * 路由 ->课程类别列表
       */
      window.sessionStorage.setItem('item', JSON.stringify(this.item))
      this.$router.push({ path: 'courseTypeList' })
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
      this.getData(`${axiosPath}?itemId=${this.$route.query.itemId}`, (res) => {
        this.item = this.$deepCloneJson(res.data.message)

      })
    }
    this.$route.meta.isBack = false
    this.isFirstEnter = false
  }
};
</script>
<style scoped>
/* module itemDetail begin */

/* 价格字体颜色  begin*/
.price {
  color: #ff3300;
}
/* 价格字体颜色  end*/

/* item-info begin */
.item-info {
  width: 100%;
  padding: 2em 2em 0 2em;
  box-sizing: border-box;
  border: 1px solid #000;
}
.item-info * {
  width: 100%;
  margin-bottom: 1em;
}
.item-info p {
  font-size: 2.5em;
}
/* item-info end */

/* item-status begin */
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
/* item-status end */

/* item-detail begin */
.item-detail {
  width: 100%;
  font-size: 2.5em;
  box-sizing: border-box;
  border: 1px solid #000;
  text-align: center;
}
.item-detail p {
  width: 100%;
  font-size: 1.25em;
  padding: 0.5em 0;
  box-sizing: border-box;
  border: 1px solid #000;
}
.item-detail img {
  width: 100%;
  padding: 0.5em 2em 2em 2em;
  box-sizing: border-box;
}
/* item-detail end */

/* item-router-button begin */
.item-router-button {
  width: 100%;
  display: flex;
}
.item-router-button p {
  flex-grow: 1;
  text-align: center;
  line-height: inherit;
  font-size: 2.5em;
}
.item-router-button button {
  font-size: 2.5em;
  width: 6em;
  height: 2em;
  color: #fff;
  outline: none;
}
.item-router-button button:first-of-type {
  background-color: #ffcc00;
}
.item-router-button button:last-of-type {
  background-color: #0066ff;
}
/* item-router-button end */

/* module itemDetail end */
</style>