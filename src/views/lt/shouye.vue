<template>
  <el-row :gutter="12">
    <el-col :span="24">
      <el-card shadow="always">
        <el-menu class="el-menu-demo" mode="horizontal" text-color="#303133">
          <el-menu-item style="color: #303133; font-size: 18px"
            >首页</el-menu-item
          >
        </el-menu>
        <br />
        <p style="font-size: 24px">欢迎使用汽修管理系统</p>
        <br />
        <br />
        <el-col :span="6" style="margin-left: 90px">
          <el-card shadow="always">
            <i class="el-icon-s-tools"></i>
            今日在修台次
            <br /><br />{{ zaixiu }}次
          </el-card>
        </el-col>
        <el-col :span="6" style="margin-left: 90px">
          <el-card shadow="always">
            <i class="el-icon-phone"></i>
            今日站内维修台次
            <br /><br />{{ zn }}次
          </el-card>
        </el-col>
        <el-col :span="6" style="margin-left: 90px">
          <el-card shadow="always">
            <i class="el-icon-phone-outline"></i>
            今日站外维修台次
            <br /><br />{{ zw }}次
          </el-card>
        </el-col>
        <br />
        <el-col :span="6" style="margin-left: 90px; margin-top: 50px">
          <el-card shadow="always">
            <i class="el-icon-info"></i>
            今日营业额
            <br /><br />{{ jryye }}元
          </el-card>
        </el-col>
        <el-col :span="6" style="margin-left: 90px; margin-top: 50px">
          <el-card shadow="always">
            <i class="el-icon-circle-plus"></i>
            结算次数
            <br /><br />{{ jscs }}次
          </el-card>
        </el-col>
        <br />
        <br />
        <el-col :span="21" style="margin-left: 90px; margin-top: 50px">
          <el-card shadow="always">
            <div style="margin: 15px 0"></div>

            <div id="myChart" style="width: 100%; height: 400px"></div>
          </el-card>
        </el-col>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
const axios = require("axios");
export default {
  data() {
    return {
      zaixiu: "",
      zn: "",
      zw: "",
      jscs: "",
      jryye: "",
      data:[],
    };
  },
  //初始加载
  created() {
    var that = this;
    that.selshisprice();
    axios.post(`http://127.0.0.1:8080/dzw_sys/api/lt/login/selCount`).then(function (res) {
        console.info(res.data);
        that.jscs = res.data;
    });
    axios.post(`http://127.0.0.1:8080/dzw_sys/api/lt/login/selSum`).then(function (res) {
        console.info(res.data);
        that.jryye = res.data;
    });
    //今日在修台次
    axios
      .post(`http://127.0.0.1:8080/dzw_sys/api/lt/login/sj/-1`)
      .then(function (res) {
        console.info(res.data);
        that.zaixiu = res.data;
      });
    //今日站内修台次
    axios
      .post(`http://127.0.0.1:8080/dzw_sys/api/lt/login/sj/0`)
      .then(function (res) {
        console.info(res.data);
        that.zn = res.data;
      });
    //今日站外台次
    axios
      .post(`http://127.0.0.1:8080/dzw_sys/api/lt/login/sj/1`)
      .then(function (res) {
        console.info(res.data);
        that.zw = res.data;
        that.drawLine();
      });
  },
  methods: {
      selshisprice(val){
          var that=this;
          axios.post(`http://127.0.0.1:8080/dzw_sys/api/lt/login/selshisprice`).then(function (res) {
            console.info(res.data);
            that.data=res.data;
        });
      },
    //营业额月统计报表
    drawLine() {
        var that=this;
      var myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "今日营业额统计报表",
        },
        tooltip: {},

        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["支付宝", "余额", "现金"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: that.data,
            type: "line",
            areaStyle: {},
          },
        ],
      });
    },
  },
};
</script>