<template>
  <el-row :gutter="12">
    <el-col :span="24">
      <el-card shadow="always">
        <el-page-header @back="goBack" content="添加维修页面"> </el-page-header>
        <el-radio-group v-model="radio">
          <el-radio-button label="站内维修"></el-radio-button>
          <el-radio-button label="站外维修"></el-radio-button>
        </el-radio-group>
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
                  v-for="item in workcaroptions"
                  :key="item.value"
                  :label="item.caid"
                  :value="item.wid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-show="radio == '站外维修'" :span="8">
            <el-form-item label="接车地址">
              <el-input
                style="width: 220px"
                placeholder="请输入地址"
                v-model="zd"
                class="input-with-select"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="chaxdt()"
                ></el-button>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24" v-show="radio == '站外维修'" class="dt">
            <el-row :gutter="12">
              <el-col :span="24">
                <el-card shadow="hover" id="container"></el-card>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="8">
            <el-form-item label="维修班组" prop="tid">
              <el-select v-model="inststion.tid" placeholder="请选择">
                <el-option
                  v-for="item in teamoptions"
                  :key="item.value"
                  :label="item.tname"
                  :value="item.tid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户姓名" prop="cno">
              <el-select @change="car(xm)" v-model="xm" placeholder="请选择">
                <el-option
                  v-for="item in clioptions"
                  :key="item.value"
                  :label="item.cliname"
                  :value="item.cliphone"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户车牌号" prop="cno">
              <el-select v-model="inststion.cno" placeholder="请选择">
                <el-option
                  v-for="item in caroptions"
                  :key="item.value"
                  :label="item.cno"
                  :value="item.cno"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
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
          </el-col>
          <el-col :span="8">
            <el-form-item label="接车时间" prop="jcday">
              <el-date-picker
                v-model="inststion.jcday"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00"
                format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item style="width: 100%" label="维修备注" prop="insevent">
              <el-input
                style="width: 100%"
                type="textarea"
                placeholder="请输入内容"
                v-model="inststion.insevent"
                :rows="2"
                maxlength="100"
                show-word-limit
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item
              v-show="radio == '站外维修'"
              label="里程数:"
              prop="lc"
              style="color: red"
            >
              {{ inststion.lc }} (公里)
            </el-form-item>
          </el-col>

          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="商品编号" prop="shopid"> </el-table-column>
            <el-table-column label="维修项目名" prop="shopname">
            </el-table-column>
            <el-table-column label="维修价格" prop="sellingprice">
            </el-table-column>
            <el-table-column v-if="false" label="qq" prop="image">
            </el-table-column>
            <el-table-column label="使用数量" prop="quantity">
              <template slot-scope="scope">
                <el-input-number
                  v-show="scope.row.quantity!=0"
                  v-model="scope.row.image"
                  :min="1"
                  :max="scope.row.quantity"
                  label="描述文字"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column align="right">
              <template slot="header">
                <el-button type="success" plain @click="dialogVisible1 = true"
                  >添加保养项目</el-button
                >
              </template>
              <template slot-scope="scope">
                <el-button type="danger" @click="byyc(scope.$index,scope.row)" plain>移除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-divider content-position="left">维修材料</el-divider>

          <el-table :data="tableData1" style="width: 100%">
            <el-table-column label="编号" type="index" width="100px">
            </el-table-column>
            <el-table-column label="维修材料名" prop="shopname">
            </el-table-column>
            <el-table-column label="维修材料价格" prop="sellingprice">
            </el-table-column>
            <el-table-column label="使用数量" prop="quantity">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.quantity"
                  :min="1"
                  :max="100"
                  label="描述文字"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column align="right">
              <template slot="header">
                <el-button type="success" plain>添加维修材料</el-button>
              </template>
              <template>
                <el-button type="danger" plain>移除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-form-item>
            <el-button type="primary" @click="submitForm('inststion')"
              >提交</el-button
            >
          </el-form-item>
        </el-form>

        <el-dialog
          title="维修项目"
          :visible.sync="dialogVisible1"
          width="50%"
          :before-close="handleClose"
        >
          <el-table
            :data="bytableData"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :row-key="getRowKey"
            ref="dataTable"
          >
            <el-table-column label="商品编号" prop="shopid"> </el-table-column>
            <el-table-column label="维修项目名" prop="shopname">
            </el-table-column>
            <el-table-column label="维修价格" prop="sellingprice">
            </el-table-column>
            <el-table-column label="数量" prop="quantity">
              <template slot-scope="scope">
                <p v-if="scope.row.quantity == -1">无</p>
                <p v-else>{{ scope.row.quantity }}</p>
              </template>
            </el-table-column>
            <el-table-column
              type="selection"
              :reserve-selection="true"
              width="55"
            >
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            :current-page="currentPage1"
            :page-sizes="[4, 6, 8, 10]"
            :page-size="size1"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total1"
          >
          </el-pagination>
          <span slot="footer" class="dialog-footer">
            <el-badge :value="bynum" class="item">
              <el-button type="primary" plain @click="byqr"
                >确认</el-button
              >
            </el-badge>
          </span>
        </el-dialog>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
//import BMap from "BMap";
const axios = require("axios");
export default {
  data() {
    return {
      zd: "", //重点
      map: "",
      localSearch: "",
      inststion: {
        inid: 0,
        wid: 0,
        tid: 0,
        cno: "",
        izt: 0,
        jcday: "",
        jdate: "",
        yjday: "",
        iszn: 0,
        lc: "",
        insevent: "",
      },
      workcar: { caid: "", czt: "0" }, //救援车辆
      rules: {},
      tableData1: [], //维修材料
      teamoptions: [], //班组
      workcaroptions: [], //救援车辆
      clioptions: [], //用户
      caroptions: [], //客户车辆
      radio: "站外维修",
      xm: "", //客户姓名
      dialogVisible2: false, //维修材料

      //保养
      tableData: [], //保养项目
      dialogVisible1: false, //保养项目
      bytableData: [], //选择保养项目
      currentPage1: 1, //当前页数   保养
      size1: 4, //每页大小          保养
      total1: 0, //总条数           保养
      bynum: 0, //保养  确认数量
      bytable:[],
    };
  },
  mounted() {
    this.bddt(); //地图
    this.chaxunTeam(); //班组
    this.chaxunWorkcar(); //救援车辆
    this.chaxunweix(); //查询维修项目
    this.chaxunbaoyang(4, 1); //查询保养项目
    this.chaxunclient(); //查询用户
  },
  methods: {

     getRowKey (row) {
      return row.shopid;
    },
    //保养移除
    byyc(index,row){
        console.log(index);
        this.tableData.splice(index,1);
        console.log(this.tableData);
        //this.bytable.splice(index,1);
        this.$nextTick(() => {
        this.$refs.dataTable.toggleRowSelection(row,false);
      });
        
    },
    //保养项目确认
    byqr(){
      this.tableData=this.bytable;
      this.dialogVisible1=false;
      console.log(this.tableData);
    },
    // 选中的保养项目
    handleSelectionChange(val) {
      //console.log(val);
      //console.log(val.length);
      this.bynum = val.length;
      this.bytable=val;
    },
    //分页  保养
    handleSizeChange1(val) {
      // console.log(`每页 ${val} 条`);
      this.size1 = val;
      this.chaxunbaoyang(this.size1, this.currentPage1);
    },
    handleCurrentChange1(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage1 = val;
      this.chaxunbaoyang(this.size1, this.currentPage1);
    },
    //关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //查询客户车辆
    car(xm) {
      let that = this;
      axios
        .post("http://127.0.0.1:8080/dzw_sys/api/lt/clicar/" + xm)
        .then(function (res) {
          // console.log(res.data);
          that.caroptions = res.data;
          that.inststion.cno = res.data[0].cno;
        });
    },
    //查询用户
    chaxunclient() {
      let that = this;
      axios
        .post("http://127.0.0.1:8080/dzw_sys/api/lt/cli/1/100/undefined")
        .then(function (res) {
          //console.log(res.data.list);
          that.clioptions = res.data.list;
          that.xm = res.data.list[0].cliphone;
          that.car(that.xm); //查询用户车辆
        });
    },
    //保养项目
    chaxunbaoyang(size1, currentPage1) {
      let that = this;
      axios
        .get(
          "http://127.0.0.1:8080/dzw_sys/api/tzy/shop/queryshopby/null/" +
            currentPage1 +
            "/" +
            size1
        )
        .then(function (res) {
          that.bytableData = res.data.list;
          // console.log(res.data.list);
          that.total1 = res.data.total;
        });
    },
    //查询维修
    chaxunweix() {
      let that = this;
      axios
        .get(
          "http://127.0.0.1:8080/dzw_sys/api/tzy/shop/queryAA/" + 1 + "/" + 100
        )
        .then(function (res) {
          //console.log(res.data.list);
        });
    },
    //查询救援车辆
    chaxunWorkcar() {
      let that = this;
      axios
        .post(
          "http://127.0.0.1:8080/dzw_sys/api/Workcars/All/" + 100 + "/" + 1,
          this.workcar
        )
        .then(function (res) {
          //console.log(res.data.list);
          that.workcaroptions = res.data.list;
          if (res.data.list.length != 0) {
            that.inststion.wid = res.data.list[0].wid;
          }
        });
    },
    //查询班组
    chaxunTeam() {
      const axios = require("axios");
      let that = this;
      axios.get("http://localhost:8080/dzw_sys/api/Teams").then(function (res) {
        //console.log(res.data);
        that.teamoptions = res.data;
        if (res.data.length != 0) {
          that.inststion.tid = res.data[0].tid;
        }
      });
    },
    //返回
    goBack() {},
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
    //点击查询地址
    chaxdt() {
      if (this.zd == "") {
        this.$message({
          message: "请输入接车地址！",
          type: "warning",
        });
      }
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
          that.inststion.lc = (a / 1000).toFixed(1);
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
.dt {
  margin-bottom: 20px;
}
.el-page-header {
  margin-bottom: 20px;
}
.el-radio-group {
  position: absolute;
  right: 2%;
  top: 1%;
}
</style>