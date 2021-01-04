<template>
<div>
 <el-row>

  <el-col :span="8">
    <div class="grid-content bg-purple-dark">
      发动机名称：<el-input v-model="input" placeholder="请输入发动机品牌" style="width:290px"></el-input> 
    </div>
  </el-col>

  <el-col :span="3">
    <div class="grid-content bg-purple-dark">
        <el-row>
            <el-button icon="el-icon-search" circle></el-button>
             <el-button @click="isShow = true">添加</el-button>
      </el-row>
    </div>
  </el-col>

</el-row>
<el-table :data="shops" style="width: 80%;margin-left:50px">
      
      <el-table-column prop="shopid" label="序号" width="%25">

      </el-table-column>

      <el-table-column  prop="shopname" label="品牌" width="%25">

      </el-table-column>

       <el-table-column  prop="sellingprice" label="价格" width="%25">

      </el-table-column>

      <el-table-column label="操作" prop="shopid">
        <template slot-scope="scope">

          <el-row>
             <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.shopid)"></el-button>
          </el-row>
           
        </template>
      </el-table-column>

    </el-table>


     <div id="app">
			<el-dialog :before-close="handlerClose" @opened="handlerOpen" :visible.sync="isShow" title="添加发动机品牌" width="50%" center>
				<div id="cnt" v-loading="loading">

            <el-row style="text-align:center;margin:15px;">
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  发动机名称：<el-input v-model="shop.shopname" placeholder="请输入发动机名称" style="width:290px"></el-input> 
                </div>
              </el-col>
            </el-row>

             <el-row style="text-align:center;margin:15px;">
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  发动机价格：<el-input v-model="shop.stockprice" placeholder="请输入发动机价格" style="width:290px"></el-input> 
                </div>
              </el-col>
            </el-row>



             <el-row style="text-align:center;margin:15px;">
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                   车辆的品牌：<el-select v-model="op" clearable placeholder="请选择" style="width:290px">
                    <el-option
                      v-for="item in cartypes"
                      :key="item.ctid"
                      :label="item.ctname"
                      :value="item.ctid">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>

            <el-row style="text-align:center;margin:15px;">
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  适合的车型：<el-input v-model="shop.agreement" placeholder="请输入适合的车型" style="width:290px"></el-input> 
                </div>
              </el-col>
            </el-row>

             <el-row style="text-align:center;margin:15px;">
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  发动机数量：<el-input v-model="shop.quantity" placeholder="请输入发动机数量" style="width:290px"></el-input> 
                </div>
              </el-col>
            </el-row>

             

             <el-row style="text-align:center;margin:15px;">
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  供应商名称：<el-select v-model="ops" clearable placeholder="请选择" style="width:290px">
                    <el-option
                      v-for="item in options"
                      :key="item.firmid"
                      :label="item.firmname"
                      :value="item.firmid">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>

				</div>
				<span slot="footer" class="dialog-footer">
	    			<el-button @click="isShow=false">取 消</el-button>
	    			<el-button type="primary" @click="add()">确 定</el-button>
  				</span>
			</el-dialog>

		</div>
</div>
     



    
</template>

 <script>
    export default {
      data() {
        return {
          isShow: false,
          input:'',
          shops: [],
          cartypes:[],
          options: [],
          op:1,
          ops:1,
          shop:{
            firmid:'',
            shopname:'',
            stockprice:'',
            agreement:'',
            quantity:'',
            weight:''
          }
          };
      },
      created(){  
        this.queryshop();
        this.queryfirm();
        this.querycartypes();
      },
      methods:{
          //查询全部供应商
          queryfirm(){
            //axios
            const axios = require("axios");
            let that = this;
            axios
              .get("http://localhost:8080/dzw_sys/api/tzy/shop/queryfirm")
              .then(function (res) {
                  that.options = res.data;
                  
              });
          },
          //查询全部车辆品牌
          querycartypes(){
            //axios
            const axios = require("axios");
            let that = this;
            axios
              .get("http://localhost:8080/dzw_sys/api/tzy/shop/querycartypes")
              .then(function (res) {
                  that.cartypes = res.data;
                  
              });
          },
          //添加发动机
          add(){
            this.shop.firmid = this.ops
            this.shop.weight = this.op
            alert(this.shop.firmid)
            alert(this.shop.weight)
          },
          //查询全部
          queryshop() {
            //axios
            const axios = require("axios");
            let that = this;
            axios
              .get("http://localhost:8080/dzw_sys/api/tzy/shop/queryshop")
              .then(function (res) {
                that.shops = res.data;
                  console.log(res);
              });
          },         
          //删除信息 
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
                  that.queryshop();
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