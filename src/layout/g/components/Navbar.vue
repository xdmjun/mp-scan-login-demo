<template>
  <div class="navbar">
    <div class="left-title">小程序扫码登录Demo</div>
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <span class="uname">{{ user.base.name || '未知用户' }}</span>
          <i class="el-icon-arrow-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item divided>
            <el-link href="/logout">退出</el-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['user'])
  },
  data() {
    return {
      name: ''
    }
  },
  created() {},
  methods: {}
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
  padding: 0 20px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left-title {
    font-size: 18px;
    line-height: 25px;
    color: #444;
    font-weight: bold;
  }
  .right-menu {
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
  padding: 0;
  .el-dropdown-menu__item--divided {
    border-top: unset;
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
</style>
