<template>
  <div class="topFixed">
    <Head :title="title"></Head>
    <div class="order-box">
      <div class="order-receive-address">
        <p>
          <span>收货人：{{order.receiver}}</span>
          <span>电话：{{order.tel}}</span>
        </p>
        <p>
          <span>收货地址：</span>
          <span>{{order.address}}</span>
        </p>
      </div>
      <div class="order-item">
        <div class="order-item-img">
          <img :src="item.src" alt />
        </div>
        <div class="order-item-detail">
          <p>{{fullName}}</p>
          <p>
            <span class="price">￥{{finalPrice}}</span>
            <span>X{{itemNum}}</span>
          </p>
        </div>
      </div>
      <div class="order-option">
        <div class="order-send">
          <span>配送方式</span>
          <span>快递免邮</span>
        </div>
        <div class="order-gift-for">
          <span>奖品赠予</span>
          <span>{{order.child}}</span>
        </div>
        <div class="order-course-for">
          <span>课程选择</span>
          <span>{{orderCourse}}</span>
        </div>
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
        <div class="order-receive-comment">
          <span>买家留言</span>
          <input type="text" />
        </div>
      </div>
      <div class="order-totle">
        <span>总共{{itemNum}}件商品</span>
        <div class="order-price">
          <span>总计：</span>
          <span class="price">￥{{finalPrice}}</span>
        </div>
      </div>
      <div class="order-commit">
        <div><span>合计金额：￥{{finalPrice}}</span></div>
        <button>提交订单</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order",
  props: {},
  data() {
    return {
      title: "确认订单",
      order: {
        receiver: "张三",
        tel: "15602214562",
        address: "广东省广州市番禺区广州大学城广州大学",
        courses: ["游戏1", "游戏2"]
      },
      item: {
        itemId: 0,
        name: "泰迪熊",
        subName: "电影同款 美国原版",
        price: 150,
        material: "纯棉",
        size: "20cm*30cm",
        src: "https://fn.storage.img.ztzl.moe/2019/08/14/http.png",
        detailSrc: "https://fn.storage.img.ztzl.moe/2019/08/14/http.png"
      },
      itemNum: 1
    };
  },
  computed: {
    fullName() {
      return this.item.name + " " + this.item.subName;
    },
    finalPrice() {
      return (this.item.price * this.itemNum).toFixed(2);
    },
    orderCourse() {
      return this.order.courses.join("，");
    }
  },
  methods: {
    itemAdd() {
      this.itemNum++;
    },
    itemSub() {
      if (this.itemNum > 1) {
        this.itemNum--;
      }
    }
  },
};
</script>
<style scoped>
.price {
  color: #ff3300;
}
.order-box {
  width: 100%;
  font-size: 2.5em;
}
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

.order-item {
  width: 100%;
  display: flex;
  border: 2px solid #000;
  box-sizing: border-box;
}
.order-item-img {
  width: 40%;
  border-right: 2px solid #000;
  box-sizing: border-box;
  padding: 0.5em;
}
.order-item-img img {
  width: 100%;
  height: 6em;
}
.order-item-detail {
  width: 60%;
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
.order-send,
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
.order-item-num {
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #000;
  display: flex;
  justify-content: space-between;
}
.order-item-num div:first-of-type {
  box-sizing: border-box;
  padding: 0.5em 0.8em 0.5em 0.8em;
}
.order-button {
  box-sizing: border-box;
  border-left: 2px solid #000;
  padding: 0.5em 0.8em 0.5em 0.8em;
}
.order-button button {
  width: 1.5em;
  font-size: 1.5em;
  outline: none;
  background-color: transparent;
  border: 0px solid transparent;
}
.order-receive-comment input {
  flex-grow: 1;
  margin-left: 1em;
  outline: none;
  background-color: transparent;
  border: 0px solid transparent;
  border-bottom: 2px solid #000;
}
.order-totle {
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border: 2px solid #000;
  padding: 1em 0.8em 1em 0.8em;
}
.order-commit{
  width: 100%;
  display: flex;
  align-items: center;
  border: 2px solid #000;
  justify-content: space-between;
}
.order-commit div{
  text-align: center;
      flex-grow: 1;
}
.order-commit button{
  outline: none;
  width: 6em;
  height:2em;
  font-size:1.5em;
  background-color:#0066FF;;
  border: 0px solid transparent;
  color:#fff;
}
</style>