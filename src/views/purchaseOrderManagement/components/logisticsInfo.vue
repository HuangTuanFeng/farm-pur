<template>
  <div>
    <h4>交货&物流信息</h4>
    <template v-if="item.status == 3">
      <table cellspacing="0" cellpadding="0" class="el-table el-table--border">
        <tbody>
          <tr>
            <td>预计提货时间</td>
            <td>
              <div class="input">
                <el-date-picker
                  size="small"
                  v-model="form.deliveryAt"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
              </div>
            </td>
          </tr>
          <tr>
            <td>提货日期</td>
            <td>
              <div class="input">
                <el-date-picker
                  size="small"
                  value-format="yyyy-MM-dd"
                  v-model="form.shipmentAt"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </div>
            </td>
          </tr>
          <tr>
            <td>运输成本</td>
            <td>
              <div class="input">
                <el-input size="small" v-model="form.shipmentCost">
                  <template slot="append">元</template>
                </el-input>
              </div>
            </td>
          </tr>
          <tr>
            <td>车牌信息</td>
            <td>
              <div class="input">
                <el-input size="small" v-model="form.carLicensePlate"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <td>司机姓名</td>
            <td>
              <div class="input">
                <el-input size="small" v-model="form.driverName"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <td>司机联系方式</td>
            <td>
              <div class="input">
                <el-input size="small" v-model="form.driverContact"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <td>驾驶证</td>
            <td>
              <div class="input">
                <el-input size="small" v-model="form.driverLicense"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <td>行驶证</td>
            <td>
              <div class="input">
                <el-input size="small" v-model="form.carLicense"></el-input>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div style="text-align:right;margin-top:20px;">
        <el-button @click="onSubmit" type="primary">提交</el-button>
      </div>
    </template>
    <template v-else>
      <table cellspacing="0" cellpadding="0" class="el-table el-table--border">
        <tbody>
          <tr>
            <td>预计提货时间</td>
            <td>{{ item.deliveryAt|formatTime('yyyy-MM-dd') }}</td>
          </tr>
          <tr>
            <td>提货日期</td>
            <td>{{ item.shipmentAt|formatTime('yyyy-MM-dd') }}</td>
          </tr>
          <tr>
            <td>运输成本</td>
            <td>{{ item.shipmentCost }}元</td>
          </tr>
          <tr>
            <td>车牌信息</td>
            <td>{{ item.carLicensePlate }}</td>
          </tr>
          <tr>
            <td>司机姓名</td>
            <td>{{ item.driverName }}</td>
          </tr>
          <tr>
            <td>司机联系方式</td>
            <td>{{ item.driverContact }}</td>
          </tr>
          <tr>
            <td>驾驶证</td>
            <td>{{ item.driverLicense }}</td>
          </tr>
          <tr>
            <td>行驶证</td>
            <td>{{ item.carLicense }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.input {
  width: 220px;
  margin: 0 auto;
}
</style>
<script>
import purchaseOrder from "@/api/purchaseOrder";

export default {
  props: ["item"],
  data() {
    return {
      form: {}
    };
  },
  methods: {
    // 点击提交
    onSubmit() {
      this.form.id = this.item.id
      this.form.status = 4
      purchaseOrder.update(this.form).then(res => {
        this.$emit("reload")
      })
    }
  }
};
</script>