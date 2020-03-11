<template>
  <div class="root">
    <div class="con-center">
      <div class="con-left"></div>
      <div class="con-right">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
        >
          <div class="title-container">
            <div class="title">登录</div>
            <span class="sub-title">欢迎登入供应链农场！</span>
          </div>

          <el-form-item prop="mobile" label="账号:">
            <el-input
              ref="mobile"
              v-model="loginForm.mobile"
              placeholder="请输入账号"
              name="请输入账号"
              type="text"
              tabindex="1"
            />
          </el-form-item>

          <el-form-item prop="password" label="密码:">
            <el-input
              key="password"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入密码"
              name="请输入密码"
              tabindex="2"
            />
            <!--<span class="show-pwd"
                      @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>-->
          </el-form-item>

          <el-form-item prop="code" label="动态验证码:" class="code">
            <el-input
              ref="password"
              v-model="loginForm.code"
              name="code"
              tabindex="3"
              style="width:100%"
            />
            <el-button @click.native.prevent="handleVerificationCode" style="height:40px;">获取验证码</el-button>
          </el-form-item>
          <div class="forget" @click="goPage('/forgetPass')">忘记密码?</div>

          <el-button
            :loading="loading"
            style="width:100%;margin-top:30px;"
            @click.native.prevent="handleLogin"
          >登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { phoneCode } from "@/api/user";
import { getCookie, setCookie } from "@/utils/auth";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入你的账号"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        mobile: "",
        password: "",
        code: ""
      },
      loginRules: {
        mobile: [{ required: true, trigger: "blur", message: "账号不能为空" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
        code: [{ required: true, trigger: "blur", message: "请输入验证码" }]
      },
      codeUrl: "",
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    goPage(url) {
      this.$router.push({ path: url });
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleVerificationCode() {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (!this.loginForm.mobile) {
        this.$message({
          message: "手机号不能为空",
          center: true,
          type: "warning"
        });
        return;
      }
      if (!reg.test(this.loginForm.mobile)) {
        this.$message({
          message: "请输入正确的手机号",
          center: true,
          type: "warning"
        });
        return;
      }
      let params = { mobile: this.loginForm.mobile };
      phoneCode(params)
        .then(res => {
          /*this.codeUrl = 'data:image/png;base64,' + res.bytes*/
          console.log(res);
        })
        .catch(err => {
          console.log(err, 5555);
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
  width: 382px;
  margin-top: 75px;
  margin-left: 72px;
}
.code {
  position: relative;
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
    position: absolute;
    right: 0;
    top: 40px;
    &:active {
      background-color: rgba(56, 196, 154, 0.6);
    }
  }
}

.input-width {
  width: 70%;
}
.el-button--primary {
  height: 40px;
  color: rgba(254, 254, 254, 1);
  background-color: #38c49a;
  border: 0;
  &:active {
    background-color: rgba(56, 196, 154, 0.6);
  }
}

.el-form-item__content {
  margin-left: 0;
}
.title-container {
  .title {
    font-size: 36px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 10px;
  }
  .sub-title {
    font-size: 16px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    display: block;
    margin-bottom: 40px;
  }
}

.el-form-item__label {
  text-align: left !important;
  display: flex;
  justify-content: flex-start;
  font-size: 12px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.el-form-item {
}
.forget {
  font-size: 14px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  text-align: right;
  cursor: pointer;
}

.el-button--default {
  height: 48px;
  color: rgba(254, 254, 254, 1);
  background-color: #38c49a;
  border: 0;
  &:active {
    background-color: rgba(56, 196, 154, 0.6);
  }
}
.el-input__inner {
  height: 58px;
}
</style>
