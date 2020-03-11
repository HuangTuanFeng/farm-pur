<template>
  <div class="detail-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <h4>基本信息</h4>
        <table cellspacing="0" cellpadding="0" class="el-table el-table--border">
          <tbody>
            <tr>
              <td>订单编号</td>
              <td>{{ item.id }}</td>
            </tr>
            <tr>
              <td>订单状态</td>
              <td>{{ item.statusName }}</td>
            </tr>
            <tr>
              <td>生成时间</td>
              <td>{{ item.createdAt|formatTime }}</td>
            </tr>
            <tr>
              <td>订单总金额</td>
              <td>￥{{ item.amount }}</td>
            </tr>
            <tr>
              <td>所属业务员</td>
              <td>{{ item.saleMan }}</td>
            </tr>
            <tr>
              <td>供应商名称</td>
              <td>{{ item.farmName }}</td>
            </tr>
            <tr>
              <td>联系人</td>
              <td>{{ item.contacts }}</td>
            </tr>
            <tr>
              <td>联系方式</td>
              <td>{{ item.phone }}</td>
            </tr>
            <tr>
              <td>要求交货时间</td>
              <td>{{ item.deliveryAt|formatTime }}</td>
            </tr>
          </tbody>
        </table>
      </el-col>
      <el-col :span="8">
        <logistics-info :item="item" @reload="getInfo" />
      </el-col>
      <el-col :span="8">
        <check-accept :item="item" @reload="getInfo" />
      </el-col>
    </el-row>

    <h4>订单内容</h4>
    <el-table border show-summary :data="item.lines">
      <el-table-column label="序号" type="index" align="center" width="50" />
      <el-table-column label="货物ID" align="center" prop="id" />
      <el-table-column label="货物名称" align="center" prop="productName" />
      <el-table-column label="品类" align="center" prop="categoryName" />
      <el-table-column label="数量" align="center" prop="qty" />
      <el-table-column label="单位" align="center" prop="unit" />
      <el-table-column label="参考单价" align="center" prop="price" />
      <el-table-column label="采购单价" align="center" prop="price" />
      <el-table-column label="采购总价" align="center" prop="amount" />
    </el-table>
    <div v-if="item.status == 1" style="text-align:right;margin-top:10px;margin-right:50px;">
      <el-button type="danger" @click="onAllocation">订单重新分配</el-button>
      <el-button type="success" @click="onPass">通过</el-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
/deep/ .el-table {
  td {
    text-align: center;
  }
}
</style>

<script>
import purchaseOrder from "@/api/purchaseOrder";
import LogisticsInfo from "./components/logisticsInfo";
import CheckAccept from "./components/checkAccept";

export default {
  components: {
    LogisticsInfo,
    CheckAccept
  },
  name: "PurchaseOrderInfo",
  data() {
    return {
      id: undefined,
      item: {}
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getInfo();
  },
  computed: {},
  filters: {
    formatStatus(status) {
      if (status === 0) {
        return "待处理";
      } else if (status === 1) {
        return "退货中";
      } else if (status === 2) {
        return "已完成";
      } else {
        return "已拒绝";
      }
    },
    formatRegion(address) {
      let str = address.province;
      if (address.city != null) {
        str += "  " + address.city;
      }
      str += "  " + address.region;
      return str;
    }
  },
  methods: {
    getImgUrl(data) {
      let params = {
        acceptanceCertificatePic: data,
        orderId: this.id
      };
      addAcceptance(params).then(response => {
        this.$message({
          message: "上传成功！",
          type: "success",
          duration: 1000
        });
      });
    },
    getInfo() {
      purchaseOrder.get(this.id).then(resp => {
        this.item = resp.data;
      });
    },
    // 点击订单重新分配
    onAllocation() {
      this.$confirm("确定是否重新分配订单", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {

      })
    },

    // 点击通过
    onPass() {
      this.$confirm("确定是否通过", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        purchaseOrder.update({id: this.item.id, status: 3}).then(res => {
          this.getInfo()
        })
      })
    }
  }
};
</script>


