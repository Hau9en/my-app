<template>
  <div class="rightList">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格展示区域 -->
    <el-table
      :data="rightList"
      height="700"
      border
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="360"
      >
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="360"
      >
      </el-table-column>
      <el-table-column
        prop="level"
        label="层级"
      >
      </el-table-column>
    </el-table>
    <div
      class="bottom"
      style="margin-top:15px"
    >
      <el-tooltip
        class="item"
        effect="dark"
        content="http://weibo.com/fightforfuture"
        placement="bottom-start"
      >
        <el-button>微博</el-button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="xinsgmonet"
        placement="bottom"
      >
        <el-button>微信</el-button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="xinsgmonet@hotmail.com"
        placement="bottom-end"
      >
        <el-button>Email</el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { getAllRightList } from '@/api/right_api.js'
export default {
  data () {
    return {
      rightList: []
    }
  },
  mounted () {
    getAllRightList('list')
      .then((res) => {
        this.rightList = res.data.data
      })
  }
}
</script>

<style lang="less" scoped>
</style>
