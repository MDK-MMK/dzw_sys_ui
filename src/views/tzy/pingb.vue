<template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
</template>
<script>
export default {
    data(){
        return{
tableData:[],
        };
    },
    created(){

    },
    mounted:{
         //查询全部
        query() {
            //axios
          const axios = require("axios");
          let that = this;
          axios
            .get("http://127.0.0.1:8080/api/tzy/shop/query")
            .then(function (res) {
               // that.shop = res.data;
                console.log(res);
            });
        },          
          del(shopid){
              const axios = require("axios");
              let that = this;
              axios
              // .get(`http://127.0.0.1:8080/api/tzy/shop/delete/${shopid}`)
              // .then(function (res) {
              //     that.shop = res.data;
              // });
          }
    }
}
</script>