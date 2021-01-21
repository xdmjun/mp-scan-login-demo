<template>
  <div class="app-wrapper clearfix">
    <Navbar />
    <div class="container">
      <img class="avatar" :src="user.base.avatar ? user.base.avatar : require('@/assets/avatar.png')" alt />
      <div class="tip">
        {{ user.base.openid ? '登录成功' : '登录失效' }}
        <img :src="tip" />
      </div>
      <div>openid:{{ user.base.openid ? user.base.openid : '-' }}</div>
      <div v-if="user.base.unionid">unionid:{{ user.base.unionid }}</div>
      <div>
        <el-link href="https://github.com/xuedingmiaojun/mp-scan-login-demo" target="_blank" type="primary"
          >https://github.com/xuedingmiaojun/mp-scan-login-demo</el-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Navbar } from '@/layout/g/components'
export default {
  name: 'index',
  computed: {
    ...mapGetters(['user']),
  },
  components: { Navbar },
  data() {
    return {
      tip: require('@/assets/tip.png'),
    }
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.navbar {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  height: 65px;
  padding: 0 40px 0 20px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.24);

  .container {
    margin: auto;
    width: 1080px;
    height: 65px;
  }
  .left-title {
    float: left;
    font-size: 16px;
    line-height: 25px;
    font-weight: 400;
    color: #444;
    &:not(.show-logo) {
      margin-top: 20px;
    }
    &.show-logo {
      display: flex;
      height: 100%;
      align-items: center;
    }
    /deep/ .el-page-header__content,
    /deep/ .el-page-header__title {
      font-size: 18px;
      color: #444;
      font-weight: 600;
    }
    /deep/ .el-page-header__left {
      margin-right: 30px;
      .el-icon-back {
        display: none;
      }
      &::after {
        content: none;
      }
    }
    /deep/ .el-page-header {
      margin-left: 44px;
      &.hidden {
        // margin-left: 40px;
        .el-page-header__left {
          display: none;
        }
      }
      &.relations {
        margin-left: 0 !important;
      }
    }
    /deep/ .el-image__inner {
      height: 65px;
      max-width: 1000px;
    }
    /deep/ .ty-logo {
      width: 245px;
      .el-image__inner {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 65px;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    .avatar-container {
      .avatar-wrapper {
        position: relative;
        .uname {
          font-size: 14px;
          color: #444;
          line-height: 20px;
        }
        i {
          position: absolute;
          top: 25px;
          right: -20px;
          font-size: 15px;
          font-weight: 600;
          color: #9b9b9b;
        }
      }
    }
  }
}

.el-dropdown-menu {
  width: 140px;
  top: 40px !important;
  text-align: center;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  .el-dropdown-menu__item--divided {
    border-top: unset;
    margin-top: 0;
    padding: 0;
    &:before {
      content: unset;
    }
    > a {
      display: inline-block;
      width: 100%;
    }
    .el-link.is-underline:hover:after {
      border: none !important;
    }
  }
  a:hover,
  li:hover {
    background: #f9f9f9;
    color: #444;
    border: none;
  }
}
.container {
  padding-top: 140px;
  margin: auto;
  width: 1080px;
  background: #fff;
  text-align: center;
  margin-top: 80px;
  padding-bottom: 160px;
  .avatar {
    border-radius: 100%;
    max-width: 180px;
    margin-bottom: 20px;
  }
  .tip {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
    img {
      width: 25px;
      margin: 0 0 -2px 5px;
    }
  }
}
</style>
