<template>
    <div>

        <h1>保养项目</h1>
        <br>
        <el-col :span="10">
              <h3 style="text-align:left;">保养项目名称：<el-input style="width:70%;" v-model="byname"  placeholder="请输入内容"></el-input></h3>
        </el-col>
      
        <el-col :span="3">
            <div class="grid-content bg-purple-dark">
                <el-row>
                    <el-button icon="el-icon-search" @click="queryby()" circle></el-button>
                    <el-button @click="isShow = true">添加</el-button>
                 </el-row>
            </div>
        </el-col>


        <el-table
        :data="baoy"
        style="width: 100%">
        <el-table-column prop="shopid" label="序号">

        </el-table-column>
        <el-table-column prop="shopname" label="项目名称">

        </el-table-column>
       
        <el-table-column prop="quantity" label="数量"  >

        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">

                <el-row>
                <el-button type="primary" icon="el-icon-edit" circle @click="carupdate(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.shopid)"></el-button>
                </el-row>
            
            </template>
        </el-table-column>

        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage"  :page-sizes="[2, 4, 6]"
          :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
      <br>
        


        <h1>维修项目</h1>
        <br>
        <el-col :span="10">
              <h3 style="text-align:left;">维修项目名称：<el-input style="width:70%;" v-model="wxname"  placeholder="请输入内容"></el-input></h3>
        </el-col>
      
        <el-col :span="3">
            <div class="grid-content bg-purple-dark">
                <el-row>
                    <el-button icon="el-icon-search" @click="querywx()" circle></el-button>
                    <el-button @click="isShow = true">添加</el-button>
            </el-row>
            </div>
        </el-col>
        <el-table
        :data="weix"
        style="width: 100%">
        <el-table-column prop="shopid" label="序号">

        </el-table-column>
        <el-table-column prop="shopname" label="项目名称">

        </el-table-column>
        <el-table-column prop="sellingprice" label="售价">

        </el-table-column>
        <el-table-column prop="quantity" label="数量"  >

        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">

                <el-row>
                <el-button type="primary" icon="el-icon-edit" circle @click="carupdate(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.shopid)"></el-button>
                </el-row>
            
            </template>
        </el-table-column>
        </el-table>
         <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1"
          :current-page="currentPage1"  :page-sizes="[1, 3, 5]"
          :page-size="size1" layout="total, sizes, prev, pager, next, jumper" :total="total1">
      </el-pagination>
    </div>
</template>
<script>
export default {
    data(){
        return{
             baoy: [],
             weix:[],
             byname:null,
             wxname:null,
             currentPage: 1, //当前页数
             size: 4, //每页大小
             total: 0, //总条数
             currentPage1: 1, //当前页数
             size1: 3, //每页大小
             total1: 0, //总条数
        }; 
    },created(){
        this.queryby();
        this.querywx();
    },methods:{
    //分页
    handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.size = val;
        this.queryby();
    },
    handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.queryby();
    }, 
    queryby(){
         //axios
        const axios = require("axios");
        let that = this;
        if(this.byname==""){
            this.byname = null;
        }
        axios
            .get("http://localhost:8080/dzw_sys/api/tzy/shop/queryshopby/"+this.byname+"/"+this.currentPage+"/"+this.size)
            .then(function (res) {
                that.baoy = res.data.list;
                that.total = res.data.total;
                
            });
        },
        //分页
        handleSizeChange1(val) {
        // console.log(`每页 ${val} 条`);
        this.size1 = val;
        this.querywx();
        },
        handleCurrentChange1(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage1 = val;
        this.querywx();
        },
        querywx(){
         //axios
        const axios = require("axios");
        let that = this;
        if(this.wxname==""){
            this.wxname = null;
        }
        axios
            .get("http://localhost:8080/dzw_sys/api/tzy/shop/queryshopwx/"+this.wxname+"/"+this.currentPage1+"/"+this.size1)
            .then(function (res) {
                that.weix = res.data.list;
                that.total1 = res.data.total;
                
            });
        },
        //删除发动机 
          del(shopid){
            const axios = require("axios");
            let that = this;
            axios
            .get("http://localhost:8080/dzw_sys/api/tzy/shop/deleteshop/"+shopid)
            .then(function (res) {
                if(res.data>0){
                  that.$message({
                      type: 'success',
                      message: '删除成功'
                    });
                  that.queryby();
                  that.querywx();
                }else{
                  that.$message({
                      type: 'success',
                      message: '删除失败'
                    });
                }
            });
          }
    }
}
</script>