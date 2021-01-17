<template>
  <div id="mobile">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item style="font-size: 18px; padding: 0 30px">欢迎来到汽修管理系统</el-menu-item>
          <el-menu-item index="0" @click="addTab('/home')"><i class="el-icon-message-solid"></i>首页</el-menu-item>
          <el-menu-item :index="temp.fid+''" @click="addTab('fda'),xiao(temp.fid)" v-for="(temp, i) in dajiedian" :key="i" >
            <i class="el-icon-message-solid"></i>{{ temp.tblfunction.fname }}
          </el-menu-item>
          <el-menu-item index="10" style="float: right">
            <el-row>用户名：{{name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              职位：{{zhiwei}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <el-button type="danger" @click="tui" round>退出系统</el-button>
            </el-row>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="3">
        <el-menu
          style="height:669px"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          v-if="sf">
          <el-menu-item @click="yemian(temp.fcode)" :index="temp.fid+''" v-for="(temp, i) in xiaojd" :key="i" style="font-size: 16px">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">{{ temp.fname }}</span>
          </el-menu-item>
          <el-menu-item> </el-menu-item>
        </el-menu>
      </el-col>

      <el-main>
        <router-view />
      </el-main>
    </el-row>
  </div>
</template>
<script>
const axios = require("axios");
export default {
  data() {
    return {
      editableTabsValue: "1",
      name: "",
      zhiwei: "",
      zid:'',
      dajiedian: [],
      sf:false,
      xiaojd:[],
    };
  },
  //初始加载
  created() {
    //初始查询用户信息和大权限
    let that = this;
    var phone = sessionStorage.getItem("phone");
    var pwd = sessionStorage.getItem("pwd");
    axios
      .get(
        `http://127.0.0.1:8080/dzw_sys/api/lt/login/${phone}/${pwd}`).then(function (res) {
        console.info(res);
        that.name = res.data.ename;
        that.zid=res.data.zid;
        that.zhiwei = res.data.zwei.zname;
        that.dajiedian = res.data.tblperm;
        //console.log(that.dajiedian);
      });
  },
  methods: {
    addTab(url) {
      if(url=="/home"){
        this.sf=false;
        this.$router.push("/home");
      }else{
        this.sf=true;
      }
    },
    yemian(val){
      this.sf=false;
      this.$router.push(val);
    },
    //查询小节点
    xiao(val){
      let that = this;
      axios.post(`http://127.0.0.1:8080/dzw_sys/api/lt/login/xiao/${val}/${this.zid}`).then(function(res) {
          console.info(res.data);
          that.xiaojd=res.data;
      });
    },
    //退出
    tui(){
      let that = this;
      axios.get(`http://127.0.0.1:8080/dzw_sys/api/lt/login/tui`).then(function(res) {
          that.$router.push("/");
      });
    },
  },
};
</script>
<style>
.titles {
  margin-left: 30px;
  font-weight: 700;
  font-size: 23px;
}
* {
  margin: 0px;
  padding: 0px;
}
#app {
  margin-top: 0px;
  
}
 .horizontal-collapse-transition { 
        transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out; 
    } 
</style>