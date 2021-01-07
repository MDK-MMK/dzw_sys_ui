<template>
  <el-row :gutter="12">
    <el-col :span="24">
      <el-card shadow="always">
        <el-form
          :model="inststion"
          status-icon
          :rules="rules"
          ref="inststion"
          label-width="98px"
          :inline="true"
          class="demo-form-inline"
        >
        <el-col :span="8">
          <el-form-item label="维修单号" prop="inid">
            <el-input
              disabled
              v-model="inststion.inid"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="救援车辆" prop="wid">
            <el-select v-model="inststion.wid" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="接车地址">
            <el-input
              style="width:220px"
              placeholder="请输入地址"
              v-model="zd"
              class="input-with-select"
            >
              <el-button slot="append" icon="el-icon-search" @click="chaxdt()"
                ></el-button
              >
            </el-input>
          </el-form-item>
        </el-col>
          <el-form-item label="维修班组" prop="tid">
            <el-select v-model="inststion.tid" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预计完工时间" prop="yjday">
            <el-date-picker
              v-model="inststion.yjday"
              type="datetime"
              placeholder="选择日期时间"
              default-time="12:00:00"
              format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="客户车牌号" prop="cno">
            <el-select v-model="inststion.cno" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('inststion')"
              >提交</el-button
            >
            <el-button @click="resetForm('inststion')">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="12">
          <el-col :span="12">
            <el-card shadow="hover" id="container"></el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
//import BMap from "BMap";
export default {
  data() {
    return {
      zd: "", //重点
      map: "",
      localSearch: "",
      inststion: {
        inid: 0,
        tid: 0,
        cno: "",
        izt: 0,
        jcday: "",
        jdate: "",
        yjday: "",
        iszn: 0,
        lc: 0,
        insevent: "",
      },
    };
  },
  mounted() {
    this.bddt();
  },
  methods: {
    //百度地图
    bddt() {
      this.map = new BMap.Map("container");
      this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 13);
      this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      this.map.addControl(new BMap.NavigationControl()); // 添加平移缩放控件
      this.map.addControl(new BMap.ScaleControl()); // 添加比例尺控件
      this.map.addControl(new BMap.OverviewMapControl()); //添加缩略地图控件
      this.localSearch = new BMap.LocalSearch(this.map);
    },
    chaxdt() {
      var keyword = this.zd;
      let that = this;
      this.localSearch.setSearchCompleteCallback(function (searchResult) {
        var poi = searchResult.getPoi(0);
        //console.log(poi.point.lng+"----"+poi.point.lat);
        var myP1 = new BMap.Point(113.115287, 27.909567); //起点
        var myP3 = new BMap.Point(poi.point.lng, poi.point.lat); //终点
        that.map.clearOverlays(); //清除地图上所有的覆盖物
        var driving = new BMap.DrivingRoute(that.map); //创建驾车实例
        driving.search(myP1, myP3);
        driving.setSearchCompleteCallback(function () {
          var pts = driving.getResults().getPlan(0).getRoute(0).getPath(); //通过驾车实例，获得一系列点的数组
          var polyline = new BMap.Polyline(pts);
          that.map.addOverlay(polyline);
          var m1 = new BMap.Marker(myP1);
          var m3 = new BMap.Marker(myP3);
          that.map.addOverlay(m1);
          that.map.addOverlay(m3);
          var lab1 = new BMap.Label("起点", {
            position: myP1,
          });
          var lab3 = new BMap.Label("终点", {
            position: myP3,
          });
          that.map.addOverlay(lab1);
          that.map.addOverlay(lab3);
          var a = BMapLib.GeoUtils.getDistance(myP1, myP3);
          console.log("距离：" + a);
          setTimeout(function () {
            that.map.setViewport([myP1, myP3]); //调整到最佳视野
          }, 1000);
        });
      });
      this.localSearch.search(keyword);
    },
  },
};
</script>
<style scoped>
#container {
  width: 100%;
  height: 300px;
}
/* .el-input{
  width: 130px;
} */
</style>