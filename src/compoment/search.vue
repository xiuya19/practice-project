<template>
  <div class="search">
    <input type="text">
    <button>搜索</button>
  </div>
</template>

<script>

  export default {
    name:'search',
    props:{},
    data () {
      return {

      };
    },

    components: {},

    methods: {},

  }

</script>
<style scoped>
    .search{
        width: 100%;
        padding: 1.4em 2em 1.4em 2em;
        display: flex;
        box-sizing: border-box;
        
        border: 1px solid #111;
    }
    .search input{
        flex-grow: 1;
        font-size: 2.5em;
        padding-left: 1em;
        border: 2px solid #999;
        border-radius: 1em;
        outline:none;
    }
    .search button{
        width: 4em;
        height: 2em;
        font-size: 1.8em;
        margin-left: 1.4em;
        border: 2px solid #999;
        border-radius: 1em;
        outline:none;
    }
</style>