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
                <el-button type="primary">新增员工</el-button>
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
            <el-col :lg="2"></el-col>
            <el-col :xs="4" :sm="6" :md="19" :lg="19" :xl="11">
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
                  width="180"
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
    </el-row>
  </div>
</template>

 

<script>
export default {
  data() {
    return {
      transitions:false,
      bu: { bname: "", zid: 0 },//部门
      tableData: [], //员工数据
      tables: [], //员工部门
      currentPage: 1, //当前页数
      size: 6, //每页大小
      total: 0, //总条数
      emp: {
        ephone: "",
        ename: "",
        etrytimes: "",
        elaimes: "",
        zid: "",
        ezuant: "1",
      },
    };
  },
  created() {
    this.selectAlls(6, 1);
    this.selectBu();
  },
  methods: {
    //关闭
    close() {
      let that=this;
      this.bu.zid = 0;
      this.bu.bname = "";
      this.emp.zid = "";
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
      that.emp.zid=row.deid;
      that.bu.zid = row.deid;
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
  },
};
</script>
<style scoped>
.input-show {
  width: 40%;
  margin-left: 450px;
  margin-bottom: 2%;
}
.tag{
  position: absolute;
  margin-top: -50px;
  margin-left: -90px;
}
</style>