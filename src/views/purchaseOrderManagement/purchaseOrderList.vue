<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="订单编号" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入订单编号"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="订单状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="订单状态"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="item in orderStatusList"
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

    <el-table v-loading="loading" :data="purchaseOrderList">
      <el-table-column label="订单编号" prop="id" />
      <el-table-column label="订单生成时间" prop="createAt" />
      <el-table-column label="订单总金额" align="center" prop="amount" width="120" />
      <el-table-column label="供应商名称" align="center" prop="farmName" width="180" />
      <el-table-column label="联系人" align="center" prop="contacts" width="150" />
      <el-table-column label="联系方式" align="center" prop="phone" width="150" />
      <el-table-column label="订单状态" align="center" width="100">
        <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="80" class-name="small-padding fixed-width">
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
import purchaseOrder from "@/api/purchaseOrder";

export default {
  name: "PurchaseOrder",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 销售订单列表数据
      purchaseOrderList: [],
      // 是否显示弹出层
      open: false,
      // 订单信息
      orderBaseInfo: {},
      // 订单内容
      orderContent: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: undefined,
        customerName: undefined,
        status: undefined
      },
      orderStatusList: [
        {
          value: "1",
          label: "议价"
        },
        {
          value: "3",
          label: "待提货"
        },
        {
          value: "4",
          label: "待验收"
        },

        {
          value: "6",
          label: "停止供货"
        },
        {
          value: "5",
          label: "已完成"
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
        return "议价";
      } else if (row == 2) {
        return "价格不通过";
      } else if (row == 3) {
        return "待提货";
      } else if (row == 4) {
        return "待验收";
      } else if (row == 5) {
        return "已完成";
      } else if (row == 6) {
        return "停止供货";
      }
    }
  },
  methods: {
    /** 查询销售订单列表 */
    getList() {
      this.loading = true;
      purchaseOrder.list(this.queryParams).then(response => {
        this.purchaseOrderList = response.rows;
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
        path: "/purchaseOrderManagement/purchaseOrderInfo",
        query: { id: id }
      });
    }
  }
};
</script>