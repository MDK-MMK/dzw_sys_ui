<template>
  <el-row style="height: 668px" :gutter="12">
    <el-col :span="24">
      <el-card shadow="always">
        <el-divider content-position="left">
          <el-radio-group v-model="radio" @change="zw">
            <el-radio-button label="站内维修"></el-radio-button>
            <el-radio-button label="站外维修"></el-radio-button>
          </el-radio-group>
        </el-divider>

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
          <el-col v-show="radio == '站外维修'" :span="8">
            <el-form-item label="救援车辆" prop="wid">
              <el-select
                @change="chaxunjiuyxg"
                v-model="inststion.wid"
                placeholder="请选择"
              >
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
            <el-form-item label="接车地址" prop="zd">
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
              <el-select
                @change="wxbanz"
                v-model="inststion.tid"
                placeholder="请选择"
              >
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
          <el-col v-show="radio == '站外维修'" :span="8">
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
                <el-button type="success" plain @click="dialogVisible1 = true"
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

          <el-divider content-position="left">维修材料</el-divider>

          <el-table :data="tableData1" style="width: 100%">
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
          <el-col :span="24">
            <el-form-item style="margin-top: 2%; margin-right: -70%">
              <p style="display: inline-block; color: red">
                班组时工费用:{{ banzufy }}---预计总金额: {{ zongjine }}.0元
              </p>
              <el-button
                :disabled="tijiao"
                style="margin-left: 60px"
                type="danger"
                @click="submitForm('inststion')"
                >提交</el-button
              >
            </el-form-item>
          </el-col>
        </el-form>

        <!-- 维修项目 -->
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
            <el-table-column label="耗时" prop="quantity"> </el-table-column>
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
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
//import BMap from "BMap";
const axios = require("axios");
export default {
  data() {
    //验证接车地址
    var validateZd = (rule, value, callback) => {
      if (this.zd === "" && this.radio === "站外维修") {
        callback(new Error("请输入接车地址!"));
      } else {
        callback();
      }
    };
    //验证预计完工时间
    var validateYjday = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择预计完工时间!"));
      } else {
        callback();
      }
    };
    //接车时间
    var validateJcday = (rule, value, callback) => {
      if (value === "" && this.radio == "站外维修") {
        callback(new Error("请选择接车时间!"));
      } else {
        callback();
      }
    };
    return {
      zd: "", //重点
      map: "",
      localSearch: "",
      inststion: {
        inid: 0, //维修编号
        wid: 0, //救援车辆
        tid: 0, //班组id
        cno: "", //客户车牌号
        izt: 0, //维修状态
        jcday: "", //接车时间
        jdate: "", //进厂日期
        yjday: "", //预计完工时间
        iszn: 0, //是否站内
        lc: "", //里程数
        insevent: "", //维修备注
      },
      workcar: { caid: "", czt: "0" }, //救援车辆
      rules: {
        zd: [{ validator: validateZd, trigger: "blur" }],
        yjday: [{ validator: validateYjday, trigger: "blur" }],
        jcday: [{ validator: validateJcday, trigger: "blur" }],
      },
      teamoptions: [], //班组
      workcaroptions: [], //救援车辆
      clioptions: [], //用户
      caroptions: [], //客户车辆
      radio: "站外维修",
      xm: "", //客户姓名
      zongjine: 0,
      tijiao: false,
      banzufy: 0,

      //材料
      dialogVisible2: false, //维修材料
      tableData1: [], //维修材料
      currentPage2: 1, //当前页数   保养
      size2: 4, //每页大小          保养
      total2: 0, //总条数           保养
      cltableData: [], //材料
      clnum: 0, //材料  确认数量
      cltable: [],

      //保养
      tableData: [], //保养项目
      dialogVisible1: false, //保养项目
      bytableData: [], //选择保养项目
      currentPage1: 1, //当前页数   保养
      size1: 4, //每页大小          保养
      total1: 0, //总条数           保养
      bynum: 0, //保养  确认数量
      bytable: [],
    };
  },
  mounted() {
    this.bddt(); //地图
    this.chaxunTeam(); //班组
    this.chaxunWorkcar(); //救援车辆
    this.chaxunweix(); //查询维修项目
    this.chaxunbaoyang(4, 1); //查询保养项目
    this.chaxunclient(); //查询用户
    this.chaxuncailiao(1, 4); //查询材料
    this.chaxunID(); //查询id
  },
  methods: {
    //提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // if (this.tableData.length == 2) {
          //   this.$message({
          //     message: "请选择维修项目！",
          //     type: "warning",
          //   });
          //   return;
          // }
          if (this.tableData1.length == 0) {
            this.$message({
              message: "请选择维修材料！",
              type: "warning",
            });
            return;
          }
          if (this.inststion.lc == 0 && this.radio == "站外维修") {
            this.$message({
              message: "请确认接车地址！",
              type: "warning",
            });
            return;
          }
           this.$set(this.tableData, 1, {
                shopname: "班组费",
                sellingprice: this.banzufy,
                quantity: "1",
              });
          let that = this;
          var a = [];
          this.tableData.forEach((temp) => {
            a.push({
              xqid: 0,
              inid: this.inststion.inid,
              xqname: temp.shopname,
              xqsl: temp.quantity,
              spid: 1,
              zt: temp.sellingprice,
              xmoney: temp.sellingprice * temp.quantity,
            });
          });
          var b = [];
          this.tableData1.forEach((temp) => {
            a.push({
              xqid: 0,
              inid: this.inststion.inid,
              xqname: temp.shopname,
              xqsl: temp.image,
              spid: 2,
              zt: temp.sellingprice,
              xmoney: temp.sellingprice * temp.image,
            });
            b.push({
              shopid: temp.shopid,
              quantity: temp.quantity - temp.image,
            });
          });
          if (this.radio == "站外维修") {
            this.inststion.inid = parseInt(this.inststion.inid);
            this.inststion.izt = 1;
            //console.log(b);
            //console.log(a);
            axios
              .post(
                "http://127.0.0.1:8080/dzw_sys/api/Wei/insert",
                this.inststion
              )
              .then((res) => {
                ////console.log(res.data);
                axios
                  .post("http://127.0.0.1:8080/dzw_sys/api/Wxxqs/insert", a)
                  .then((resp) => {
                    ////console.log(resp.data);
                    if (resp.data != 0 && res.data != 0) {
                      that.$message({
                        message: "添加成功",
                        type: "success",
                      });
                      that.$router.push("/maintain");
                    } else {
                      that.$message.error("添加失败！");
                    }
                  });
                axios.post(
                  "http://127.0.0.1:8080/dzw_sys/api/tzy/shop/update",
                  b
                );
              });
          } else {
            //站内

            this.inststion.inid = parseInt(this.inststion.inid);
            this.inststion.izt = 0;
            this.inststion.jdate = new Date();

            //console.log(b);
            //console.log(a);
            axios
              .post(
                "http://127.0.0.1:8080/dzw_sys/api/Wei/insert",
                this.inststion
              )
              .then((res) => {
                ////console.log(res.data);
                axios
                  .post("http://127.0.0.1:8080/dzw_sys/api/Wxxqs/insert", a)
                  .then((resp) => {
                    ////console.log(resp.data);
                    if (resp.data != 0 && res.data != 0) {
                      that.$message({
                        message: "添加成功",
                        type: "success",
                      });
                      that.$router.push("/maintain");
                    } else {
                      that.$message.error("添加失败！");
                    }
                  });
                axios.post(
                  "http://127.0.0.1:8080/dzw_sys/api/tzy/shop/update",
                  b
                );
              });
          }
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
    },
    //计算总金额
    jisuanjaig() {
      if (this.radio == "站外维修") {
        if (this.tableData.length > 2) {
          this.banzufy =
            this.tableData[1].sellingprice * (this.tableData.length - 2);
        } else {
          this.banzufy = this.tableData[1].sellingprice;
        }
      } else {
        if (this.tableData.length > 1) {
          this.banzufy =
            this.tableData[0].sellingprice * (this.tableData.length - 1);
        } else {
          this.banzufy = this.tableData[0].sellingprice;
        }
      }
      var xm = 0;
      this.tableData.forEach((temp) => {
        xm += temp.sellingprice;
        ////console.log(temp.sellingprice);
      });
      ////console.log(xm);
      var cl = 0;
      this.tableData1.forEach((temp) => {
        cl += temp.sellingprice * temp.image;
      });
      ////console.log(cl);
      this.zongjine = cl + xm;
    },
    //切换救援车辆
    chaxunjiuyxg() {
      this.workcaroptions.forEach((temp) => {
        if (temp.wid == this.inststion.wid) {
          ////console.log(temp);
          var a = 0;
          if (this.inststion.lc != 0) {
            if (this.inststion.lc > 10) {
              a = (this.inststion.lc - 1) * temp.ccj + temp.qbj;
            } else {
              a = (this.inststion.lc - 1) * (temp.ccj / 2) + temp.qbj;
            }
          } else {
            a = temp.qbj;
          }
          this.$set(this.tableData, 0, {
            shopname: "救援费",
            sellingprice: a,
            quantity: "1",
          });
          this.jisuanjaig();
        }
      });
    },
    //查询救援费用
    chaxunjiuy() {
      this.workcaroptions.forEach((temp) => {
        if (temp.wid == this.inststion.wid) {
          ////console.log(temp);
          var a = 0;
          if (this.inststion.lc != 0) {
            if (this.inststion.lc > 10) {
              a = (this.inststion.lc - 1) * temp.ccj + temp.qbj;
            } else {
              a = (this.inststion.lc - 1) * (temp.ccj / 2) + temp.qbj;
            }
          } else {
            a = temp.qbj;
          }
          this.tableData.splice(0, 0, {
            shopname: "救援费",
            sellingprice: a,
            quantity: "1",
          });
        }
      });
    },
    //切换班组
    wxbanz() {
      let that = this;
      this.teamoptions.forEach((temp) => {
        if (this.inststion.tid == temp.tid) {
          axios
            .get("http://127.0.0.1:8080/dzw_sys/api/Starss/ByID/" + temp.sid)
            .then((res) => {
              //console.log(res.data);
              for (var i = 0; i < that.tableData.length; i++) {
                if (that.tableData[i].shopname == "班组费") {
                  that.$set(that.tableData, i, {
                    shopname: "班组费",
                    sellingprice: res.data.xmoney,
                    quantity: "1",
                  });
                  that.jisuanjaig();
                }
              }
            });
        }
      });
      this.jisuanjaig();
    },
    //切换站内站外
    zw() {
      if (this.radio == "站外维修") {
        this.chaxunjiuy();
      } else {
        this.tableData.splice(0, 1);
      }
      this.jisuanjaig();
    },
    //判断站内站外价格
    jg() {
      let that = this;
      this.teamoptions.forEach((temp) => {
        if (this.inststion.tid == temp.tid) {
          axios
            .get("http://127.0.0.1:8080/dzw_sys/api/Starss/ByID/" + temp.sid)
            .then((res) => {
              ////console.log(res.data);
              that.tableData.splice(0, 0, {
                shopname: "班组费",
                sellingprice: res.data.xmoney,
                quantity: "1",
              });
              if (that.radio == "站外维修") {
                that.zw();
              }

             // that.jisuanjaig();
            });
        }
      });
    },
    //材料
    getRowKey2(row) {
      return row.shopid;
    },
    //移除材料
    clyc(row, index) {
      //  //console.log(index);
      this.tableData1.splice(index, 1);
      // //console.log(this.tableData);
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
      this.tableData1 = this.cltable;
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
          // //console.log(res.data.list);
          that.total2 = res.data.total;
        });
    },
    //分页  材料
    handleSizeChange2(val) {
      // //console.log(`每页 ${val} 条`);
      this.size2 = val;
      this.chaxuncailiao(this.currentPage2, this.size2);
    },
    handleCurrentChange2(val) {
      // //console.log(`当前页: ${val}`);
      this.currentPage2 = val;
      this.chaxuncailiao(this.currentPage2, this.size2);
    },
    //保养
    getRowKey(row) {
      return row.shopid;
    },
    //保养移除
    byyc(index, row) {
      ////console.log(index);
      this.tableData.splice(index, 1);
      ////console.log(this.tableData);
      //this.bytable.splice(index,1);
      this.$nextTick(() => {
        this.$refs.dataTable.toggleRowSelection(row, false);
      });
      this.jisuanjaig();
    },
    //保养项目确认
    byqr() {
      this.tableData = this.bytable;
      this.jg();
      this.dialogVisible1 = false;
      this.jisuanjaig();
    },
    // 选中的保养项目
    handleSelectionChange(val) {
      this.bynum = val.length;
      this.bytable = val;
    },
    //分页  保养
    handleSizeChange1(val) {
      // //console.log(`每页 ${val} 条`);
      this.size1 = val;
      this.chaxunbaoyang(this.size1, this.currentPage1);
    },
    handleCurrentChange1(val) {
      // //console.log(`当前页: ${val}`);
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
          // //console.log(res.data);
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
          ////console.log(res.data.list);
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
          // //console.log(res.data.list);
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
          ////console.log(res.data.list);
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
          ////console.log(res.data.list);
          that.workcaroptions = res.data.list;
          if (res.data.list.length != 0) {
            that.inststion.wid = res.data.list[0].wid;
            //that.chaxunjiuy();
          } else {
            that.tijiao = true;
            that.$message.error("已没有空闲的救援车辆，不可开单！");
          }
        });
    },
    //查询班组
    chaxunTeam() {
      const axios = require("axios");
      let that = this;
      axios
        .get("http://localhost:8080/dzw_sys/api/Teams/ByZt")
        .then(function (res) {
          ////console.log(res.data);
          that.teamoptions = res.data;
          if (res.data.length != 0) {
            that.inststion.tid = res.data[0].tid; //默认选择第一个班组
            that.jg();
          } else {
            that.tijiao = true;
            that.$message.error("已没有空闲的班组，不可开单！");
          }
        });
    },
    //生成ID
    chaxunID() {
      let that = this;
      axios.get("http://127.0.0.1:8080/dzw_sys/api/Wei/ID").then((res) => {
        that.inststion.inid = res.data;
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
        return;
      }
      var keyword = this.zd;
      let that = this;
      this.localSearch.setSearchCompleteCallback(function (searchResult) {
        var poi = searchResult.getPoi(0);
        ////console.log(poi.point.lng+"----"+poi.point.lat);
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
          //console.log("距离：" + a);
          that.inststion.lc = (a / 1000).toFixed(0);

          that.workcaroptions.forEach((temp) => {
            if (temp.wid == that.inststion.wid) {
              if (that.inststion.lc != 0) {
                if (that.inststion.lc > 10) {
                  a = (that.inststion.lc - 1) * temp.ccj + temp.qbj;
                } else {
                  a = (that.inststion.lc - 1) * (temp.ccj / 2) + temp.qbj;
                }
              } else {
                a = temp.qbj;
              }
              that.$set(that.tableData, 0, {
                shopname: "救援费",
                sellingprice: a,
                quantity: "1",
              });
            }
          });
          that.jisuanjaig();
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
</style>