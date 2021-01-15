<template>
  <div>
    <el-row>
              <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                车牌号：<el-input type="text" placeholder="请输入车牌号"  style="width:150px;" v-model="Inststion.cno" ></el-input>
              </el-col>
              <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                开始时间：<el-date-picker type="date" placeholder="选择进厂开始时间" style="width:175px;" v-model="Inststion.jdate" ></el-date-picker>
              </el-col>
              <el-col :xs="5" :sm="5" :md="5" :lg="6" :xl="5">
                结束时间：<el-date-picker type="date" placeholder="选择进厂结束时间" style="width:175px;" v-model="Inststion.jdateEnd" ></el-date-picker>
              </el-col>
              <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
               维修状态：<el-select style="width:150px;" v-model="Inststion.izt" placeholder="选择维修状态" >
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
    style="width: 100%">
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
            <span v-if="props.row.iszn==0">否</span>
            <span v-else>是</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="维修编号"
      prop="inid">
    </el-table-column>
    <el-table-column
      label="客户车牌"
      prop="car.cno">
    </el-table-column>
    <el-table-column
      label="外派车辆"
      prop="workcar.caid">
    </el-table-column>
    <el-table-column
      label="班组"
      prop="team.tname">
    </el-table-column>
    <el-table-column
      label="进厂日期"
      sortable
      prop="jdate">
    </el-table-column>
    <el-table-column
      label="维修状态"
      prop="izt">
      <template slot-scope="scope">
        <el-button type="info" v-if="scope.row.izt==0" @click="upshow(scope.row)">维修中</el-button>
        <el-button type="primary" v-if="scope.row.izt==1" @click="updateMaintain(scope.row.inid)">接车中</el-button>
        <el-button type="danger" v-if="scope.row.izt==2">返工中</el-button>
        <el-button type="success" v-if="scope.row.izt==3">已竣工</el-button>
      </template>
    </el-table-column>
    <el-table-column
      label="费用"
      prop="wxxq">
      <template slot-scope="scope">
       <el-button @click="setshowTable(scope.row.wxxq)">查看费用</el-button>
       </template>
    </el-table-column>
  </el-table>
  <el-pagination style="margin-top:10px;"
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
       :header-cell-style="{ 'text-align': 'center' }">
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
       :header-cell-style="{ 'text-align': 'center' }">
       <!-- <template slot-scope="scope"> -->
        <el-table-column label="材料名称" prop="xqname"></el-table-column>
        <el-table-column label="材料数量" prop="xqsl"></el-table-column>
        <el-table-column label="材料单价" prop="zt"></el-table-column>
        <el-table-column label="材料总价" prop="xmoney"></el-table-column>
        <!-- </template> -->
      </el-table>
        <el-button style="margin-top:20px;" @click="moneyTable=false">确定</el-button>
    </el-dialog>

    <el-dialog
      title="竣工检验"
      :visible.sync="xiuTable"
      width="32%"
      :before-close="handleClose"
    >
    <el-divider></el-divider>

 <el-form
          :model="wei"
          ref="wei"
          style="width:90%; "
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
                <el-radio label="3" >竣工</el-radio>
                <el-radio label="2" >返修</el-radio>
              </el-radio-group>
            </template>
          </el-form-item>

          <el-form-item v-if="wei.izt==2" label="备注" prop="epwd">
            <el-input type="password" v-model="wei.epwd"></el-input>
          </el-form-item>
          
          <el-form-item>
            <el-button style="" @click="subfrom()">确定</el-button>
          </el-form-item>
        </el-form>
       
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
        tableData: [],
        showTable: [],
        showTabletwo: [],
        moneyTable: false,
        xiuTable: false,
        Inststion:{//查询条件
            cno: "",//车牌号
            izt: "4",//状态 4：不限
            jdate:null,//进厂开始日期
            jdateEnd:null,//进厂结束日期
        },
        wei:{
          inid:"",
          cno:"",
          izt:"4",
          fyuany:"",
        },
        size: 6,
        currentPage: 1,
        total: 0, //总条数
        rules: {},
        up:{
          inid:"",
          izt:"0"
        },
      }
    },created() {
    this.selectAll(6, 1);
    },methods: {
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
    },handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //查看费用
      setshowTable(row){
      console.log(row);
       this.showTable=[];
       this.showTabletwo=[];
      row.forEach(element => {
        this.showTable.push(element);
        this.showTabletwo.push(element);
      });
     for (let index = 0; index < this.showTable.length; index++) {
       if(this.showTable[index].spid==1){
         this.showTable.splice(index,1);
       }
     }
      for (let index = 0; index < this.showTabletwo.length; index++) {
       if(this.showTabletwo[index].spid==2){
         this.showTabletwo.splice(index,1);
       }
     }
      this.moneyTable = true;
    },
    //分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.size = val;
      this.selectAlls(this.size, this.currentPage);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.selectAlls(this.size, this.currentPage);
    },
    updateMaintain(inid){
      let that = this;
      this.up.inid=inid;
      this.up.izt="0";
      axios
            .put("http://localhost:8080/dzw_sys/api/Wei/update", this.up)
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
    //提交维修或竣工
    subfrom(){
      let that = this;
      console.log(this.wei);
      if(that.wei.izt==3){
        this.up.izt="3";
        this.up.inid=this.wei.inid;
        axios
            .put("http://localhost:8080/dzw_sys/api/Wei/updatejun", this.up)
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
        this.xiuTable=false;
      }
    },
    //维修竣工页面显示
    upshow(row){
      console.log(row);
      this.wei.inid=row.inid;
      this.wei.cno=row.car.cno;
      this.xiuTable=true;
    },
    }
  } 
</script>

