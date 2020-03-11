<template>
  <div class="accountSettings">
    <el-row>
      <el-col :span="8">
        <h3>账号设置</h3>
      </el-col>
    </el-row>
    <el-form ref="form" :model="form" :label-position="'left'" label-width="60px">
      <el-form-item label="账号:">{{nickName}}</el-form-item>
      <el-form-item label="密码:">
        <el-button type="warning" @click="handleChange" size="mini">修改密码</el-button>
      </el-form-item>
    </el-form>
    <dialogTip :centerDialogVisible="centerDialogVisible" />
  </div>
</template>

<script>
import dialogTip from "./dialogTip";
import { getCookie } from "@/utils/auth";
export default {
  name: "AccountSettings",
  data() {
    return {
      form: {
        password: null
      },
      nickName: getCookie("nickName"),
      centerDialogVisible: false
    };
  },
  methods: {
    handleChange() {
      this.centerDialogVisible = !this.centerDialogVisible;
    }
  },
  components: {
    dialogTip
  }
};
</script>
