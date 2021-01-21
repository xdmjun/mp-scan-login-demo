<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/variables.less';

.app-main {
  padding-left: calc(@sideBarWidth + 20px);
  padding-top: 85px;
  margin: 0 20px;
}

.app-main .gov-main {
  background: #fff;
  border: 1px solid rgba(255, 255, 255, 0);
  padding: 20px;
  border-radius: 6px;
}
</style>

<style lang="less">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
