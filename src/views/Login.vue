<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 登录表单区 -->
      <el-form
        label-width="0px"
        class="login_form"
      >
        <el-form-item prop="username">
          <h1 class="bt">德召文汽修管理系统</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="phone"
            prefix-icon="el-icon-user"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="userpwd">
          <el-input
            type="password"
            v-model="pwd"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(loginForm)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
const axios = require('axios');
export default {
    data(){
        return{
          phone: "",
          pwd: "",
        };
    },
    methods: {
    //登录
    submitForm() {
      var that = this;
      axios.get(`http://127.0.0.1:8080/dzw_sys/api/lt/login//${this.phone}/${this.pwd}`).then(function (res) {
        console.info(res);
        if(res.data!=""){
           that.$message({
              message: '登陆成功！',
              type: 'success'
            });
            window.sessionStorage.setItem("phone",res.data.ephone);
            window.sessionStorage.setItem("pwd",res.data.epwd);
            that.$router.push("/home");
          }else{
            that.$message.error('登陆失败！手机号或密码错误！');
          }
      });
    },
  },
}
</script>

<style scoped>
.bt {
  position: fixed;
  left: 10%;
  top: 3%;
  letter-spacing: 10px;
}
.login_container {
  /* background-color: #2b4b6b; */
  height: 100%;
}
.login_box {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.avatar_box img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.btns {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0px 20px;
  box-sizing: border-box;
}
</style>