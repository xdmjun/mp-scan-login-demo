<template>
  <div id="app" :class="{ mobile: isWeixin }">
    <router-view />
  </div>
</template>
<script>
import { isWeixin } from '@/utils/index'
export default {
  data() {
    return {
      isWeixin: isWeixin() || this.$route.path.indexOf('wx') != -1
    }
  },
  created() {
    if (isWeixin() || this.$route.path.indexOf('wx') != -1) {
      ;/iphone|ipod|ipad/i.test(navigator.appVersion) &&
        document.addEventListener(
          'blur',
          event => {
            // 当页面没出现滚动条时才执行，因为有滚动条时，不会出现这问题
            // input textarea 标签才执行，因为 a 等标签也会触发 blur 事件
            if (
              document.documentElement.offsetHeight <= document.documentElement.clientHeight &&
              ['input', 'textarea'].includes(event.target.localName)
            ) {
              document.body.scrollIntoView() // 回顶部
            }
          },
          true
        )
      // 移动端适配
      require('lib-flexible/flexible')
      require('./styles/mobile.less')
    } else {
      require('./styles/index.less')
    }
  },
  mounted() {
    // 检测浏览器路由改变页面不刷新问题,hash模式的工作原理是hashchange事件
    window.addEventListener(
      'hashchange',
      () => {
        let currentPath = window.location.hash.slice(1)
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath)
        }
      },
      false
    )
  }
}
</script>
<style lang="less"></style>
