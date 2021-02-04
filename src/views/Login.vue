<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span><i>Ego</i> 欢迎登陆</span>
      </div>

      <el-tabs
        v-model="currentIndex"
        @tab-click="handleClick"
        stretch
        type="border-card"
      >
        <el-tab-pane label="登录" name="login">
          <el-form
            :model="loginForm"
            :rules="rules"
            status-icon
            ref="loginForm"
          >
            <el-form-item label="用户名" label-width="80px" prop="username">
              <el-input type="text" v-model="loginForm.username" />
            </el-form-item>
            <el-form-item label="密码" label-width="80px" prop="password">
              <el-input type="password" v-model="loginForm.password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')"
                >登陆</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form
            :model="registerForm"
            :rules="rules"
            status-icon
            ref="registerForm"
          >
            <el-form-item label="用户名" label-width="80px" prop="username">
              <el-input type="text" v-model="registerForm.username" />
            </el-form-item>
            <el-form-item label="邮箱" label-width="80px" prop="email">
              <el-input type="text" v-model="registerForm.email" />
            </el-form-item>
            <el-form-item label="密码" label-width="80px" prop="password">
              <el-input type="password" v-model="registerForm.password" />
            </el-form-item>
            <el-form-item
              label="确认密码"
              label-width="80px"
              prop="configurePassword"
            >
              <el-input
                type="password"
                v-model="registerForm.configurePassword"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('registerForm')"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import api from "../api";
import { mapMutations } from "vuex";
export default {
  data() {
    //验证规则
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (value.length < 4) {
        callback(new Error("长度不够"));
      } else {
        callback();
      }
    };
    var validatePassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (value.length < 5) {
        callback(new Error("邮箱格式有误"));
      } else {
        callback();
      }
    };
    var validateConfigurePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      currentIndex: "login",
      loginForm: {
        username: "",
        password: "",
      },
      registerForm: {
        username: "",
        password: "",
        email: "",
        configurePassword: "",
      },
      //tab 的切换判断是否登录或者注册
      activeTab: "login",
      //验证条件
      rules: {
        username: [
          {
            validator: validateUserName,
            trigger: "blur",
          },
        ],
        password: [
          {
            validator: validatePassWord,
            trigger: "blur",
          },
        ],
        configurePassword: [
          {
            validator: validateConfigurePassword,
            trigger: "blur",
          },
        ],
        email: [
          {
            validator: validateEmail,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapMutations("login", ["setUser"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.activeTab === "login") {
            //登录
            api.login(this.loginForm).then((res) => {
              if (res.data.status === 200) {
                this.setUser(res.data);
                localStorage.setItem("ego", JSON.stringify(res.data));
                 this.$router.push("/");
              } else {
                this.$message({
                  showClose: true,
                  message: "看客登陆失败哦!",
                  type: "error",
                });
              }
            });
          } else if (this.activeTab === "register") {
            api.register(this.registerForm).then((res) => {
              if (res.data.status === 200) {
              
                this.$message({
                  showClose: true,
                  message: "恭喜看客! 请前往登陆",
                  type: "success",
                });
              } else {
                
               this.$message({
                  showClose: true,
                  message: "很遗憾！请看官重新注册",
                  type: "error",
                });
              }
            });
          }
        } else {
          return;
        }
      });
    },
    handleClick(tab) {
      this.activeTab = tab.name;
      console.log(tab.name);
    },
  },
};
</script>

<style lang='less' scoped>
.login {
  .box-card {
    width: 500px;
    margin: 100px auto;
    div {
      i {
        font-weight: 700;
      }
    }
  }
}
</style>