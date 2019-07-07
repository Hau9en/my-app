<template>
  <div class="login">
    <div class="container">
      <img
        src="../assets/avatar.png"
        alt=""
        class="avatar"
      >
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="myicon myicon-user"
            placeholder="请输入用户名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="myicon myicon-key"
            placeholder="请输入密码"
            clearable
            @keyup.enter.native="loginSubmit"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="login-btn"
            @click="loginSubmit"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user_api.js';
export default {
  name: 'app',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码必须在6~16位之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginSubmit () {
      // 再次实现验证用户登录信息
      // 可以调用当前表单的 validate函数，当验证完毕的时候，会调用这个函数中的回调函数
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          console.log(this.loginForm)
          login(this.loginForm)
            .then(res => {
              if (res.data.meta.status === 200) {
                // 获取token
                localStorage.setItem('my_app_token', res.data.data.token)
                // 跳转
                this.$router.push({ name: 'home' })
              } else {
                this.$message({
                  type: 'warning',
                  message: res.data.meta.msg
                })
                console.log(res)
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          console.log('no')
          this.$message({
            showClose: true,
            message: '数据错误，请重新输入',
            type: 'error'
          })
          // 一定要return false 否则不能真正的阻止！
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
