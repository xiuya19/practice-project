<template>
  <div class="topFixed">

    <Head :title="title"></Head>
    <!-- order-box begin -->
    <div class="order-box">

      <!-- order-receive-address begin -->
      <div class="order-receive-address">
        <p>
          <span>收货人：{{parent.name}}</span>
          <span>电话：{{parent.tel}}</span>
        </p>
        <p>
          <span>收货地址：</span>
          <span>{{parent.address}}</span>
        </p>
      </div>
      <!-- order-receive-address begin -->

      <!-- order-item begin -->
      <div class="order-item">
        <div class="order-item-img">
          <img :src="item.src"
               alt />
        </div>
        <div class="order-item-detail">
          <p>{{fullName}}</p>
          <p>
            <span class="price">￥{{item.price}}</span>
            <span>X{{itemNum}}</span>
          </p>
        </div>
      </div>
      <!-- order-item end -->

      <!-- order-option begin -->
      <div class="order-option">
        <!-- order-send begin -->
        <div class="order-send">
          <span>配送方式</span>
          <span>快递免邮</span>
        </div>
        <!-- order-send end -->

        <!-- order-gift-for begin -->
        <div class="order-gift-for">
          <span>奖品赠予</span>
          <span>{{childrenSring}}</span>
        </div>
        <!-- order-gift-for end -->

        <!-- order-course-for begin -->
        <div class="order-course-for">
          <span>课程选择</span>
          <span>{{course.name}}</span>
        </div>
        <!-- order-course-for end -->

        <!-- order-item-num begin -->
        <div class="order-item-num">
          <div>
            <span>购买数量</span>
          </div>
          <div class="order-button">
            <button @click="itemSub">-</button>
            {{itemNum}}
            <button @click="itemAdd">+</button>
          </div>
        </div>
        <!-- order-item-num end -->

        <!-- order-receive-comment begin -->
        <div class="order-receive-comment">
          <span>买家留言</span>
          <input type="text"
                 v-model="leaveMessage" />
        </div>
        <!-- order-receive-comment end -->
      </div>
      <!-- order-option end -->

      <!-- order-totle begin -->
      <div class="order-totle">
        <span>总共{{itemNum}}件商品</span>
        <div class="order-price">
          <span>总计：</span>
          <span class="price">￥{{finalPrice}}</span>
        </div>
      </div>
      <!-- order-totle end -->

      <!-- order-commit begin -->
      <div class="order-commit">
        <div><span>合计金额：￥{{finalPrice}}</span></div>
        <button @click="commitOrder">提交订单</button>
      </div>
      <!-- order-commit end -->
    </div>
    <!-- order-box begin -->

    <!-- corver begin 遮罩-->
    <div class="corver"
         v-show="popUp">
    </div>
    <!-- corver end -->

    <!-- pop-up begin -->
    <div class="pop-up"
         v-show="popUp">
      <p>{{popUpMessage}}</p>
      <button @click="nextPage">确定</button>
    </div>
    <!-- pop-up end -->
  </div>
</template>

<script>
import routerMap from '../routerMap/routerMap'
const axiosPath = 'api/parent'
export default {
  name: 'order',
  props: {},
  data () {
    return {
      popUp: false,
      itemNum: 1,
      title: '确认订单',
      course: '',
      score: '',
      leaveMessage: '',
      popUpMessage: '发送成功',
      children: [],
      parent: {},
      item: {},
    };
  },
  computed: {
    fullName () {
      /*物品名拼接 */
      return this.item.name + " " + this.item.subName;
    },
    finalPrice () {
      /* 最终价格=物品*数量 */
      return (this.item.price * this.itemNum).toFixed(2)
    },
    childrenSring () {
      /*孩子名字拼接 */
      return this.children.map(el => el.name).join(',')
    }
  },
  methods: {
    itemAdd: function () {
      /* 物品数量+ */
      this.itemNum++;
    },
    itemSub: function () {
      if (this.itemNum > 1) {
        this.itemNum--;
      }
    },
    commitOrder: function () {
      /**
       * 提交订单
       * data为收集的订单数据对象
       */
      let data = {
        parentId: this.parent.id,
        courseId: this.course.id,
        score: this.score,
        itemId: this.item.itemId,
        itemNum: this.itemNum,
        leaveMessage: this.leaveMessage
      }
      this.children.map(el => el.id).forEach((el, index) => {
        data[`children${index}`] = el
      })
      this.$axios.post('api/postOrder', this.$Qs.stringify(data))
        .then(res => {
          this.popUp = true
          console.log(res)
        })
    },
    nextPage: function () {
      /**
       * 提交订单后的重定向
       */
      this.popUp = false
      window.sessionStorage.setItem('item', '')
      window.sessionStorage.setItem('score', '')
      window.sessionStorage.setItem('course', '')
      window.sessionStorage.setItem('selectChildren', '')
      window.location = '/'
    },
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
        .catch(err => console.log('订单获取失败', err))
    },
    deleteData: function () {
      this.popUp = false
      this.itemNum = 1
      this.course = ''
      this.score = ''
      this.leaveMessage = ''
      this.children = []
      this.parent = {}
      this.item = {}
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
        this.parent = this.$deepCloneJson(res.data.message)
      })
      this.course = JSON.parse(window.sessionStorage.getItem('course'))
      this.children = JSON.parse(window.sessionStorage.getItem('selectChildren'))
      this.score = window.sessionStorage.getItem('score')
      this.item = JSON.parse(window.sessionStorage.getItem('item'))
    }
    this.$route.meta.isBack = false
    this.isFirstEnter = false
  }
};
</script>
<style scoped>
/* module order begin */

/* 价格字体颜色  begin*/
.price {
  color: #ff3300;
}
/* 价格字体颜色  end*/

/* .order-box begin */
.order-box {
  width: 100%;
  font-size: 2.5em;
}

/* order-receive-address begin */
.order-receive-address {
  border: 2px solid #000;
  box-sizing: border-box;
  padding: 1em 1em 2em 1em;
}
.order-receive-address p:first-of-type {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2em;
}
.order-receive-address p:last-of-type {
  display: flex;
  align-items: center;
}
.order-receive-address p:last-of-type span:first-of-type {
  width: 6em;
}
/* order-receive-address end */

/* order-item begin */
.order-item {
  width: 100%;
  display: flex;
  border: 2px solid #000;
  box-sizing: border-box;
}
.order-item-img {
  width: 10em;
  border-right: 2px solid #000;
  box-sizing: border-box;
  padding: 0.5em;
}
.order-item-img img {
  width: 100%;
  height: 6em;
}
/* order-item-detail begin */
.order-item-detail {
  width: 15em;
  padding: 1em 0.8em 1em 0.8em;
  box-sizing: border-box;
}
.order-item-detail p:first-of-type {
  margin-bottom: 1.5em;
}
.order-item-detail p:last-of-type {
  display: flex;
  justify-content: space-between;
}
/* order-item-detail end */
/* order-item end */

/* order-option begin */
.order-option .order-send,
.order-gift-for,
.order-course-for,
.order-receive-comment {
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #000;
  display: flex;
  padding: 1em 0.8em 1em 0.8em;
  justify-content: space-between;
}

/* order-item-num begin */
.order-item-num {
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #000;
  display: flex;
  justify-content: space-between;
}
.order-item-num .order-button {
  box-sizing: border-box;
  border-left: 2px solid #000;
  padding: 0.5em 0.8em 0.5em 0.8em;
}
.order-item-num .order-button button {
  width: 1.5em;
  font-size: 1.5em;
  outline: none;
  background-color: transparent;
  border: 0px solid transparent;
}
.order-item-num div:first-of-type {
  box-sizing: border-box;
  padding: 0.5em 0.8em 0.5em 0.8em;
}
/* order-item-num end */

/* order-receive-comment begin */
.order-receive-comment input {
  flex-grow: 1;
  margin-left: 1em;
  outline: none;
  background-color: transparent;
  border: 0px solid transparent;
  border-bottom: 2px solid #000;
}
/* order-receive-comment end */
/* order-option end */

/* order-totle begin */
.order-totle {
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border: 2px solid #000;
  padding: 1em 0.8em 1em 0.8em;
}
/* order-totle begin */

/* order-commit begin */
.order-commit {
  width: 100%;
  display: flex;
  align-items: center;
  border: 2px solid #000;
  justify-content: space-between;
}
.order-commit div {
  text-align: center;
  flex-grow: 1;
}
.order-commit button {
  outline: none;
  width: 6em;
  height: 2em;
  font-size: 1.5em;
  background-color: #0066ff;
  border: 0px solid transparent;
  color: #fff;
}
/* order-commit begin */

/* corver begin */
.corver {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #999;
  z-index: 1000;
  opacity: 0.7;
}
/* corver end */

/* pop-up begin */
.pop-up {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 30em;
  height: 12em;
  background-color: #fff;
  z-index: 1001;
  text-align: center;
}
.pop-up p {
  font-size: 4em;
  line-height: 2em;
}
.pop-up button {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  font-size: 2.5em;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: 0px solid transparent;
  border-top: 2px solid #000;
  outline: none;
}
/* pop-up end */
/* module order end */
</style>