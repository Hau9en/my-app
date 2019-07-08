<template>
  <div class="roleList">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button
      type="warning"
      plain
    >添加角色</el-button>
    <el-table
      :data="roleList"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row
            v-for="first in scope.row.children"
            :key="first.id"
            style="margin-bottom:10px"
          >
            <el-col :span="4">
              <el-tag
                closable
                type="danger"
                @close="delRight(scope.row,first.id)"
              >{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row
                v-for="second in first.children"
                :key="second.id"
                style="margin-bottom:6px"
              >
                <el-col :span="4">
                  <el-tag
                    closable
                    size="medium"
                    type="warning"
                    @close="delRight(scope.row,second.id)"
                  >{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    size="small"
                    v-for="third in second.children"
                    :key="third.id"
                    style="margin-right:4px"
                    @close="delRight(scope.row,third.id)"
                  >{{third.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :span="24"
              v-show="scope.row.children.length === 0 "
              style="color:#777777"
            >没有任何权限，请先分配</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        label="序号"
        prop="id"
      >
      </el-table-column>
      <el-table-column
        label="角色名称"
        prop="roleName"
      >
      </el-table-column>
      <el-table-column
        label="描述"
        prop="roleDesc"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip
            content="编辑"
            placement="top"
          >
            <el-button
              type="warning"
              icon="el-icon-edit"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            content="分配"
            placement="top"
          >
            <el-button
              type="info"
              icon="el-icon-share"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            content="删除"
            placement="top"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllRoleList, delRightByRoleId } from '@/api/role_api.js'
import { getAllRightList } from '@/api/right_api.js'
export default {
  data () {
    return {
      roleList: []
    }
  },
  mounted () {
    this.init()
    // getAllRightList('tree')
    //   .then(res => {
    //     console.log(res)
    //     if (res.data.meta.status === 200) {
    //       this.rightList = res.data.data
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  },
  methods: {
    // 删除权限方法
    delRight (row, rightId) {
      delRightByRoleId(row.id, rightId)
        .then((res) => {
          if (res.data.meta.status === 200) {
            console.log(res)
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
            row.children = res.data.data
          }
        })
    },
    // 封装获取角色列表函数
    init () {
      getAllRoleList()
        .then(res => {
          if (res.data.meta.status === 200) {
            console.log(res)
            this.roleList = res.data.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
