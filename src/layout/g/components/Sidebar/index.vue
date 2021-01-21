<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :background-color="variables.gMenuBg"
        :text-color="variables.gMenuText"
        :unique-opened="true"
        :active-text-color="variables.gMenuActiveText"
        :collapse-transition="false"
        mode="vertical"
      ></el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.less'

export default {
  components: {},
  computed: {
    ...mapGetters(['user']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    }
  }
}
</script>
