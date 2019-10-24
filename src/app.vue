<template>
  <div class="app">
    <transition name="fade">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
/*淡入淡出 begin*/
.fade-enter-active{
    transition: opacity .3s
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
    opacity: 0
}
/*淡入淡出 end*/
</style>
