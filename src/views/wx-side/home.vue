<template>
  <div class="page">
    <div class="content">
      <img :src="require('@/assets/mp.png')" alt />
      <div class="tip">微信扫描小程序码登录Demo</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  name: 'home',
  components: {},
  computed: {
    ...mapGetters(['user']),
  },

  methods: {},
  created() {},
}
</script>

<style lang="less" scoped>
.page {
  height: 100%;
  background: #fff;
}
.content {
  padding-top: 60px;
  text-align: center;
  .tip {
    margin-top: 15px;
  }
}
</style>