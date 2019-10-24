<template>
  <!-- 搜索模块 -->
  <div class="search">
    <input type="text"
           v-model="itemName">
    <button @click="searchItem">搜索</button>
  </div>
</template>

<script>
export default {
  name: 'searchResult',
  data () {
    return {
      itemName: ''
    };
  },
  methods: {
    searchItem: function () {
      /**
       * 路由 ->搜索结果
       * 设置搜索内容
       */
      window.sessionStorage.setItem('searchName', this.itemName)
      window.sessionStorage.setItem('searchItem', '')
      this.$router.push({ path: '/searchResult' })
    }
  }
}
</script>

<style scoped>
/* module search begin */
.search {
  width: 100%;
  padding: 1.4em 2em 1.4em 2em;
  display: flex;
  box-sizing: border-box;

  border: 1px solid #111;
}
.search input {
  flex-grow: 1;
  font-size: 2.5em;
  padding-left: 1em;
  border: 2px solid #999;
  border-radius: 1em;
  outline: none;
}
.search button {
  width: 4em;
  height: 2em;
  font-size: 1.8em;
  margin-left: 1.4em;
  border: 2px solid #999;
  border-radius: 1em;
  outline: none;
}
/* module search end */
</style>