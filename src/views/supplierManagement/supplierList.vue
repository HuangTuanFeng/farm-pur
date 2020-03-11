<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="供应商ID" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入供应商ID"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="供应商名称" prop="farmName">
        <el-input
          v-model="queryParams.farmName"
          placeholder="请输入供应商名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="供货种类" prop="categoryId">
        <el-cascader
        size="small"
        v-model="categories"
        :props="{ checkStrictly: true }"
        :options="categoryTreeselects"
        :show-all-levels="false"
        clearable></el-cascader>
      </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="farmList">
      <el-table-column label="供应商ID" align="center" prop="id" width="100"/>
      <el-table-column label="供应商名称" align="center" prop="farmName"/>
      <el-table-column label="供货种类" align="center" prop="categoryNames" width="300"/>
      <el-table-column label="联系人" align="center" prop="contacts"  width="100" />
      <el-table-column label="联系方式" align="center" prop="phone" width="120" />
      <el-table-column label="地址" align="center"  prop="address"/>
      <el-table-column label="所属业务员" align="center" prop="purchaserName" width="100"/>
      <el-table-column label="操作" align="center" width="80" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-search"
            @click="goSupplierInfo(scope.row.id)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
  padding: 0 30px 30px 30px;
  min-height: 100%;
}
/deep/ .el-table {
  td {
    text-align: center;
  }
}
</style>

<script>
import { listFarm } from "@/api/farm";
import { treeListCategory } from "@/api/category";

export default {
  name: "Farm",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 供货商列表数据
      farmList: [],
      // 供货列表
      supplyList: [],
      // 最近采购订单
      latestOrders: [],
      // 供货种类下拉树列表
      categoryTreeselects: [],
      categories: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: undefined,
        farmName: undefined,
        categoryId: undefined
      }
    };
  },
  created() {
    this.getList();
    this.getCategoryList();
  },
  methods: {
    /** 查询供货商列表 */
    getList() {
      this.loading = true;
      listFarm(this.queryParams).then(
        response => {
          this.farmList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    /** 查询供货种类下拉树列表 */
    getCategoryList() {
      treeListCategory().then(
        response => {
          this.categoryTreeselects = response.data.treeSelects;
        }
      );
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.queryParams.categoryId = this.categories[this.categories.length - 1];
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.queryParams = {};
      this.categories = [];
      this.handleQuery();
    },
    /** 跳转到供应商详情页 */
    goSupplierInfo(id) {
      this.$router.push({path:'supplierInfo',query:{id:id}})
    }
  }
};
</script>