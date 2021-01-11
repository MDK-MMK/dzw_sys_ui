<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="always">
          <el-row :gutter="10">
            <el-row>
              <el-col :xs="5" :sm="5" :md="5" :lg="14" :xl="5">
                <el-input
                  placeholder="请输入员工名称"
                  v-model="emp.ename"
                  class="input-show"
                  clearable
                >
                </el-input>
              </el-col>
              <el-col :xs="5" :sm="5" :md="5" :lg="2" :xl="5">
                <el-button type="primary" @click="selectAlls(size, 1)"
                  >搜索</el-button
                >
              </el-col>
              <el-col :xs="5" :sm="5" :md="5" :lg="2" :xl="5">
                <el-button
                  type="primary"
                  @click="(dialogVisible = true), (bool = true)"
                  >离职</el-button>
              </el-col>
              <el-col :xs="5" :sm="5" :md="5" :lg="2" :xl="5">
                <el-button
                  type="primary"
                  @click="fuzhi"
                  >复职</el-button>
              </el-col>
            </el-row>
            <el-col :xs="4" :sm="6" :md="19" :lg="24" :xl="11">
              <el-table
                :header-cell-style="{ 'text-align': 'center' }"
                :cell-style="{ 'text-align': 'center' }"
                :data="tableData"
                ref="empTable"
                highlight-current-row
                @current-change="handleCurrentChange"
                style=""
                :default-sort="{ prop: 'date', order: 'descending' }"
              >
                <el-table-column prop="ename" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="ephone" label="电话" width="180">
                </el-table-column>
                <el-table-column
                  prop="etrytimes"
                  label="入职日期"
                  sortable
                  width="160"
                >
                </el-table-column>
                <el-table-column
                  prop="elaimes"
                  label="离职日期"
                  sortable
                  width="160"
                >
                </el-table-column>
                <el-table-column prop="eyunayin" label="离职原因" width="180">
                </el-table-column>
                <el-table-column prop="zid" label="职位">
                  <template slot-scope="scope">
                  <div v-for="(temp, i) in Zhiweioptions" :key="i">
                    <p v-if="temp.zid == scope.row.zid">{{ temp.zname }}</p>
                  </div>
                </template>
                </el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[4, 6, 8, 10]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              >
              </el-pagination>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-dialog
        title="离职信息"
        :visible.sync="dialogVisible"
        width=""
        :before-close="handleClose"
      >
        <el-form
          :model="emp"
          :rules="rules"
          ref="emp"
          label-width="100px"
          :inline="true"
          class="demo-form-inline"
          label-position="left"
          
        >
          <el-form-item label="员工部门" prop="deid">
            <el-select
              v-model="emp.deid"
              placeholder="请选择部门"
              style="width: 100%"
              @change="selectEmpByBu(emp.deid)"
            >
              <el-option label="请选择部门" value=""> </el-option>
              <el-option
                v-for="(item, i) in tables"
                :key="i"
                :label="item.dename"
                :value="item.deid"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择员工" prop="ename">
            <el-select
              v-model="emp.ephone"
              placeholder="请选择员工"
              style="width: 100%"
            >
              <el-option label="请选择员工" value=""> </el-option>
              <el-option
                v-for="(item, i) in selEmp"
                :key="i"
                :label="item.ename"
                :value="item.ephone"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-col :span="24">
          <el-form-item label="离职原因" prop="eyunayin" style=" ">
            <el-input type="textarea" v-model="emp.eyunayin" style="width:555px;"></el-input>
          </el-form-item>
          </el-col>
          <el-form-item>
            <el-button type="primary" @click="submitForm('emp')"
              >立即提交</el-button
            >
            <el-button @click="dialogVisible=false">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-row>
  </div>
</template>

 

<script>
export default {
  data() {
    return {
      zhiwei: { zid: 0, zname: "" }, //职位对象
      Zhiweioptions: [], //职位
      selEmp: [], //员工下拉列表
      fullscreenLoading: false,
      dialogVisible: false,
      bool: true,
      transitions: false,
      bu: { bname: "", deid: 0 }, //部门
      tableData: [], //员工数据
      tables: [], //员工部门
      currentPage: 1, //当前页数
      size: 6, //每页大小
      total: 0, //总条数
      emp: {
        ephone: "",
        ename: "",
        etrytimes: "",
        epwd: "",
        deid: "",
        ecreid: "",
        esex: "",
        eaddress: "",
        elaimes: "",
        zid: "",
        ezuant: "1",
        eyunayin: "",
      },
      currentRow: null,
      rules: {
        ephone: [{ required: true, message: "请选择员工", trigger: "change" }],
        deid: [{ required: true, message: "请选择部门", trigger: "change" }],
      },
    };
  },
  created() {
    this.selectAlls(6, 1);
    this.selectBu();
    this.selectZhiWeiAll();
  },
  methods: {
    //查询职位
    selectZhiWeiAll() {
      const axios = require("axios");
      let that = this;
      axios
        .post("http://localhost:8080/dzw_sys/api/Zhiwei/all/100/1", this.zhiwei)
        .then(function (res) {
          //console.log(res.data);
          that.Zhiweioptions = res.data.list;
        });
    },
    //分页查询员工
    selectAlls(size, currentPage) {
      const axios = require("axios");
      let that = this;
      this.selEmp=[];
      this.emp.ezuant="1";
      axios
        .post("http://localhost:8080/dzw_sys/api/Emp/all/" +size +"/" +currentPage,this.emp)
        .then(function (res) {
          //console.log(res.data);
          that.tableData = res.data.list;
          that.total = res.data.total;
          that.clearEmp();
        });
    },
    //查询部门
    selectBu() {
      const axios = require("axios");
      let that = this;
      axios
        .post("http://localhost:8080/dzw_sys/api/Emp/bu")
        .then(function (res) {
          that.tables = res.data;
        });
    },
    //按照部门查询员工
    selectEmpByBu(deid) {
      let that = this;
      that.emp.deid = deid;
      that.emp.ezuant = "0";
      const axios = require("axios");
      axios
        .post("http://localhost:8080/dzw_sys/api/Emp/all/100/1",that.emp)
        .then(function (res) {
          //console.log(res.data);
          that.selEmp = res.data.list;
          that.total = res.data.total;
        });

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
    //关闭窗口
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.clearEmp();
          //console.log(this.Zhiweia);
        })
        .catch((_) => {});
    },
    //提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          const axios = require("axios");
          let that = this;
          console.log(this.emp);
          this.emp.ezuant="1";
            axios
              .put("http://localhost:8080/dzw_sys/api/Emp/updateli", this.emp)
              .then(function (res) {
                that.fullscreenLoading = false;
                //console.log(res.data);
                if (res.data == 1) {
                  that.$message({
                    message: "操作成功",
                    type: "success",
                  });
                  that.dialogVisible = false;
                  that.clearEmp();
                  that.selectAlls(that.size, 1);
                } else {
                  that.$message.error("操作失败!");
                }
              });
        } else {
          return false;
        }
      });
    },
    //复职
    fuzhi() {
          // alert("submit!");
          const axios = require("axios");
          let that = this;
          that.currentRow.ezuant="0";
          console.log(that.currentRow);
            axios
              .put("http://localhost:8080/dzw_sys/api/Emp/updateli", that.currentRow)
              .then(function (res) {
                if (res.data == 1) {
                  that.$message({
                    message: "操作成功",
                    type: "success",
                  });
                  that.currentRow=null;
                  that.selectAlls(that.size, 1);
                } else {
                  that.$message.error("操作失败!");
                }
              });
    },
    //点击修改显示数据
    update(row) {
      let that = this;
      this.dialogVisible = true;
      this.bool = false;
      this.emp.ename = row.ename;
      this.emp.etrytimes=row.etrytimes;
      this.emp.ephone=row.ephone;
      this.emp.epwd=row.epwd;
      this.emp.deid=row.deid;
      this.emp.ecreid=row.ecreid;
      this.emp.esex=row.esex+"";
      this.emp.eaddress=row.eaddress;
      this.emp.elaimes=row.elaimes;
      this.emp.zid=row.zid;
      this.emp.eyunayin=row.eyunayin;
      console.log(row);
    },
    //清空emp对象
    clearEmp(){
      this.emp.ename = "";
          this.emp.etrytimes="";
          this.emp.ephone="";
          this.emp.epwd="";
          this.emp.deid="";
          this.emp.ecreid="";
          this.emp.esex="";
          this.emp.eaddress="";
          this.emp.elaimes="";
          this.emp.zid="";
          this.emp.eyunayin="";
          this.emp.ezuant="";
          this.selEmp=[];
    },
//删除员工
    delEmp(row) {
      const axios = require("axios");
      let that = this;
      //this.fullscreenLoading=true;
      axios
        .delete(
          "http://localhost:8080/dzw_sys/api/Emp/delete/" + row.ephone
        )
        .then(function (res) {
          //console.log(res.data);
          if (res.data == 1) {
            that.$message({
              message: "移除成功",
              type: "success",
            });
            that.clearEmp();
            that.selectAlls(that.size, 1);
          } else {
            that.$message.error("移除失败!");
          }
          // that.fullscreenLoading=false;
        });
    },
    handleCurrentChange(val) {
      //console.info(val)
      this.currentRow = val;
      },
      setCurrent(row) {
        console.log("row："+row);
        this.$refs.empTable.setCurrentRow(row);
      },
  },
};
</script>
<style scoped>
.input-show {
  width: 40%;
  margin-left: 40%;
  margin-bottom: 2%;
}
.tag {
  position: absolute;
  margin-top: -50px;
  margin-left: -90px;
}
.from-emp {
  padding-right: 20px;
  width: 400px;
}
</style>
