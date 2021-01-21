<template>
  <div class="app-wrapper">
    <navbar />
    <sidebar class="sidebar-container" />
    <app-main />
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import { judgeSide } from '@/utils/index'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  methods: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/variables.less';

.app-wrapper {
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}
</style>
<style lang="less">
// msg-box样式覆盖
.el-message-box {
  padding-bottom: 20px;
  width: 540px;
  .el-message-box__header {
    padding: 20px 20px 0 20px;
    .el-message-box__title {
      color: #444444;
      font-weight: 500;
    }
  }
  .el-message-box__content {
    padding: 30px 20px;
    color: #444444;
    font-size: 16px;
  }
  .el-message-box__btns {
    padding-top: 0;
    .el-button {
      font-family: system-ui;
      font-weight: 500;
      min-width: 68px;
      height: 36px;
      font-size: 14px;
      &.el-button--danger {
        background: #649cee;
        border-color: #649cee;
        &:hover {
          background-color: #7cabf1;
          border-color: #7cabf1;
        }
      }
    }
  }
}
.el-select-dropdown.not-show-drop {
  display: none;
}
</style>