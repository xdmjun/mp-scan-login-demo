<template>
  <div class="login-main">
    <div class="navbar">
      <div class="title">小程序扫码登录Demo</div>
    </div>
    <div class="login-container">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="off"
        label-position="left"
      >
        <div class="title-container">
          <div class="title active">账号登录</div>
        </div>
        <el-form-item prop="username">
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="用户名/手机号"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            ref="password"
            type="password"
            v-model="loginForm.password"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="off"
            @keyup.enter.native="handleLogin"
          ></el-input>
        </el-form-item>

        <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin">登录</el-button>

        <div class="other-login">
          <div class="title">其他方式登录</div>
          <img src="@/assets/mp.png" class="wx-logo" title="小程序登录" alt="小程序登录" @click="wxLogin" />
        </div>
      </el-form>

      <el-dialog
        title
        :visible.sync="wxLoginVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="wxLoginClose"
        width="540px"
      >
        <div class="scan-pop wx-login">
          <div class="title">扫小程序码登录</div>
          <div class="content">
            <div class="qr-code">
              <img :key="uuid" :src="qrUrl" alt="小程序码" />
              <div class="tip">请使用微信扫描小程序码登录{{ bindTimeout ? '(已超时)' : '' }}</div>
              <div class="auth-setting">
                启用授权获取用户信息：<el-switch
                  v-model="auth"
                  @change="authChange"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                >
                </el-switch>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { GlobalGetUuidShort } from '@/utils/index'
import { mapGetters } from 'vuex'
import constantCenterRoutes from '@/router/center'
import { getUUid, login, getToken } from '@/api/user'
const apiRoot = process.env.VUE_APP_BASE_API
export default {
  name: 'login',
  computed: {
    ...mapGetters(['user']),
  },
  data() {
    return {
      gzh: require('@/assets/testgzh.jpeg'),
      bindTimeout: false,
      auth_time: 60,
      timer: null,
      qrUrl: '',
      wxLoginVisible: false,
      loginForm: {
        username: '',
        password: '',
        mobile: '',
        verification: '',
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名/手机号不得为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不得为空' }],
      },
      msgLoginRules: {
        mobile: [{ required: true, trigger: 'blur', message: '手机号不得为空' }],
        verification: [{ required: true, trigger: 'blur', message: '验证码不得为空' }],
      },
      loading: false,
      auth: false,
      uuid: '',
    }
  },
  methods: {
    authChange(val) {
      this.qrUrl = apiRoot + '/getCode?uuid=' + this.uuid + '&useAuth=' + (val ? 1 : 0)
      this.$forceUpdate()
    },
    wxLoginClose() {
      this.timer && clearTimeout(this.timer)
      this.bindTimeout = false
    },
    wxLogin() {
      let uuid = GlobalGetUuidShort()
      this.uuid = uuid
      this.qrUrl = apiRoot + '/getCode?uuid=' + uuid + '&useAuth=0'
      this.wxLoginVisible = true
      let that = this
      let counter = 1

      this.timer && clearTimeout(this.timer)
      this.timer = setInterval(function () {
        // 获取openid
        getUUid({ uuid: uuid })
          .then((res) => {
            counter++
            if (counter === 60) {
              clearTimeout(that.timer)
              that.bindTimeout = true
            }
            if (res.data.openid !== '') {
              clearTimeout(that.timer)
              that.wxLoginVisible = false
              let { nickname, avatar, openid } = res.data
              that.$store.dispatch('user/changeName', nickname)
              that.$store.dispatch('user/changeAvatar', avatar)
              that.$store.dispatch('user/changeOpenid', openid)
              that.$router.push('/index')
            }
          })
          .catch((err) => {
            clearTimeout(this.timer)
          })
      }, 3000)
    },
    handleLogin() {
      let that = this
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          that.$message({
            type: 'success',
            message: '假的，不用点了',
          })
        } else {
          return false
        }
      })
    },
  },
  created() {
    getToken()
    this.$store.dispatch('user/logout')
  },
}
</script>

<style>
html,
body {
  background: #e6f5fd;
  height: 100%;
}
</style>

<style lang="less" scoped>
.login-main {
  position: relative;
  height: 100%;
  .navbar {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    height: 65px;
    line-height: 65px;
    text-align: center;
    color: #444;
    font-weight: bold;
    padding: 0 20px;
    overflow: hidden;
    font-size: 20px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  }
}

.login-container {
  padding-top: 150px;
  .login-form {
    margin: 0 auto;
    width: 400px;
    padding: 50px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 10px 20px 0px rgba(33, 33, 33, 0.05);

    .el-form-item {
      border: 1px solid rgba(220, 223, 230, 1);
      background: #fff;
      border-radius: 4px;
      margin-bottom: 24px;
      & + .el-form-item.is-required {
        margin-bottom: 30px;
      }

      .el-input {
        display: inline-block;
        height: 40px;
        width: 100%;

        /deep/ input {
          background: transparent;
          border: 0px;
          -webkit-appearance: none;
          border-radius: 0px;
          padding: 10px 15px;
          color: #444;
          height: 40px;
          caret-color: #444;
        }
        /deep/ input::-webkit-input-placeholder {
          color: #9b9b9b;
          font-size: 14px;
        }

        /deep/ input:-moz-placeholder {
          color: #9b9b9b;
          font-size: 14px;
        }

        /deep/ input::-moz-placeholder {
          color: #9b9b9b;
          font-size: 14px;
        }

        /deep/ input:-ms-input-placeholder {
          color: #9b9b9b;
          font-size: 14px;
        }
      }
      /deep/ .el-form-item__error {
        top: 42px;
        color: #f55955;
      }
    }

    /deep/ .el-form-item {
      .el-input {
        display: inline-table;
        .el-input-group__prepend {
          border: none;
          width: 56px;
          padding: 0 0 0 15px;
          background-color: #f1f1f1;
        }
      }
      &.mobile {
        .el-input-group--prepend .el-input__inner {
          background: #fff;
          border-radius: 4px;
        }
      }
      &.verify-code {
        display: flex;
        margin-bottom: 30px;
        .el-form-item__content {
          width: 100%;
        }
        .el-form-item__label {
          min-width: 58px;
          padding: 0 0 0 15px;
          text-align: center;
          color: #9b9b9b;
          font-weight: normal;
          &::before {
            display: none;
          }
        }
        .el-input {
          .el-input-group__append {
            background-color: #fff;
            border: none;
            padding: 0 15px;
            .verification {
              color: #649cee;
              cursor: pointer;
              &.is-loading {
                color: #909399;
              }
            }
          }
        }
      }
    }

    button {
      width: 100%;
      background-color: #649cee;
      border-color: #649cee;
      margin-bottom: 10px;
      font-weight: 600;
      &:hover {
        background-color: #7cabf1;
        border-color: #7cabf1;
      }
    }

    .login-links {
      a {
        font-size: 14px;
        font-weight: 500;
        color: #9b9b9b;
        /deep/ &.el-link.is-underline:hover:after {
          display: none;
        }
        &.activate {
          margin-left: 10px;
          padding-left: 10px;
          border-left: 1px solid #9b9b9b;
        }
      }
    }
    .other-login {
      margin-top: 30px;
      text-align: center;
      .title {
        color: #dcdfe6;
        position: relative;
        font-size: 14px;
        &:before {
          position: absolute;
          left: 0;
          top: 50%;
          content: '';
          width: 100px;
          height: 1px;
          background: #dcdfe6;
          display: inline-block;
        }
        &:after {
          position: absolute;
          right: 0;
          top: 50%;
          content: '';
          width: 100px;
          height: 1px;
          background: #dcdfe6;
          display: inline-block;
        }
      }
      .wx-logo {
        margin-top: 20px;
        width: 36px;
        height: 36px;
        border-radius: 100%;
        cursor: pointer;
      }
    }

    .title-container {
      position: relative;
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 24px;
        color: #909399;
        margin: 0px auto 30px auto;
        text-align: center;
        cursor: pointer;
        &.active {
          color: #649cee;
          font-weight: bold;
        }
      }
    }
  }

  /deep/ .el-dialog__body {
    padding: 20px 70px 40px;
  }
  /deep/ .el-dialog__close {
    font-size: 20px;
    font-weight: 600;
  }

  .scan-pop {
    .title {
      font-size: 18px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 20px;
    }
    .content {
      a {
        position: relative;
        display: block;
        background: #f8f9fa;
        border-radius: 6px;
        height: 110px;
        line-height: 110px;
        padding-left: 140px;
        font-size: 16px;
        font-weight: 600;
        /deep/ .el-image {
          position: absolute;
          left: 50px;
          top: 20px;
        }
        & + a {
          margin-top: 10px;
        }
      }
    }
    &.wx-login {
      .title {
        font-size: 30px;
        color: #444444;
        font-weight: bold;
      }
      .content {
        text-align: center;
        .tip {
          margin: 10px 0;
        }
        .qr-code img {
          width: 200px;
          height: 200px;
        }
        .auth-setting {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>