<template>
     <el-table :data="shop" style="width: 100%">
      
      <el-table-column  prop="shopid" label="序号" width="180">

      </el-table-column>
      <el-table-column  prop="shopname" label="品牌" width="180">

      </el-table-column>
      <el-table-column label="操作">
        <a href="javascript:void(0)" @click="delete(1)">删除</a>
      </el-table-column>

    </el-table>
</template>

 <script>
    export default {
      data() {
        return {
          shop: {
            shopid:'',
            shopname:''
          }
        }
      },
      methods:{
        //查询全部
        query() {
            //axios
          const axios = require("axios");
          let that = this;
          axios
            .get("http://127.0.0.1:8080/api/tzy/shop/query")
            .then(function (res) {
                that.shop = res.data;
            });
        }
    },
      mounted() {
          delete(shopid){
              const axios = require("axios");
              let that = this;
              axios
              .get("http://127.0.0.1:8080/api/tzy/shop/delete/${shopid}")
              .then(function (res) {
                  that.shop = res.data;
              });
          }
      }
    }
  </script>