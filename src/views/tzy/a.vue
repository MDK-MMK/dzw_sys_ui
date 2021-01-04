<template>
<div>

<el-table :data="shop" style="width: 100%">
      
      <el-table-column  prop="shopid" label="序号" width="180">

      </el-table-column>

      <el-table-column  prop="shopname" label="品牌" width="180">

      </el-table-column>

      <el-table-column label="操作" prop="shopid">
        <template slot-scope="scope">
            <a href="javascript:void(0)" @click="del(scope.row.shopid)">删除</a>
        </template>
      </el-table-column>

    </el-table>
</div>
     
</template>

 <script>
    export default {
      data() {
        return {
          shop: []
        };
      },
      created(){  
        this.query();
      },
      methods:{
         //查询全部
        query() {
            //axios
          const axios = require("axios");
          let that = this;
          axios
            .get("http://localhost:8080/dzw_sys/api/tzy/shop/query")
            .then(function (res) {
               that.shop = res.data;
                console.log(res);
            });
        },          
          del(shopid){
            alert(shopid);
              const axios = require("axios");
              axios
              .get("http://127.0.0.1:8080/dzw_sys/api/tzy/shop/delete"+this.shopid)
              .then(function (res) {
                  if(res>0){
                    alert("删除成功");
                  }else{
                    alert("删除失败");
                  }
              });
          }
    }                                                                                                   
    }
  </script>