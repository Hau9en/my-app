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
      @click="addDialogFormVisible=true"
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
              @click="getAllRight(scope.row)"
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
          <!-- 权限树状图 -->
          <el-dialog
            title="管理权限"
            :visible.sync="dialogFormVisible"
          >
            <el-tree
              ref='mytree'
              :data="rightList"
              show-checkbox
              node-key="id"
              :default-checked-keys="checkedArr"
              :props="defaultProps"
              :default-expand-all='true'
            >
            </el-tree>
            <div
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="grantRightToRole"
              >确 定</el-button>
            </div>
          </el-dialog>

          <!-- 添加角色弹框 -->
          <el-dialog
            title="添加角色"
            :visible.sync="addDialogFormVisible"
          >
            <el-form
              :model="addForm"
              :label-width="'80px'"
              :rules="rules"
              ref="addForm"
            >
              <el-form-item
                label="角色名称"
                prop="roleName"
              >
                <el-input
                  v-model="addForm.roleName"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="角色描述"
                prop="roleDesc"
              >
                <el-input
                  v-model="addForm.roleDesc"
                  auto-complete="off"
                ></el-input>
              </el-form-item>

            </el-form>
            <div
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="addDialogFormVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="addRole"
              >确 定</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  getAllRoleList,
  delRightByRoleId,
  grantRightForRole,
  addrole
} from '@/api/role_api.js'
import { getAllRightList } from '@/api/right_api.js'
export default {
  data () {
    return {
      // 添加角色表单数据
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      // 添加角色弹框
      addDialogFormVisible: false,
      roleId: '',
      rightList: [],
      roleList: [],
      // 这是一个id集合数组
      checkedArr: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      dialogFormVisible: false,
      rules: {
        roleName: [
          { required: true, message: '请填写角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请填写角色描述', trigger: 'blur' }
        ]
      }
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
    // 点击确定，添加角色
    addRole () {
      addrole(this.addForm).then(res => {
        if (res.data.meta.status === 201) {
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
        }
        this.addDialogFormVisible = false
        this.init()
      })
    },
    // 点击确定，分配权限
    grantRightToRole () {
      // this.dialogFormVisible = false
      var arr = this.$refs.mytree.getCheckedNodes()
      // console.log(arr) ==> [{id:109,pid:'107,102},{id:154,pid:'107,102}]
      var temp = arr.map((value, index) => {
        return value.id + ',' + value.pid
      })
      // console.log(temp) ==> ['109,107,102', '154,107,102']
      var str = temp.join(',')
      // ==> '109,107,102,154,107,102'
      var arr2 = str.split(',')
      // ==> [109,107,102, 154,107,102]
      var finalArr = [...new Set(arr2)]
      // ==>  [109,107,102,154]
      grantRightForRole(this.roleId, finalArr.join(',')).then(res => {
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
          this.dialogFormVisible = false
          this.init()
        }
      })
    },
    // 点击获得所有权限的树状图
    getAllRight (row) {
      this.dialogFormVisible = true
      this.roleId = row.id
      getAllRightList('tree').then(res => {
        this.rightList = res.data.data
      })
      // 获取这个角色所有对应的三级权限id
      // 每次遍历前将可能的id权限清空
      this.checkedArr.length = 0
      row.children.forEach((first, index) => {
        if (first.children && first.children.length > 0) {
          // 遍历二级权限
          first.children.forEach(second => {
            if (second.children && second.children.length > 0) {
              second.children.forEach(third => {
                this.checkedArr.push(third.id)
              })
            }
          })
        }
      })
    },
    // 删除权限方法
    delRight (row, rightId) {
      delRightByRoleId(row.id, rightId).then(res => {
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
