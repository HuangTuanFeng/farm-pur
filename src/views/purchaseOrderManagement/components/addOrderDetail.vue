<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="货物名称" prop="ipaddr">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入货物名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="品类" prop="userName">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入品类"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <!-- <el-button icon="el-icon-refresh" size="mini" @click="resetForm('queryForm')">重置</el-button> -->
      </el-form-item>
    </el-form>

    <div class="table-container">
      <el-table ref="returnApplyTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="货物名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="品类" align="center">
          <template slot-scope="scope">{{scope.row.categoryId}}</template>
        </el-table-column>
        <el-table-column label="单位" align="center">
          <template slot-scope="scope">{{scope.row.unit}}</template>
        </el-table-column>
      </el-table>
    </div>

    <!-- <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        /> -->
  </div>
</template>

<script>
import { goodsList} from '@/api/common'
const defaultParams={
      pageNum: 1,
      pageSize: 10,
}
export default {
  name: "Online",
  data() {
    return {
      multipleSelection:[],
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 表格数据
      list: [],
      // 查询参数
      queryParams: Object.assign({}, defaultParams),
    }
  },
  created() {
    this.getList();
  },
  methods: {
      handleSelectionChange(val){
        this.multipleSelection = val;
        this.$emit('selectionChange', val);
      },
    getList() {
      this.loading = true;
      goodsList(this.queryParams).then(response => {
        console.log(response)
        this.list = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetForm(formName) {
        this.$refs[formName].resetFields();
        this.queryParams = Object.assign({},defaultParams);
      },
    /** 查看详情操作 */
     handleViewDetail(index,row){
        this.$router.push({path:'/customerManagement/customerInfo',query:{id:row.id}})
      },
  }
};
</script>

