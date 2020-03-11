<template>
  <el-dialog
    title="修改密码"
    :visible.sync="centerDialogVisible"
    :show-close="false"
    width="500px"
    center
  >
    <el-form :model="formData" ref="formData" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="20">
          <el-form-item label="旧密码:" prop="oldPassword">
            <el-input type="password" v-model="formData.oldPassword" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="新密码:" prop="newPassword">
            <el-input id="newPassword" type="password" v-model="formData.newPassword" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="确认新密码:" prop="affirmPassword">
            <el-input type="password" v-model="formData.affirmPassword" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClick('close')">取消</el-button>
      <el-button type="primary" @click="handleClick('sure')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { changePassword } from "@/api/user";
export default {
  name: "dialogTip",
  props: {
    centerDialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var confirmPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formData.newPassword) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        oldPassword: "",
        newPassword: "",
        affirmPassword: ""
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        affirmPassword: [
          { required: true, validator: confirmPassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleClick(type = "close") {
      let clickType = {
        close: () => {
          this.$refs.formData.resetFields();
          this.$parent.centerDialogVisible = false;
        },
        sure: () => {
          this.$refs.formData.validate(valid => {
            if (valid) {
              changePassword({
                confirmPassword: this.formData.affirmPassword,
                newPassword: this.formData.newPassword,
                oldPassword: this.formData.oldPassword
              }).then(res => {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.$refs.formData.resetFields();
                this.$parent.centerDialogVisible = false;
              });
            } else {
              return false;
            }
          });
        }
      }[type];
      clickType.call(this);
    }
  }
};
</script>