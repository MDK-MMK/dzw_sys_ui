<template>
  <el-row :gutter="12">
    <div style="margin-bottom: 20px">
      <el-input
        v-model="inputtj"
        placeholder="请输入车牌号"
        style="width: 300px"
      ></el-input>
      <el-select v-model="kk" placeholder="请选择">
        <el-option label="请选择" value="-1"></el-option>
      <el-option label="已结算" value="0"></el-option>
      <el-option label="未结算" value="1"></el-option>
  </el-select>
      <el-button type="primary" @click="tjcx(inputtj)">查询</el-button>
    </div>

    <el-col :span="24">
      <el-card shadow="always">
        <el-table :data="shops" style="width: 100%">
          <el-table-column label="车牌号" prop="cno"> </el-table-column>

          <!-- <el-table-column label="收银金额" prop="cassprice"> </el-table-column> -->
          <el-table-column label="维修编号" prop="inid"> </el-table-column>
          <el-table-column label="是否结算" prop="ifjs">
            <template slot-scope="scope">
              <span v-if="scope.row.ifjs == 0">已结算</span>
              <span v-if="scope.row.ifjs == 1">未结算</span>
            </template>
          </el-table-column>
          <el-table-column label="开单日期" prop="jdate"> </el-table-column>
          <el-table-column label="完工日期" prop="wgday"> </el-table-column>
          <el-table-column align="right">
            <template slot-scope="scope">
              <el-button 
                :disabled="scope.row.ifjs == 0"
                size="mini"
                type="success"
                @click="
                  sy(
                    scope.row.cno,
                    scope.row.cassprice,
                    scope.row.inid,
                    scope.row.ifjs,
                    scope.row.iszn
                  )
                "
                >收银</el-button
              >
              <el-button
               :disabled="scope.row.ifjs == 1"
                size="mini"
                type="info"
                @click="
                  ckxq(
                    scope.row.cno,
                    scope.row.cassprice,
                    scope.row.inid,
                    scope.row.ifjs,
                    scope.row.iszn
                  )
                "
                >打印单据</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="50%"
          :before-close="handleClose"
        >
          <el-table :data="sp" style="width: 100%">
            <el-table-column label="商品名称" prop="xqname"> </el-table-column>

            <el-table-column label="商品单价" prop="spid"> </el-table-column>

            <el-table-column label="购买数量" prop="xqsl"> </el-table-column>

            <el-table-column label="商品总价" prop="xmoney"> </el-table-column>
          </el-table>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>

        <!--会员站外收银详情-->
        <el-dialog
          title="提示"
          :visible.sync="dialogVisiblehyzw"
          width="50%"
          :before-close="handleClose"
        >
          <p visible.sync="dialogVisiblehycz"></p>
          <h3 style="margin-bottom: 10px">会员操作</h3>
          会员折扣:<span style="margin-right: 20px; color: red">{{
            hysy.baifb
          }}</span
          >可用积分:<span style="color: red">{{ hysy.yue }}</span
          ><span style="margin-left: 18px">应收金额</span
          ><span style="margin-right: 20px; color: red">{{ ssnum }}</span
          >折后价格:<span style="color: red">{{ ssnum * hysy.baifb }}</span>

          <p id="zwcz"></p>
          <h3 style="margin-bottom: 10px; margin-top: 10px">站外操作</h3>
          总里程数:<span style="margin-right: 20px; color: red">{{
            wp.lc
          }}</span
          >起步价:<span style="color: red">{{ wp.qbj }}</span
          ><span style="margin-left: 18px" v-if="wp.lc > 3"
            >超出公里价:<span style="margin-right: 20px; color: red">{{
              wp.ccj
            }}</span></span
          ><span v-if="wp.lc > 3">
            外派总价:<span style="color: red; margin-right: 18px">{{
              (wp.lc - 3) * wp.ccj + wp.qbj
            }}</span></span
          ><span v-if="wp.lc <= 3" style="margin-left: 18px"
            >外派总价:<span style="color: red">{{ wp.qbj }}</span></span
          >

          <el-table :data="sp" style="width: 100%">
            <el-table-column label="商品名称" prop="xqname"> </el-table-column>

            <el-table-column label="商品单价" prop="spid"> </el-table-column>

            <el-table-column label="购买数量" prop="xqsl"> </el-table-column>

            <el-table-column label="商品总价" prop="xmoney"> </el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
            <template>
              <el-radio-group v-model="checked">
                <el-radio id="ckk" label="1">支付宝付款</el-radio>
                <el-radio id="ck" label="2">现金付款</el-radio>
            </el-radio-group>
            </template>
            <el-button @click="dialogVisiblehyzw = false">取 消</el-button>
            <el-button
              @click="
                hysypd(hysy.yue, wp.qbj + ssnum * hysy.baifb, hysy.cliphone)
              "
              v-if="wp.lc <= 3"
              >结算(总价：{{ wp.qbj + ssnum * hysy.baifb }})</el-button
            >
            <el-button
              @click="
                hysypd(
                  hysy.yue,
                  (wp.lc - 3) * (wp.ccj + wp.qbj) + ssnum * hysy.baifb,
                  hysy.cliphone
                )
              "
              v-if="wp.lc > 3"
              >结算(总价：{{
                (wp.lc - 3) * wp.ccj + wp.qbj + ssnum * hysy.baifb
              }})</el-button
            >
          </span>
        </el-dialog>

        <!--会员收银详情-->
        <el-dialog
          title="提示"
          :visible.sync="dialogVisiblehy"
          width="50%"
          :before-close="handleClose"
        >
          <p></p>
          <h3 style="margin-bottom: 10px">会员操作</h3>
          会员折扣:<span style="margin-right: 20px; color: red">{{
            hysy.baifb
          }}</span
          >可用积分:<span style="color: red">{{ hysy.yue }}</span
          ><span style="margin-left: 18px">应收金额</span
          ><span style="margin-right: 20px; color: red">{{ ssnum }}</span
          >折后价格:<span style="color: red">{{ ssnum * hysy.baifb }}</span>

          <el-table :data="sp" style="width: 100%">
            <el-table-column label="商品名称" prop="xqname"> </el-table-column>

            <el-table-column label="商品单价" prop="spid"> </el-table-column>

            <el-table-column label="购买数量" prop="xqsl"> </el-table-column>

            <el-table-column label="商品总价" prop="xmoney"> </el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
            <template>
              <el-radio-group v-model="checked">
                <el-radio id="ckk" label="1">支付宝付款</el-radio>
                <el-radio id="ck" label="2">现金付款</el-radio>
            </el-radio-group>
            </template>
            <el-button @click="dialogVisiblehy = false">取 消</el-button>

            <el-button
              @click="hysypd(hysy.yue, ssnum * hysy.baifb, hysy.cliphone)"
              >结算(总价：{{ ssnum * hysy.baifb }})</el-button
            >
          </span>
        </el-dialog>

        <!--站外收银详情-->
        <el-dialog
          title="提示"
          :visible.sync="dialogVisiblezw"
          width="50%"
          :before-close="handleClose"
        >
          <p id="zwcz"></p>
          <h3 style="margin-bottom: 10px; margin-top: 10px">站外操作</h3>
          应收金额:<span style="margin-right: 20px; color: red">{{
            ssnum
          }}</span
          >总里程数:<span style="margin-right: 20px; color: red">{{
            wp.lc
          }}</span
          >起步价:<span style="color: red">{{ wp.qbj }}</span
          ><span style="margin-left: 18px" v-if="wp.lc > 3"
            >超出公里价:<span style="margin-right: 20px; color: red">{{
              wp.ccj
            }}</span></span
          ><span v-if="wp.lc > 3">
            外派总价:<span style="color: red; margin-right: 18px">{{
              (wp.lc - 3) * wp.ccj + wp.qbj
            }}</span></span
          ><span v-if="wp.lc <= 3" style="margin-left: 18px"
            >外派总价:<span style="color: red">{{ wp.qbj }}</span></span
          >

          <el-table :data="sp" style="width: 100%">
            <el-table-column label="商品名称" prop="xqname"> </el-table-column>

            <el-table-column label="商品单价" prop="spid"> </el-table-column>

            <el-table-column label="购买数量" prop="xqsl"> </el-table-column>

            <el-table-column label="商品总价" prop="xmoney"> </el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
            <template>
              <el-radio-group v-model="checked">
                <el-radio id="ckk" label="1">支付宝付款</el-radio>
                <el-radio id="ck" label="2">现金付款</el-radio>
            </el-radio-group>
            </template>
            <el-button @click="dialogVisiblezw = false">取 消</el-button>

            <el-button
              @click="hysypd(hysy.yue, wp.qbj+ssnum, hysy.cliphone)"
              v-if="wp.lc <= 3"
              >结算(总价：{{ wp.qbj + ssnum }})</el-button
            >
            <el-button
              @click="
                hysypd(hysy.yue, (wp.lc - 3) * (wp.ccj + wp.qbj)+ssnum, hysy.cliphone)
              "
              v-if="wp.lc > 3"
              >结算(总价：{{
                (wp.lc - 3) * wp.ccj + wp.qbj + ssnum
              }})</el-button
            >
          </span>
        </el-dialog>

        <!--非会员非站外收银详情-->
        <el-dialog
          title="提示"
          :visible.sync="dialogVisiblefhyfzh"
          width="50%"
          :before-close="handleClose"
        >
          <el-table :data="sp" style="width: 100%">
            <el-table-column label="商品名称" prop="xqname"> </el-table-column>

            <el-table-column label="商品单价" prop="spid"> </el-table-column>

            <el-table-column label="购买数量" prop="xqsl"> </el-table-column>

            <el-table-column label="商品总价" prop="xmoney"> </el-table-column>
          </el-table>

          <span slot="footer" class="dialog-footer">
           <template>
              <el-radio-group v-model="checked">
                <el-radio id="ckk" label="1">支付宝付款</el-radio>
                <el-radio id="ck" label="2">现金付款</el-radio>
            </el-radio-group>
            </template>
            <el-button @click="dialogVisiblefhyfzh = false">取 消</el-button>
            <el-button @click="fhyfzh(ssnum, inid)"
              >结算(总价：{{ ssnum }})</el-button
            >
          </span>
        </el-dialog>

        <!--旧会员收银-->
        <el-dialog
          title="会员收银"
          :visible.sync="dialogVisible2"
          width="30%"
          :before-close="handleClose"
        >
          <p>
            会员折扣:<span style="margin-right: 20px; color: red">{{
              hysy.baifb
            }}</span
            >可用积分:<span style="color: red">{{ hysy.yue }}</span>
          </p>
          <p style="margin-top: 15px">
            应收金额:<span style="ma           rgin-right:20px;color:red;">{{
              cassprice
            }}</span
            >折后价格:<span style="color: red">{{
              cassprice * hysy.baifb
            }}</span>
          </p>
          <span slot="footer" class="dialog-footer">
            <el-checkbox id="ck" v-model="checked">现金付款</el-checkbox>
            <el-button @click="dialogVisible2 = false">取 消</el-button>
            <el-button
              @click="hysypd(hysy.yue, cassprice * hysy.baifb, hysy.cliphone)"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
const axios = require("axios");
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisiblehyzw: false,
      dialogVisiblehy: false,
      dialogVisiblezw: false,
      dialogVisiblefhyfzh: false,
      shops: [],
      sp: [],
      hysy: {},
      cassprice: "",
      inid: "",
      ifjs: "",
      checked: "0",
      cno: "",
      wp: [],
      ssnum: "",
      inputtj: "",
      kk:'-1',
      jjjy:'',
    };
  },
  created() {
    this.queryfirm();
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    queryfirm() {
      //axios
      const axios = require("axios");
      let that = this;
      axios
        .get(
          "http://localhost:8080/dzw_sys/api/ljy/empl/selectByPrimaryKey/null/"+this.kk
        )
        .then(function (res) {
          console.log(res.data);
          that.shops = res.data;
        });
    },
    tjcx(phone) {
      //axios
      const axios = require("axios");
      let that = this;
      if(phone==''){
        this.queryfirm();
        return;
      }
      axios
        .get(
          "http://localhost:8080/dzw_sys/api/ljy/empl/selectByPrimaryKey/" +
            phone+"/"+this.kk
        )
        .then(function (res) {
          that.shops = res.data;
        });
    },
    snum() {
      //console.log(this.ssnum);
      var sssnum = 0;
      this.sp.forEach((temp) => {
        sssnum = parseInt(sssnum) + parseInt(temp.xmoney);
      });
      this.ssnum = sssnum;
    },
    open() {
      this.$alert(
        "<table><tr><td>商品名称</td><td>商品价钱</td></tr></table>",
        "消费详情",
        {
          dangerouslyUseHTMLString: true,
        }
      );
    },
    //打印单据
    ckxq(cno, cassprice, inid, ifjs, iszn) {
      //axios
      const axios = require("axios");
      let that = this;
        console.log(inid);
        
        that.$router.push('/a');
        sessionStorage.setItem('inid',inid);
        sessionStorage.setItem('cno',cno);
      
    },
    sy(cno, cassprice, inid, ifjs, iszn) {
      //axios
      const axios = require("axios");
      let that = this;
      //alert(inid);

      axios
        .get(
          "http://localhost:8080/dzw_sys/api/ljy/empl/selectByPrimaryKeyByinid/" +
            inid
        )
        .then(function (reses) {
          //console.log(reses.data);
          that.sp = reses.data;
          that.snum();
          that.dialogVisible3 = true;
        });
      //根据维修编号查询外派信息
      axios
        .get(
          "http://localhost:8080/dzw_sys/api/ljy/empl/selectLjyWorkcar/" + inid
        )
        .then(function (resres) {
          //console.log(resres.data);
          that.wp = resres.data;
        });

      axios
        .get("http://localhost:8080/dzw_sys/api/ljy/empl/selectClient/" + cno)
        .then(function (res) {
          //console.log(res.data);
          that.hysy = res.data;
          that.cassprice = cassprice;
          that.cno = cno;
          if (ifjs > 0) {
            //非会员非站外
            that.inid = inid;
            if (res.data.mid > 0 && iszn == 0) {
              that.dialogVisiblefhyfzh = true;
              //会员非站外
            } else if (res.data.mid == 0 && iszn == 0) {
              that.dialogVisiblehy = true;
              //非会员站外
            } else if (res.data.mid > 0 && iszn > 0) {
              that.dialogVisiblezw = true;
            } //会员站外
            else if (res.data.mid == 0 && iszn > 0) {
              that.dialogVisiblehyzw = true;
            }
          } else {
            that.$message.error("该订单已结算");
          }
        });
    },
    //非会员非站外
    fhyfzh(cassprice, inid) {
      const axios = require("axios");
      let that = this;
      axios
        .post("http://localhost:8080/dzw_sys/api/ljy/empl/updateByinid/" + inid)
        .then(function (ress) {
          that.$message({
            message: "收银成功",
            type: "success",
          });
          that.queryfirm();
        });
    },
    hydl() {
      //axios
      const axios = require("axios");
      let that = this;
      that.dialogVisible2 = true;
    },
    //判断余额是否大于折扣金额
    hysypd(yue, zhjg, cliphone) {
      if (yue >= zhjg) {
        this.jjjy= zhjg;
        var ye="余额"
        this.kcjf(zhjg, yue - zhjg, cliphone,ye);
      } else {
        if (this.checked==2) {
          this.jjjy= zhjg;
          var ye="现金"
          this.kcjf(yue, 0, cliphone,ye);
        }else if(this.checked==1){
          alert(zhjg);
           this.jjjy= zhjg;
           alert(this.jjjy);
          var ye="支付宝"
          //this.kcjf(yue, 0, cliphone,ye);
          window.open("http://localhost:8080/dzw_sys/api/lt/dzwpay/pay/1/1/"+this.jjjy+"/12","_blank");
        } else {
          this.$message.error("积分不足");
        }
      }
    },
    kcjf(zhjg, syjf, cliphone,zf) {
      
      let that = this;

      axios
        .post(
          "http://localhost:8080/dzw_sys/api/ljy/empl/updateByphone/" +
            zhjg +
            "/" +
            cliphone
        )
        .then(function (ress) {
          that.$message({
            message: "收银成功",
            type: "success",
          });

          that.queryfirm();
        });

      axios
        .post(
          "http://localhost:8080/dzw_sys/api/ljy/empl/updateBycno/" + this.cno
        )
        .then(function (ressss) {
          that.queryfirm();
        });
      //新增收银记录
         axios
        .post(
          "http://localhost:8080/dzw_sys/api/ljy/empl/insaddsyjl/" + this.inid+"/"+this.jjjy+"/"+zf
        )
        .then(function (resssss) {
          alert(resssss.data)
          that.queryfirm();
        });


      this.$notify({
        title: "成功",
        message: "已扣除积分" + zhjg + ",剩余积分" + syjf + "",

        type: "success",
      });
    },
    syxq(inid) {
      //axios
      const axios = require("axios");
      let that = this;
      //alert(inid);
      axios
        .get(
          "http://localhost:8080/dzw_sys/api/ljy/empl/selectByPrimaryKeyByinid/" +
            inid
        )
        .then(function (res) {
          //console.log(res.data);
          that.sp = res.data;
          that.dialogVisible3 = true;
        });
    },
  },
};
</script>
