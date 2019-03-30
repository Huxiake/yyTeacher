<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      mode="vertical"
    >
      <div class="sideLogo">
        <svg-icon class="logo-svg" icon-class="logo" style="width:32px;height:32px;"/>
        <h1 v-if="!isCollapse">教学信息平台</h1>
      </div>
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      var path = this.$route.path
      var routers = []
      if (path === '/') {
        routers = this.$router.options.routes.filter(item => {
          let res = false
          if (item.name) {
            res = true
          }
          return res
        })
      } else {
        routers = this.$router.options.routes.filter(item => {
          let res = false
          if (item.meta && path.indexOf(item.meta.module) !== -1) {
            res = true
          }
          return res
        })
      }
      return routers[0].children
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style lang="scss">
.sideLogo {
  position: relative;
  overflow: hidden;
  height: 64px;
  padding-left: 11px;
  line-height: 64px;
  background: #002140;
  transition: all .3s;
  & h1 {
    margin: 0 auto;
    margin-left: 40px;
    font-size: 18px;
    color:#FFFFFF;
  }
}
.logo-svg {
  position: absolute;
  margin: 16px auto;
}
</style>
