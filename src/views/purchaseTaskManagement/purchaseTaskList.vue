<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="任务编号" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入任务编号"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="全部"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="tableList">
      <el-table-column label="任务编号" prop="id" />
      <el-table-column label="任务生成时间">
        <template slot-scope="scope">
          {{ scope.row.created_at|formatTime}}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-search"
            @click="handleShow(scope.row.id)"
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

<script>
import purchaseTask from "@/api/purchaseTask";


export default {
  name: "PurchaseTask",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 列表数据
      tableList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: undefined,
        status: undefined
      },
      statusList: [
        {
          value: "1",
          label: "待报价"
        },
        {
          value: "2",
          label: "分配中"
        },
        {
          value: "3",
          label: "分配完成"
        }
      ]
    };
  },
  created() {
    this.getList();
  },
  filters: {
    formatStatus(row) {
      if (row == 1) {
        return "待报价";
      } else if (row == 2) {
        return "分配中";
      } else if (row == 3) {
        return "分配完成";
      }
    }
  },
  methods: {
    /** 查询销售订单列表 */
    getList() {
      this.loading = true;
      purchaseTask.list(this.queryParams).then(response => {
        this.tableList = response.rows;
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
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 查询销售订单详情*/
    handleShow(id) {
      this.$router.push({
        path: "/purchaseTaskManagement/purchaseTaskInfo",
        query: { id: id }
      });
    }
  }
};
</script>