<template>
  <div>
    <div>
      <p>采购任务编号：{{ item.id }}</p>
    </div>
    <div>
      <p>生成时间：{{ item.createdAt|formatTime }}</p>
    </div>
    <el-table border :data="item.lines">
      <el-table-column label="序号" align="center" width="50">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column label="货物名称" align="center" prop="productName" />
      <el-table-column label="品类" align="center" prop="categoryName" />
      <el-table-column label="数量" align="center" width="80">
        <template slot-scope="scope">{{ handleQty(scope.row) }}</template>
      </el-table-column>
      <el-table-column label="单位" align="center" prop="unit" width="120" />
      <el-table-column label="参考单价" align="center" width="120" />
      <el-table-column label="采购单价" align="center" width="120">
        <template slot-scope="scope">
          <template v-if="item.status == 1">
            <el-input size="small" v-model="scope.row.price">
              <template slot="append">元</template>
            </el-input>
          </template>
          <template v-else>{{ scope.row.price }}</template>
        </template>
      </el-table-column>
      <el-table-column label="采购总价" align="center" prop="amount" width="120" />
      <el-table-column label="剩余未分配数量" v-if="item.status === 2" align="center" width="120">
        <template slot-scope="scope">{{ leftQty(scope.row) }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <template v-if="item.status == 1">
            <el-button size="small" @click="onAddQty(scope.row)">增购数量</el-button>
          </template>
          <template v-if="item.status == 2">
            <div v-if="scope.row.status == 1">
              <el-button v-if="leftQty(scope.row)" size="small" @click="onHand(scope.row)">手动分配</el-button>
              <el-button size="small" @click="onStop(scope.row)">暂停分配</el-button>
            </div>
            <div v-if="scope.row.status == 0">
              <el-button size="small" @click="onStart(scope.row)">开始分配</el-button>
            </div>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="item.status == 1" style="text-align:right;margin-top:20px;margin-right:100px;">
      <el-button @click="onSubmitQty" type="primary">提交</el-button>
    </div>
    <el-dialog title="增购数量" :visible.sync="openQtyDialog" width="400px">
      <el-form label-width="120px">
        <el-form-item label="货物名称：">{{ line.productName }}</el-form-item>
        <el-form-item label="品类：">{{ line.categoryName }}</el-form-item>
        <el-form-item label="增购数量：">
          <el-input v-model="addQty" style="width:200px;" />
        </el-form-item>
        <el-form-item style="margin-top:20px;">
          <el-button @click="openQtyDialog=false">取消</el-button>
          <el-button type="primary" @click="onSureQty(line)">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="分配订单" :visible.sync="openOrderDialog" width="500px">
      <el-form label-width="120px">
        <el-form-item label="货物名称：">{{ orderForm.productName }}</el-form-item>
        <el-form-item label="品类：">{{ orderForm.categoryName }}</el-form-item>
        <el-form-item label="供应商">
          <el-select size="small" v-model="orderForm.farmId" style="width:250px">
            <el-option
              v-for="supplier in suppliers"
              :key="supplier.id"
              :value="supplier.id"
              :label="supplier.farmName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应数量：">
          <el-input size="small" v-model="orderForm.qty" style="width:200px;">
            <template slot="append">吨</template>
          </el-input>
        </el-form-item>
        <el-form-item label="供应单价：">
          <el-input size="small" v-model="orderForm.price" style="width:200px;">
            <template slot="append">元/吨</template>
          </el-input>
        </el-form-item>
        <el-form-item label="总价：">{{ orderAmount(orderForm) }}</el-form-item>
        <el-form-item label="可提货时间">
          <el-date-picker
            size="small"
            v-model="orderForm.deliveryAt"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item style="margin-top:20px;">
          <el-button @click="openOrderDialog=false">取消</el-button>
          <el-button type="primary" @click="onSubmitOrder">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
/deep/ .el-form-item {
  margin-bottom: 10px;
}
</style>
<script>
import purchaseTask from "@/api/purchaseTask";
import supplier from "@/api/supplier";
import purchaseOrder from "@/api/purchaseOrder";

export default {
  name: "PurchaseTaskInfo",
  data() {
    return {
      id: undefined,
      item: {},
      openQtyDialog: false,
      line: {},
      addQty: undefined,
      openOrderDialog: false,
      orderForm: {},
      suppliers: []
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getInfo();
    this.getSuppliers();
  },
  computed: {
    // 计算手动分配订单的总价
    orderAmount() {
      return function(order) {
        var amount = order.price * order.qty;
        return isNaN(amount) ? 0 : amount;
      };
    },
    // 计算剩余未分配数量
    leftQty() {
      return function(line) {
        return line.qty - line.allocatedQty;
      };
    },
    handleQty() {
      return function(line) {
        var str = line.qty;
        if (line.addQty) {
          str += "+" + line.addQty;
        }
        return str;
      };
    }
  },
  methods: {
    getInfo() {
      purchaseTask.get(this.id).then(resp => {
        this.item = resp.data;
      });
    },
    // 获取供应商列表
    getSuppliers() {
      supplier.list({ pageSzie: 100 }).then(resp => {
        this.suppliers = resp.rows;
      });
    },
    // 点击增加数量
    onAddQty(line) {
      this.addQty = line.addQty;
      this.line = line;
      this.openQtyDialog = true;
    },
    // 点吉确定增购数量
    onSureQty(line) {
      this.$set(line, "addQty", this.addQty);
      this.openQtyDialog = false;
    },
    // 点击提交数量
    onSubmitQty() {
      this.$confirm("确定是否提交", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        var lines = JSON.parse(JSON.stringify(this.item.lines));

        lines = lines.map(line => {
          if (line.addQty) {
            line.qty = line.qty + parseInt(line.addQty);
          }
          return line;
        });
        purchaseTask.updateLines(lines).then(res => {
          this.getInfo();
        });
      });
    },
    // 点击开始分配
    onStart(line) {
      purchaseTask.startPush(line).then(res=> {
        line.status = 1
      })      
    },
    // 点击手动分配
    onHand(line) {
      this.orderForm.productName = line.productName;
      this.orderForm.categoryName = line.categoryName;
      this.orderForm.productId = line.productId;
      this.orderForm.taskId = this.item.id
      this.openOrderDialog = true;
    },
    // 点击暂停分配
    onStop(line) {
      this.$confirm(
        "暂停分配后可能会影响销售订单的进行，是否需要暂停分配？",
        "提示",
        {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning"
        }
      ).then(() => {
          purchaseTask.stopPush(line).then(res=> {
            line.status = 0
          })
      });
    },
    // 点击提交订单
    onSubmitOrder() {
      purchaseOrder.create(this.orderForm).then(res => {
        this.openOrderDialog = false
        this.getInfo()
      });
    }
  }
};
</script>