<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <div class="logo">
        </div>
        <el-menu
          :router="true"
          :unique-opened="true"
          class="el-menu-vertical-demo"
          style="background-color:#44546b;"
        >
          <el-submenu
            :index="first.id +''"
            v-for="first in menuList"
            :key="first.id"
          >
            <template slot="title">
              <i
                class="el-icon-location"
                style="color:#fff"
              ></i>
              <span style="color:#fff">{{first.authName}}</span>
            </template>
            <el-menu-item
              :index="'/home/'+second.path"
              v-for="second in first.children"
              :key="second.id"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{second.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="myicon myicon-menu toggle-btn"></span>
          <h2 class="system-title">后台管理系统</h2>
          <a
            href="javascript:;"
            class="welcome"
            style="color:#fff"
          >退出</a>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getRightMenuList } from '@/api/right_api.js'
export default {
  data () {
    return {
      menuList: []
    }
  },
  mounted () {
    getRightMenuList()
      .then((res) => {
        if (res.data.meta.status === 200) {
          this.menuList = res.data.data
        }
      })
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #44546b;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #44546b;
  }
  .logo {
    margin: 3px 0px 3px 6px;
    height: 54px;
    background: url(../assets/logo7.png) no-repeat center;
    background-size: cover;
    vertical-align: middle;
    // background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: #fff;
  }
  // .welcome {
  //   // color: white;
  // }
}
</style>
