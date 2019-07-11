<template>
  <div class="list">
    <!-- 搜索栏 -->
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
    <el-button
      type="primary"
      style="margin-left:5px"
      @click="$router.push({name: 'Add'})"
    >添加商品</el-button>
    <!-- 商品列表展示 -->
    <el-table
      :data="goodsList"
      height="700"
      border
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="380"
      >
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="220"
      >
      </el-table-column>
      <el-table-column
        prop="goods_state"
        label="商品状态"
        width="220"
      >
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量"
        width="220"
      >
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="创建时间"
        width="250"
      >
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
  </div>
</template>

<script>
// import { getAllGoods } from '@/api/goods_list.vue'
export default {
  data () {
    return {
      goodsList: [],
      query: ''
    }
  }
}
</script>

<style lang="less">
</style>
