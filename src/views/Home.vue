<template>
  <div id="mobile">
    <el-row class="tac">
      <el-col :span="4">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="4">
            <el-row>
              <span class="titles">汽修管理系统</span>
            </el-row>
          </el-menu-item>
          <el-menu-item index="4">
            <div class="block">
              <el-avatar :size="50"></el-avatar>
              <span>用户名</span>
            </div>
          </el-menu-item>
          <el-menu-item index="6">
            <template slot="title">功能菜单</template>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message-solid"></i>
              <span>首页</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="addTab('/as')"
                >供货单位</el-menu-item
              >
              <el-menu-item index="1-2" @click="addTab('/ass')"
                >维系项目</el-menu-item
              >
            </el-menu-item-group>
          
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-message-solid"></i>
              <span>技工管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="addTab('/stars')"
                >技工星级</el-menu-item
              >
              <el-menu-item index="2-2" @click="addTab(editableTabsValue)"
                >技工租车辆</el-menu-item
              >
              <el-menu-item index="2-3" @click="addTab('/team')"
                >技工组</el-menu-item
              >
            </el-menu-item-group>
           
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-message-solid"></i>
              <span>数据管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" @click="addTab(editableTabsValue)"
                >发动机品牌</el-menu-item
              >
              <el-menu-item index="3-2" @click="addTab(editableTabsValue)"
                >车型档案</el-menu-item
              >
            </el-menu-item-group>
           
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-message-solid"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1" @click="addTab(editableTabsValue)"
                >用户车辆</el-menu-item
              >
              <el-menu-item index="4-2" @click="addTab(editableTabsValue)"
                >会员管理</el-menu-item
              >
              <el-menu-item index="4-3" @click="addTab(editableTabsValue)"
                >用户列表</el-menu-item
              >
            </el-menu-item-group>
          
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-message-solid"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1" @click="addTab(editableTabsValue)"
                >系统日志</el-menu-item
              >
              <el-menu-item index="5-2" @click="addTab(editableTabsValue)"
                >角色附加</el-menu-item
              >
              <el-menu-item index="5-2" @click="addTab(editableTabsValue)"
                >权限附加</el-menu-item
              >
              <el-menu-item index="5-2" @click="addTab(editableTabsValue)"
                >基础数据</el-menu-item
              >
              <el-menu-item index="5-3" @click="addTab(editableTabsValue)"
                >数据统计</el-menu-item
              >
            </el-menu-item-group>
           
          </el-submenu>

          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-message-solid"></i>
              <span>维修管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="6-1" @click="addTab(editableTabsValue)"
                >竣工检验</el-menu-item
              >
              <el-menu-item index="6-2" @click="addTab(editableTabsValue)"
                >完工结算</el-menu-item
              >
              <el-menu-item index="6-3" @click="addTab('WeiXBilling.html')"
                >维修开单</el-menu-item
              >
            </el-menu-item-group>
            
          </el-submenu>

          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-message-solid"></i>
              <span>职工管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="6-1" @click="addTab(editableTabsValue)"
                >职工列表</el-menu-item
              >
              <el-menu-item index="6-2" @click="addTab(editableTabsValue)"
                >离职登记</el-menu-item
              >
              <el-menu-item index="6-3" @click="addTab(editableTabsValue)"
                >通讯目录</el-menu-item
              >
              <el-menu-item index="6-3" @click="addTab(editableTabsValue)"
                >岗位定义</el-menu-item
              >
            </el-menu-item-group>
            
          </el-submenu>

          <el-menu-item index="4"> </el-menu-item>
          <el-menu-item index="4"> </el-menu-item>
          <el-menu-item index="10">
            <el-row>
              <el-button type="danger" round>退出系统</el-button>
            </el-row>
          </el-menu-item>
        </el-menu>
      </el-col>

      <el-main>
        <router-view />
      </el-main>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editableTabsValue: "1",
      editableTabs: [
        {
          title: "主页",
          name: "1",
          content: "欢迎来到汽修管理系统",
          id: "a1",
        },
      ],
      tabIndex: 2,
      dialogVisible: false,
      students: [
        {
          name: "高富帅",
          sex: "男",
        },
        {
          name: "史真香",
          sex: "女",
        },
      ],
    };
  },
  methods: {
    addTab(url) {
      console.log(sessionStorage.getItem("url"));
      if (url != sessionStorage.getItem("url")) {
        sessionStorage.setItem("url", url);
        this.$router.push(url);
      }
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
</style>