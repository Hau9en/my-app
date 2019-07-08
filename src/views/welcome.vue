<template>
  <div class="welcome">
    <!-- <h3>WELCOME</h3> -->
    <!-- <el-calendar v-model="value">
    </el-calendar> -->
    <div id="bgi"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: new Date()
    }
  }
}
</script>

<style lang="less" scoped>
#bgi {
  width: 1680px;
  height: 780px;
  background: url("../assets/logo2.gif") no-repeat center;
  background-size: fixed;
}
</style>
