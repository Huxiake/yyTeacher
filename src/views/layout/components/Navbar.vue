<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" style="padding:0 5px;line-height: 66px"/>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" style="left: 25px" @select="handleSelect">
      <el-menu-item v-for="(item, index) in routers" :key="index" :index="item.path">{{ item.title }}</el-menu-item>
    </el-menu>
    <el-dropdown class="avatar-container" trigger="click">
      <!-- <div class="avatar-wrapper">
      </div> -->
      <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar" style="width: 24px;height: 24px;">
      <span>{{ name }}</span>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            主页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item @click.native="changePasswordDialogVisible=true">
          修改密码
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <!-- 修改密码的dialog -->
    <el-dialog :visible.sync="changePasswordDialogVisible" title="修改密码" width="40%" append-to-body>
      <el-form :model="changePasswordForm">
        <el-form-item :label-width="formLabelWidth" label="旧密码">
          <el-input v-model="changePasswordForm.oldPassword" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="新密码">
          <el-input v-model="changePasswordForm.newPassword" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="确认密码">
          <el-input v-model="changePasswordForm.surePassword" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changePasswordDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleChangePassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Hamburger
  },
  data() {
    return {
      activeIndex: '',
      routers: [],
      changePasswordDialogVisible: false,
      changePasswordForm: {
        oldPassword: '',
        newPassword: '',
        surePassword: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  created() {
    this.activeIndex = '/' + this.$route.path.match(/\/(\S*)\//)[1]
    const routers = this.$router.options.routes
    this.routers = routers.filter(item => !item.hidden)
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    handleSelect(key, keyPath) {
      this.$router.push(key)
    },
    handleChangePassword() {
      // 修改密码
      alert('修改密码')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 64px;
  width: 100%;
  line-height: 64px;
  padding: 4px;
  position: fixed;
  z-index: 1001;
  background-color: #FFFFFF;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    position: absolute;
    display: inline-block;
    right: 250px;
    top: 0;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
    img {
      vertical-align: middle;
    }
  }
}
</style>

<style>
.navbar .hamburger-container {
    padding: 0 5px;
}
</style>
