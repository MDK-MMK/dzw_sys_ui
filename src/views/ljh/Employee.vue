<template>
  <div>
    <div id="bu" style="position: absolute; width: 180px;display:inline-block; border:1px solid #aaa;">
      <el-table
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tables"
      style=""
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        prop="dename"
        label="部门"  
        width="180">
      </el-table-column>
    </el-table>
    </div>

    <el-table
      :data="tableData"
      style="width: 70%;display:inline-block; margin-left:220px;"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        prop="ename"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="ephone"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="etrytimes"
        label="入职日期"
        sortable
        width="180">
      </el-table-column>
      
      <el-table-column
        prop="elaimes"
        label="离职时间"
        sortable>
      </el-table-column>
    </el-table>
  </div>
</template>

 

<script>
  export default {
    data() {
      return {
        tableData: [],//员工数据
        tables:[],//员工部门
        currentPage: 1, //当前页数
        size: 4, //每页大小
       total: 0, //总条数
       emp:{ephone :'',ename:'',etrytimes:'',elaimes:'',zid:'',ezuant:'1'},
      }
    },
    created() {
     this.selectAlls(6, 1);
     this.selectBu();
    },
    methods: {
      //分页查询员工
      selectAlls(size, currentPage) {
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
              console.log(res.data);
            that.tableData = res.data.list;
            that.total = res.data.total;
          });
      },
      //查询
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
    }
  }
</script>
<style scoped>

</style>