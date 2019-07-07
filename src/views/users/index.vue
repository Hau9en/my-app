<template>
  <div class="users">

    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索框 -->
    <el-input
      placeholder="请输入内容"
      v-model="query"
      class="input-with-select"
      style="width:400px;margin-bottom:15px"
      @keyup.enter.native="search"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="search"
      ></el-button>
    </el-input>

    <!-- 添加用户 -->
    <el-button
      type="primary"
      plain
      style="margin-left:5px"
      @click="addDialogFormVisible = true"
    >添加用户</el-button>
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogFormVisible"
    >
      <el-form
        :model="addForm"
        :label-width="'80px'"
        :rules="rules"
        ref="addForm"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input
            v-model="addForm.username"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="addForm.password"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input
            v-model="addForm.email"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="电话"
          prop="mobile"
        >
          <el-input
            v-model="addForm.mobile"
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
          @click="addUser"
        >确 定</el-button>
      </div>
    </el-dialog>

    <!-- 用户列表展示 -->
    <el-table
      :data="userList"
      border
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="300"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="300"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="300"
      >
      </el-table-column>
      <el-table-column
        label="修改状态"
        width="200"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeUserState(scope.row.id,scope.row.mg_state)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip
            content="编辑"
            placement="top"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            content="分配"
            placement="top"
          >
            <el-button
              type="primary"
              icon="el-icon-share"
              @click="showGrandDialog(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            content="删除"
            placement="top"
          >
            <el-button
              type="primary"
              icon="el-icon-delete"
              @click="delUserById(scope.row.id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 分配角色 -->
    <el-dialog
      title="分配角色"
      :visible.sync="grantDialogFormVisible"
    >
      <el-form
        :model="grantForm"
        :label-width="'100px'"
      >
        <el-form-item label="用户名">
          <el-input
            v-model="grantForm.username"
            auto-complete="off"
            :disabled="true"
            style="width:100px"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select
            v-model="grantForm.rid"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="grantDialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="grantRoleSubmit"
        >确 定</el-button>
      </div>
    </el-dialog>

    <!-- 用户编辑 -->
    <el-dialog
      title="用户编辑"
      :visible.sync="editDialogFormVisible"
    >
      <el-form
        :model="editForm"
        :label-width="'100px'"
        :rules="rules"
        ref="editForm"
      >
        <el-form-item label="用户名">
          <el-input
            v-model="editForm.username"
            auto-complete="off"
            :disabled="true"
            style="width:100px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input
            v-model="editForm.email"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="手机"
          prop="mobile"
        >
          <el-input
            v-model="editForm.mobile"
            auto-complete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editUserSubmit"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserList,
  addUser,
  delUser,
  updateUserState,
  grantUserRole,
  editUser
} from '@/api/user_api.js'
import { getAllRoleList } from '@/api/role_api.js'
export default {
  data () {
    return {
      // 编辑用户
      editForm: {
        emil: '',
        id: '',
        mobile: '',
        username: ''
      },
      editDialogFormVisible: false,
      value4: '',
      roleList: [],
      grantDialogFormVisible: false,
      // 分配角色
      grantForm: {
        username: '',
        id: '',
        rid: ''
      },
      // 修改状态
      value2: true,
      // 添加用户弹框显示
      addDialogFormVisible: false,
      // 添加用户数据
      addForm: {
        username: '',
        password: '',
        email: 'adsfad@qq.com',
        mobile: '13311233221'
      },
      total: 1,
      // input5: '',
      query: '',
      pagenum: 1,
      pagesize: 3,
      userList: [],
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码必须在6~16位之间', trigger: 'blur' }
        ],
        email: [
          // wuhu0723@126.com
          //   学习正则就是学习它的元字符
          // 1.占位符，说明这个位置需要填入满足要求的字符
          // \w:合法字符： 0-9 a-z A-Z _   \W：非法字符
          // \d:数字：0-9   \D:非数字
          // 2.修饰符：修饰前面的字符所出现的次数，前面的字符默认是指前面的一个字符，除非你使用()包含
          // +：修饰前面的字符出现1次或多次
          // ？：修饰前面的字符出现0次或1次
          // {n,m}:修饰前面的字符最少出现n次，最多出现m次
          // {n}:修饰前面的字符出现n次
          // {n,}修饰前面的字符最少出现n次，最多没有限制
          {
            required: true,
            message: '请填写email',
            trigger: 'blur',
            pattern: /\w+[@]\w+[.]\w{2,3}/
          }
        ],
        mobile: [
          { required: true, message: '请填写手机号', trigger: 'blur' },
          {
            pattern: /^1[345678]\d{9}$/,
            message: '请填写正确的手机号(11位数字)',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {
    // getAllUser 也封装在这里面
    this.init()
    // 获取用户角色列表《select》
    getAllRoleList().then(res => {
      console.log(res)
      if (res.data.meta.status === 200) {
        this.roleList = res.data.data
      }
    })
  },
  methods: {
    // 实现编辑用户弹框
    showEditDialog (row) {
      console.log(row)
      this.editDialogFormVisible = true
      this.editForm.id = row.id
      this.editForm.username = row.username
      this.editForm.email = row.email
      this.editForm.mobile = row.mobile
    },
    // 实现点击提交用户编辑
    editUserSubmit () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          editUser(this.editForm)
            .then(res => {
              if (res.data.meta.status === 200) {
                this.$message({
                  type: 'success',
                  message: res.data.meta.msg
                })
              }
              this.editDialogFormVisible = false
              this.init()
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message({
            type: 'success',
            message: '输入不合法'
          })
        }
      })
    },
    // 实现角色分配
    grantRoleSubmit () {
      if (!this.grantForm.rid) {
        this.$message({
          type: 'warning',
          message: '请选择角色'
        })
        return false
      }
      grantUserRole(this.grantForm.id, this.grantForm.rid).then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
          this.grantDialogFormVisible = false
          this.grantForm.rid = ''
          this.init()
        }
      })
    },
    // 显示角色分配框
    showGrandDialog (row) {
      // console.log(row)
      this.grantDialogFormVisible = true
      this.grantForm.username = row.username
      this.grantForm.id = row.id
      this.grantForm.rid = row.rid
    },
    // 改变用户状态
    changeUserState (id, type) {
      updateUserState(id, type).then(res => {
        // console.log(id, type)
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
        }
      })
    },
    // 删除单个用户
    delUserById (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '删除警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 如果单击了确定就会执行.then
          delUser(id)
            .then(res => {
              if (res.data.meta.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                // 这个用“总数-1”除以“每页展示数”等于“总页数”，然后向下取整“Math.ceil”，得出的数 再与 总页数对比
                // 如果
                this.pagenum =
                  Math.ceil((this.total - 1) / this.pagesize) < this.pagenum
                    ? --this.pagenum
                    : this.pagenum
                this.init()
              }
            })
            .catch(err1 => {
              this.$message({
                type: 'error',
                message: '删除失败!'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 添加用户
    addUser () {
      // 再次实现用户验证
      this.$refs.addForm.validate(valid => {
        if (valid) {
          addUser(this.addForm)
            .then(res => {
              // console.log(res)
              if (res.data.meta.status === 201) {
                this.addDialogFormVisible = false
                this.$refs.addForm.resetFields()
                this.init()
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.meta.msgs
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          return false
        }
      })
    },
    // 搜索封装
    search () {
      this.pagenum = 1
      this.init()
    },
    // 数据初始化
    init () {
      getUserList({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
        .then(res => {
          // console.log(res)
          this.userList = res.data.data.users
          this.total = res.data.data.total
        })
        .catch(err => {
          console.log(err)
        })
    },
    // handleEdit (index, row) {
    //   console.log(index, row)
    // },
    // handleDelete (index, row) {
    //   console.log(index, row)
    // },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      // 重新拉去数据
      this.init()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // val返回的值是改变的值，所以直接改变想要改变的值即可
      this.pagenum = val
      // 重新拉去数据
      this.init()
    }
  }
}
</script>
<style lang="less" scoped>
</style>
