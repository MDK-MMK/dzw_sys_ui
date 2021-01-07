<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="always">
          <el-row :gutter="10">
            <el-row>
              <el-col :xs="5" :sm="5" :md="5" :lg="14" :xl="5">
                <el-input
                  placeholder="请输入内容"
                  v-model="emp.ename"
                  class="input-show"
                  clearable
                >
                </el-input>
              </el-col>
              <el-col :xs="5" :sm="5" :md="5" :lg="2" :xl="5">
                <el-button type="primary" @click="selectAlls(size, 1)">搜索</el-button>
              </el-col>
              <el-col :xs="5" :sm="5" :md="5" :lg="2" :xl="5">
                <el-button type="primary" @click="dialogVisible = true,bool=true">新增员工</el-button>
              </el-col>
            </el-row>
            <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="1">
              <el-tag
              @close="close()"
              v-if="bu.bname != ''"
              closable
              :disable-transitions="transitions"
              class="tag"
              >当前处于：{{ bu.bname }}</el-tag 
            >
              <el-table
                :header-cell-style="{ 'text-align': 'center' }"
                :cell-style="{ 'text-align': 'center' }"
                :data="tables"
                height="500"
                @row-click="selectEmpByBu" 
              >
                <el-table-column
                  prop="dename"
                  label="部门"
                  width="180"
                >
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :xs="4" :sm="6" :md="19" :lg="20" :xl="11">
              <el-table
                :header-cell-style="{ 'text-align': 'center' }"
                :cell-style="{ 'text-align': 'center' }"
                :data="tableData"
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
                <el-table-column prop="elaimes" label="离职时间" sortable>
                </el-table-column>
                <el-table-column prop="ephone" label="操作" align="right">
                  <template slot-scope="scope">
                    <el-button
                      type="warning"
                      icon="el-icon-edit"
                      round
                      @click="update(scope.row)"
                      >编辑</el-button
                    >
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      round
                      @click="del(scope.row)"
                      >移除</el-button
                    >
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
      title="职员信息"
      :visible.sync="dialogVisible"
      width=""
      :before-close="handleClose"
    >
      <el-form :model="emp" :rules="rules" ref="emp" label-width="100px" :inline="true"  class=" " label-position="left">
        <el-form-item label="员工名称" prop="ename">
          <el-input v-model="emp.ename"></el-input>
        </el-form-item>
        <el-form-item label="员工电话" prop="ephone">
          <el-input v-model="emp.ephone"></el-input>
        </el-form-item>
        <el-form-item label="员工职位" prop="zid">
           <el-select
              v-model="emp.zid"
              placeholder="请选择职位"
              style="width:86%;"
            >
              <el-option label="请选择职位" value=""> </el-option>
              <el-option
                v-for="(item, i) in Zhiweioptions"
                :key="i"
                :label="item.zname"
                :value="item.zid"
              >
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="员工部门" prop="deid">
           <el-select
              v-model="emp.deid"
              placeholder="请选择部门"
              style="width:100%;"
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
        <el-form-item label="员工密码" prop="epwd">
          <el-input type="password" v-model="emp.epwd"></el-input>
        </el-form-item>
        <el-form-item label="员工性别" prop="esex">
          <el-input v-model="emp.esex"></el-input>
        </el-form-item>
        <el-form-item label="员工身份证" prop="ecreid">
          <el-input v-model="emp.ecreid"></el-input>
        </el-form-item>
        <el-form-item label="员工住址" prop="eaddress">
          <el-input v-model="emp.eaddress"></el-input>
        </el-form-item>
         <el-form-item label="活动时间" style="width:100%; margin-left:-155px; float:left;" required>
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择入职时间" v-model="emp.etrytimes"></el-date-picker>
            </el-form-item>
        </el-form-item>
       
        <el-form-item>
          <el-button type="primary" @click="submitForm('emp')">立即提交</el-button>
          <el-button @click="resetForm('emp')">重置</el-button>
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
      zhiwei: { zid: 0, zname: "" },//职位对象
      Zhiweioptions: [], //职位
      fullscreenLoading: false,
      dialogVisible: false,
      bool:true,
      transitions:false,
      bu: { bname: "", deid: 0 },//部门
      tableData: [], //员工数据
      tables: [], //员工部门
      currentPage: 1, //当前页数
      size: 6, //每页大小
      total: 0, //总条数
      emp: {
        ephone: "",
        ename: "",
        etrytimes: "",
        epwd:"",
        deid:"",
        ecreid:"",
        esex:"",
        eaddress:"",
        elaimes: "",
        zid: "",
        ezuant: "0",
        eyunayin:"",
      },
      rules: {
          ename: [
            { required: true, message: '请输入员工名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
           ephone: [
            { required: true, message: '请输入电话', trigger: 'blur' },
            { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' },
          ],
          zid: [
            { required: true, message: '请选择职位', trigger: 'change' }
          ],
          deid: [
            { required: true, message: '请选择部门', trigger: 'change' }
          ],
          etrytimes: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          epwd: [
            { required: true, message: '请输入员工密码', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
          ],
        }
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
    //关闭
    close() {
      let that=this;
      this.bu.deid = "";
      this.bu.bname = "";
      this.emp.deid = "";
      this.selectAlls(6,1);
      //console.log(that.emp);
    },
    //分页查询员工
    selectAlls(size, currentPage) {
      console.log(this.emp)
      const axios = require("axios");
      let that = this;
      axios
        .post(
          "http://localhost:8080/dzw_sys/api/Emp/all/" +
            size +
            "/" +
            currentPage,
          this.emp
        )
        .then(function (res) {
          //console.log(res.data);
          that.tableData = res.data.list;
          that.total = res.data.total;
        });
    },
    //查询部门
    selectBu() {
      const axios = require("axios");
      let that = this;
      axios
        .post("http://localhost:8080/dzw_sys/api/Emp/bu")
        .then(function (res) {
          console.log(res.data);
          that.tables = res.data;
        });
    },
    //按照部门查询员工
    selectEmpByBu(row){
      //console.log(row);
      let that = this;
      that.emp.deid=row.deid;
      that.bu.deid = row.deid;
      that.bu.bname = row.dename;
      that.transitions=true;
      this.selectAlls(this.size,1);
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
        this.emp.ename = "";
        this.emp.deid= 0;
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
          console.log(this.emp.deid);
          if(this.bool==true){
            axios
            .post("http://localhost:8080/dzw_sys/api/Emp/insert",this.emp)
            .then(function (res) {
              //console.log(res.data);
              if (res.data == 1) {
                that.$message({
                  message: "添加成功",
                  type: "success",
                });
                that.dialogVisible = false;
                that.emp.ename = "";
                that.selectAlls(that.size, that.currentPage);
              } else {
                that.$message.error("添加失败!");
              }
            });

          }else{
            axios
            .put("http://localhost:8080/dzw_sys/api/Emp/update",this.emp)
            .then(function (res) {
              that.fullscreenLoading = false;
              //console.log(res.data);
              if (res.data == 1) {
                that.$message({
                  message: "修改成功",
                  type: "success",
                });
                that.dialogVisible = false;
                that.emp.ename = "";
                that.emp.zid =0;
                that.selectAlls(that.size, 1);
              } else {
                that.$message.error("修改失败!");
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      let that=this;
      if (this.emp.zid !== 0) {
        that.emp.ename = "";
      }else{
         this.$refs[formName].resetFields();
      }
    },
    //点击修改显示数据
    update(row) {
      this.dialogVisible = true;
      this.bool=false;
      console.log(row);
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
.tag{
  position: absolute;
  margin-top: -50px;
  margin-left: -90px;
}
.from-emp{
  padding-right: 20px;
  width: 400px;
}
</style>

