<template>
  <div>
    <el-row>
      <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
        车牌号：<el-input
          type="text"
          placeholder="请输入车牌号"
          style="width: 150px"
          v-model="Inststion.cno"
        ></el-input>
      </el-col>
      <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
        开始时间：<el-date-picker
          type="date"
          placeholder="选择进厂开始时间"
          style="width: 175px"
          v-model="Inststion.jdate"
        ></el-date-picker>
      </el-col>
      <el-col :xs="5" :sm="5" :md="5" :lg="6" :xl="5">
        结束时间：<el-date-picker
          type="date"
          placeholder="选择进厂结束时间"
          style="width: 175px"
          v-model="Inststion.jdateEnd"
        ></el-date-picker>
      </el-col>
      <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
        维修状态：<el-select
          style="width: 150px"
          v-model="Inststion.izt"
          placeholder="选择维修状态"
        >
          <el-option label="不限" value="4"> </el-option>
          <el-option label="维修中" value="0"> </el-option>
          <el-option label="接车中" value="1"> </el-option>
          <el-option label="返工" value="2"> </el-option>
          <el-option label="已竣工" value="3"> </el-option>
        </el-select>
      </el-col>
      <el-col :xs="5" :sm="5" :md="5" :lg="2" :xl="5">
        <el-button type="primary" @click="selectAll(size, 1)">搜索</el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-table
      :data="tableData"
      :default-sort="{ prop: 'date', order: 'descending' }"
      :cell-style="{ 'text-align': 'center' }"
      :header-cell-style="{ 'text-align': 'center' }"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="驾驶人">
              <span>{{ props.row.car.driver }}</span>
            </el-form-item>
            <el-form-item label="客户电话">
              <span>{{ props.row.car.cliphone }}</span>
            </el-form-item>
            <el-form-item label="接车时间">
              <span>{{ props.row.jcday }}</span>
            </el-form-item>
            <el-form-item label="预计完工日">
              <span>{{ props.row.yjday }}</span>
            </el-form-item>
            <el-form-item label="是否站内">
              <span v-if="props.row.iszn == 0">否</span>
              <span v-else>是</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="维修编号" prop="inid"> </el-table-column>
      <el-table-column label="客户车牌" prop="car.cno"> </el-table-column>
      <el-table-column label="外派车辆" prop="workcar.caid"> </el-table-column>
      <el-table-column label="班组" prop="team.tname"> </el-table-column>
      <el-table-column label="进厂日期" sortable prop="jdate">
      </el-table-column>
      <el-table-column label="维修状态" prop="izt">
        <template slot-scope="scope">
          <el-button
            type="info"
            v-if="scope.row.izt == 0"
            @click="upshow(scope.row)"
            >维修中</el-button
          >
          <el-button
            type="primary"
            v-if="scope.row.izt == 1"
            @click="updateMaintain(scope.row.inid)"
            >接车中</el-button
          >
          <el-button type="danger" @click="upshow(scope.row)" v-if="scope.row.izt == 2">返工中</el-button>
          <el-button type="success" v-if="scope.row.izt == 3">已竣工</el-button>
        </template>
      </el-table-column>
      <el-table-column label="费用" prop="wxxq">
        <template slot-scope="scope">
          <el-button @click="setshowTable(scope.row.wxxq)">查看费用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 10px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[4, 6, 8, 10]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <el-dialog
      title="维修费用"
      :visible.sync="moneyTable"
      width="50%"
      :before-close="handleClose"
    >
      <el-table
        :data="showTable"
        :cell-style="{ 'text-align': 'center' }"
        :header-cell-style="{ 'text-align': 'center' }"
      >
        <!-- <template slot-scope="scope"> -->
        <el-table-column label="维修商品名称" prop="xqname"></el-table-column>
        <el-table-column label="商品数量" prop="xqsl"></el-table-column>
        <el-table-column label="商品单价" prop="zt"></el-table-column>
        <el-table-column label="商品总价" prop="xmoney"></el-table-column>
        <!-- </template> -->
      </el-table>
      <el-divider></el-divider>
      <el-table
        :data="showTabletwo"
        :cell-style="{ 'text-align': 'center' }"
        :header-cell-style="{ 'text-align': 'center' }"
      >
        <!-- <template slot-scope="scope"> -->
        <el-table-column label="材料名称" prop="xqname"></el-table-column>
        <el-table-column label="材料数量" prop="xqsl"></el-table-column>
        <el-table-column label="材料单价" prop="zt"></el-table-column>
        <el-table-column label="材料总价" prop="xmoney"></el-table-column>
        <!-- </template> -->
      </el-table>
      <el-button style="margin-top: 20px" @click="moneyTable = false"
        >确定</el-button
      >
    </el-dialog>

    <el-dialog
      title="竣工检验"
      :visible.sync="xiuTable"
      width="70%"
      :before-close="handleClose"
    >
      <el-divider></el-divider>

      <el-form
        :model="wei"
        ref="wei"
        style="width: 90%"
        label-width="90px"
        label-position="left"
      >
        <el-form-item label="维修编号" prop="inid">
          <el-input :disabled="true" v-model="wei.inid"></el-input>
        </el-form-item>
        <el-form-item label="车牌号码：" prop="cno">
          <el-input :disabled="true" v-model="wei.cno"></el-input>
        </el-form-item>

        <el-form-item label="是否竣工" prop="esex">
          <template>
            <el-radio-group v-model="wei.izt">
              <el-radio label="3">竣工</el-radio>
              <el-radio label="2">返修</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item v-if="wei.izt == 2" label="备注" prop="fyuany">
          <el-input v-model="wei.fyuany"></el-input>
        </el-form-item>

        <el-form-item v-if="wei.izt == 2" label="班组" prop="tid">
          <el-select v-model="wei.tid" style="width:100%;">
            <el-option
              v-for="(item, i) in teamoptions"
              :key="i"
              :label="item.tname"
              :value="item.tid"
            >
            </el-option>
          </el-select>
        </el-form-item>


        <el-tabs type="border-card" v-if="wei.izt == 2">
          <el-tab-pane label="维修项目">
            <el-table :data="tableDataxm" style="width: 100%">
              <el-table-column label="编号" type="index" width="100px">
              </el-table-column>
              <el-table-column v-if="false" label="商品编号" prop="shopid">
              </el-table-column>
              <el-table-column label="维修项目名" prop="shopname">
              </el-table-column>
              <el-table-column label="维修价格" prop="sellingprice">
              </el-table-column>
              <el-table-column v-if="false" prop="image"> </el-table-column>
              <el-table-column label="耗时" prop="quantity">
                <template slot-scope="scope">
                  <p>{{ scope.row.quantity }}/h</p>
                </template>
              </el-table-column>
              <el-table-column align="right">
                <template slot="header">
                  <el-button
                    type="success"
                    plain
                    @click="dialogVisiblecl = true"
                    >添加保养项目</el-button
                  >
                </template>
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.shopid != null"
                    type="danger"
                    @click="byyc(scope.$index, scope.row)"
                    plain
                    >移除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="维修材料">
            <el-table :data="tableDatacl" style="width: 100%">
              <el-table-column label="编号" type="index" width="100px">
              </el-table-column>
              <el-table-column v-if="false" label="商品编号" prop="shopid">
              </el-table-column>
              <el-table-column label="维修材料名" prop="shopname">
              </el-table-column>
              <el-table-column label="维修材料价格" prop="sellingprice">
              </el-table-column>
              <el-table-column label="使用数量" prop="quantity">
                <template slot-scope="scope">
                  <el-input-number
                    @change="jisuanjaig"
                    v-model="scope.row.image"
                    :min="1"
                    :max="scope.row.quantity"
                    label="描述文字"
                  ></el-input-number>
                </template>
              </el-table-column>
              <el-table-column align="right">
                <template slot="header">
                  <el-button type="success" plain @click="dialogVisible2 = true"
                    >添加维修材料</el-button
                  >
                </template>
                <template slot-scope="scope">
                  <el-button
                    type="danger"
                    plain
                    @click="clyc(scope.row, scope.$index)"
                    >移除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>


        <el-form-item>
          <p style="display: inline-block; margin-top:20px;">
            <el-tag type="danger">返工次数：{{fnum}}</el-tag>
            <el-tag>预计总金额: {{ zongjine }}.0元</el-tag>
          </p>
          <el-button style="" @click="subfrom()">确定</el-button>
          <el-button style="" @click="xiuTable=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 维修项目 -->
    <el-dialog
      title="维修项目"
      :visible.sync="dialogVisiblecl"
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
        <el-table-column label="维修项目名" prop="shopname"> </el-table-column>
        <el-table-column label="维修价格" prop="sellingprice">
        </el-table-column>
        <el-table-column label="耗时" prop="quantity"> </el-table-column>
        <el-table-column type="selection" :reserve-selection="true" width="55">
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
          <el-button type="primary" plain @click="byqr">确认</el-button>
        </el-badge>
      </span>
    </el-dialog>

    <!-- 维修材料 -->
    <el-dialog
      title="维修材料"
      :visible.sync="dialogVisible2"
      width="50%"
      :before-close="handleClose"
    >
      <el-table
        :data="cltableData"
        style="width: 100%"
        @selection-change="handleSelectionChange2"
        :row-key="getRowKey2"
        ref="dataTable2"
      >
        <el-table-column label="商品编号" prop="shopid"> </el-table-column>
        <el-table-column label="维修项目名" prop="shopname"> </el-table-column>
        <el-table-column label="维修价格" prop="sellingprice">
        </el-table-column>
        <el-table-column label="数量" prop="quantity">
          <template slot-scope="scope">
            <p v-if="scope.row.quantity == -1">无</p>
            <p v-else>{{ scope.row.quantity }}</p>
          </template>
        </el-table-column>
        <el-table-column type="selection" :reserve-selection="true" width="55">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange2"
        @current-change="handleCurrentChange2"
        :current-page="currentPage2"
        :page-sizes="[4, 6, 8, 10]"
        :page-size="size2"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total2"
      >
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-badge :value="clnum" class="item">
          <el-button type="primary" plain @click="clqr">确认</el-button>
        </el-badge>
      </span>
    </el-dialog>
  </div>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>


<script>
const axios = require("axios");
export default {
  data() {
    return {
      teamoptions:[],//班组
      //材料
      dialogVisible2: false, //维修材料
      tableDatacl: [], //维修材料
      currentPage2: 1, //当前页数   保养
      size2: 4, //每页大小          保养
      total2: 0, //总条数           保养
      cltableData: [], //材料
      clnum: 0, //材料  确认数量
      cltable: [],

      //保养
      tableDataxm: [], //维修项目
      dialogVisiblecl: false, //保养项目
      bytableData: [], //选择保养项目
      currentPage1: 1, //当前页数   保养
      size1: 4, //每页大小          保养
      total1: 0, //总条数           保养
      bynum: 0, //保养  确认数量
      bytable: [],

      zongjine: 0,
      tableData: [],
      showTable: [],
      showTabletwo: [],
      moneyTable: false,
      xiuTable: false,
      Inststion: {
        //查询条件
        cno: "", //车牌号
        izt: "4", //状态 4：不限
        jdate: null, //进厂开始日期
        jdateEnd: null, //进厂结束日期
      },
      wei: {
        inid: "",
        cno: "",
        izt: "4",
        tid:"",
        fyuany: "",
      },
      size: 6,
      currentPage: 1,
      total: 0, //总条数
      rules: {},
      up: {
        inid: "",
        tid:"",
        izt: "0",
      },
      fnum:"0",//返工次数
    };
  },
  created() {
    this.selectAll(6, 1);
    this.chaxunbaoyang(4, 1); //查询保养项目
    this.chaxuncailiao(1, 4); //查询材料
    this.chaxunTeam()//查询班组
  },
  methods: {
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
    //查询材料
    chaxuncailiao(size2, currentPage2) {
      let that = this;
      axios
        .get(
          "http://127.0.0.1:8080/dzw_sys/api/tzy/shop/queryAA/" +
            size2 +
            "/" +
            currentPage2
        )
        .then(function (res) {
          that.cltableData = res.data.list;
          // console.log(res.data.list);
          that.total2 = res.data.total;
        });
    },

    //材料
    getRowKey2(row) {
      return row.shopid;
    },
    //移除材料
    clyc(row, index) {
      //  console.log(index);
      this.tableDatacl.splice(index, 1);
      // console.log(this.tableData);
      //this.bytable.splice(index,1);
      this.$nextTick(() => {
        this.$refs.dataTable2.toggleRowSelection(row, false);
      });
      this.jisuanjaig();
    },
    handleSelectionChange2(val) {
      this.clnum = val.length;
      this.cltable = val;
    },
    //确认按钮
    clqr() {
      this.tableDatacl = this.cltable;
      this.dialogVisible2 = false;
      this.jisuanjaig();
    },
    //查询材料
    chaxuncailiao(size2, currentPage2) {
      let that = this;
      axios
        .get(
          "http://127.0.0.1:8080/dzw_sys/api/tzy/shop/queryAA/" +
            size2 +
            "/" +
            currentPage2
        )
        .then(function (res) {
          that.cltableData = res.data.list;
          // console.log(res.data.list);
          that.total2 = res.data.total;
        });
    },
    //分页  材料
    handleSizeChange2(val) {
      // console.log(`每页 ${val} 条`);
      this.size2 = val;
      this.chaxuncailiao(this.currentPage2, this.size2);
    },
    handleCurrentChange2(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage2 = val;
      this.chaxuncailiao(this.currentPage2, this.size2);
    },
    //保养
    getRowKey(row) {
      return row.shopid;
    },
    //保养移除
    byyc(index, row) {
      //console.log(index);
      this.tableDataxm.splice(index, 1);
      //console.log(this.tableData);
      //this.bytable.splice(index,1);
      this.$nextTick(() => {
        this.$refs.dataTable.toggleRowSelection(row, false);
      });
      this.jisuanjaig();
    },
    //保养项目确认
    byqr() {
      this.tableDataxm = this.bytable;
      this.dialogVisiblecl = false;
      this.jisuanjaig();
      //console.log(this.dialogVisi   blecl);
    },
    // 选中的保养项目
    handleSelectionChange(val) {
      this.bynum = val.length;
      this.bytable = val;
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
    //计算总金额
    jisuanjaig() {
      var xm = 0;
      this.tableDataxm.forEach((temp) => {
        xm += temp.sellingprice;
        //console.log(temp.sellingprice);
      });
      console.log(xm);
      var cl = 0;
      this.tableDatacl.forEach((temp) => {
        console.log(temp.image);
        if (temp.image == "") {
          cl += temp.sellingprice;
        } else {
          cl += temp.sellingprice * temp.image;
        }
      });
      console.log(cl);
      this.zongjine = cl + xm;
    },
    //分页查询维修单号
    selectAll(size, currentPage) {
      let that = this;
      console.info(this.Inststion);
      axios
        .post("http://localhost:8080/dzw_sys/api/Wei/all/" +size +"/" +currentPage,this.Inststion)
        .then(function (res) {
          console.log(res.data);
          that.tableData = res.data.list;
          that.total = res.data.total;
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //查看费用
    setshowTable(row) {
      console.log(row);
      this.showTable = [];
      this.showTabletwo = [];
      row.forEach((element) => {
        this.showTable.push(element);
        this.showTabletwo.push(element);
      });
      for (let index = 0; index < this.showTable.length; index++) {
        if (this.showTable[index].spid == 1) {
          this.showTable.splice(index, 1);
        }
      }
      for (let index = 0; index < this.showTabletwo.length; index++) {
        if (this.showTabletwo[index].spid == 2) {
          this.showTabletwo.splice(index, 1);
        }
      }
      this.moneyTable = true;
    },
    //分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.size = val;
      this.selectAll(this.size, this.currentPage);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.selectAll(this.size, this.currentPage);
    },
    updateMaintain(inid) {
      let that = this;
      this.up.inid = inid;
      this.up.izt = "0";
      axios.put("http://localhost:8080/dzw_sys/api/Wei/update", this.up)
        .then(function (res) {
          if (res.data == 1) {
            that.$message({
              message: "修改成功",
              type: "success",
            });
            that.selectAll(that.size, 1);
          } else {
            that.$message.error("修改失败!");
          }
        });
    },
    //修改状态：返工
    updatefan() {
      let that = this;
      this.up.inid = this.wei.inid;
      this.up.tid=this.wei.tid;
      this.up.izt = "2";
      axios.put("http://localhost:8080/dzw_sys/api/Wei/updatefan", this.up)
    },
    //提交维修或竣工
    subfrom() {
      let that = this;
      console.log(this.wei);
      if (that.wei.izt == 3) {
        this.up.izt = "3";
        this.up.inid = this.wei.inid;
        axios.put("http://localhost:8080/dzw_sys/api/Wei/updatejun", this.up)
          .then(function (res) {
            if (res.data == 1) {
              that.$message({
                message: "竣工成功",
                type: "success",
              });
              that.selectAll(that.size, 1);
            } else {
              that.$message.error("竣工失败!");
            }
          });
        this.xiuTable = false;
      } else {
        this.fan();
        this.updatefan();
        this.xiuTable = false;
      }
    },
    //新增返工
    fan(){
      let that = this;
      axios.post("http://localhost:8080/dzw_sys/api/Fan/fan", this.wei)
        .then(function (res) {
          if (res.data == 1) {
            that.$message({
              message: "返工成功",
              type: "success",
            });
            that.selectAll(that.size, 1);
          } else {
            that.$message.error("返工失败!");
          }
        });
    },
    //维修竣工页面显示
    upshow(row) {
      this.wei.inid = row.inid;
      this.wei.cno = row.car.cno;
      this.selectfnum();
      this.xiuTable = true;
    },
    //查询返工次数
    selectfnum() {
      let that = this;
      axios
        .post("http://localhost:8080/dzw_sys/api/Fan/all/"+that.wei.inid)
        .then(function (res) {
          that.fnum = res.data;
        });
    },
    //查询班组
    chaxunTeam() {
      const axios = require("axios");
      let that = this;
      axios
        .get("http://localhost:8080/dzw_sys/api/Teams/ByZt")
        .then(function (res) {
          ////console.log(res.data);
          that.teamoptions= res.data;
          if (res.data.length != 0) {
            that.wei.tid= res.data[0].tid;//默认选择第一个班组
          }
        });
    },
  },
};
</script>

