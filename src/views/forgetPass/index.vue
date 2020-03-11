
<template>
  <div class="root">
    <div class="login con-center">
      <div class="con-left"></div>
      <div class="con-right">
        <el-form
          :model="queryParams"
          :rules="resetFormRules"
          label-width="150px"
          ref="resetForm"
          class="input-width"
        >
          <el-form-item label="账号" prop="mobile">
            <el-input v-model="queryParams.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="动态验证码" prop="验证码" class="code">
            <el-input v-model="queryParams.code" placeholder="请输入验证码"></el-input>
            <el-button
              type="button"
              @click="sendcode"
              :disabled="disabled"
              v-if="disabled==false"
            >发送验证码</el-button>
            <el-button
              type="button"
              @click="sendcode"
              :disabled="disabled"
              v-if="disabled==true"
            >{{btntxt}}</el-button>
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input type="password" v-model="queryParams.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="passTrue">
            <el-input type="password" v-model="queryParams.passTrue" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="primary" @click="onSubmit('resetForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>



<script>
import { phoneCode, forgetPassword } from "@/api/user";

export default {
  name: "forgetPass",
  data() {
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入新密码"));
      } else if (value.toString().length < 6 || value.toString().length > 18) {
        callback(new Error("密码长度为6 - 18个字符"));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.queryParams.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      queryParams: {
        mobile: "",
        sendcode: ""
      },
      disabled: false,
      time: 0,
      btntxt: "重新发送",
      //重置密码
      resetForm: {
        pass: "",
        passTrue: ""
      },
      resetFormRules: {
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        passTrue: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //手机验证发送验证码
    sendcode() {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (!this.queryParams.mobile) {
        this.$message({
          message: "手机号不能为空",
          center: true,
          type: "warning"
        });
        return;
      }
      if (!reg.test(this.queryParams.mobile)) {
        this.$message({
          message: "请输入正确的手机号",
          center: true,
          type: "warning"
        });
        return;
      } else {
        let params = { mobile: this.queryParams.mobile };
        phoneCode(params).then(response => {
          this.$message({
            message: "发送成功",
            type: "success",
            center: true
          });
          this.time = 60;
          this.disabled = true;
          this.timer();
        });
      }
    },
    //60S倒计时
    timer() {
      if (this.time > 0) {
        this.time--;
        this.btntxt = "请等待" + this.time + "s";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "获取验证码";
        this.disabled = false;
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          forgetPassword(this.queryParams).then(response => {
            this.$refs[formName].resetFields();
            this.$message({
              message: "提交成功",
              type: "success",
              duration: 1000
            });
            this.$router.back();
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.root {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background: url(../../assets/login_bg.png) no-repeat center;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .con-center {
    width: 1230px;
    height: 764px;
    background: rgba(255, 255, 255, 0.99);
    box-shadow: 10px 50px 50px 0px rgba(204, 209, 215, 0.6);
    border-radius: 6px;
    overflow: hidden;
    .con-left {
      height: 764px;
      width: 50%;
      background: url(../../assets/login_img.png) no-repeat center;
      background-size: cover;
      z-index: 1;
      float: left;
    }
    .con-right {
      height: 764px;
      width: 50%;
      background: #fff;
      float: right;
    }
  }
}
form {
  width: 100%;
  margin: auto;
  margin-top: 200px;
}
.code {
  .el-input {
    width: 55%;
    border-radius: 0px;
    float: left;
    display: inline-block;
  }
  .el-button {
    background-color: #38c49a;
    margin-left: 10px;
    color: rgba(254, 254, 254, 1);
    &:active {
      background-color: rgba(56, 196, 154, 0.6);
    }
  }
}

.input-width {
  width: 70%;
}
.el-button--primary {
  color: rgba(254, 254, 254, 1);
  background-color: #38c49a;
  border: 0;
  width: 100%;
  &:active {
    background-color: rgba(56, 196, 154, 0.6);
  }
}
</style>
