<template>
  <div>
    <h4>验收证明</h4>
    <template v-if="item.status == 4">
      <single-upload v-model="form.acceptancePic" @imgChange="getImgUrl" />
      <div style="text-align:center;margin-top:20px;">
        <el-button type="primary" @click="onSubmit">确定提交</el-button>
      </div>
    </template>
    <template v-else>
      <el-image
        v-if="item.acceptancePic"
        style="width: 100px; height: 100px"
        :src="item.acceptancePic"
        :preview-src-list="[item.acceptancePic]"
      ></el-image>
    </template>
  </div>
</template>

<script>
import SingleUpload from "@/components/Upload/singleUpload";
import purchaseOrder from "@/api/purchaseOrder";

export default {
  props: ["item"],
  components: {
    SingleUpload
  },
  data() {
    return {
      form: {}
    };
  },
  methods: {
    // 上传回调
    getImgUrl(data) {
      this.form.acceptancePic = data;
    },
    // 点击确定提交
    onSubmit() {
      if ( ! this.form.acceptancePic) {
          this.$message({
            message: '请上传验收证明图片',
            type: 'warning',
            duration: 1000
          });
          return
      }
      this.form.id = this.item.id
      this.form.status = 5
      purchaseOrder.update(this.form).then(res => {
        this.$emit('reload')
      })
    }
  }
};
</script>