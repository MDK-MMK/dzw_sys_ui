<template>
<div>
  <h1>发动机品牌</h1><br><br><br>
 <el-row>
  <el-col :span="1">&nbsp;</el-col>
  <el-col :span="8">
    <div class="grid-content bg-purple-dark">
      发动机名称：<el-input v-model="cx" placeholder="请输入发动机品牌" style="width:290px"></el-input> 
    </div>
  </el-col>

  <el-col :span="3">
    <div class="grid-content bg-purple-dark">
        <el-row>
            <el-button icon="el-icon-search" @click="chaxun()" circle></el-button>
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
            <el-button type="primary" icon="el-icon-edit" circle @click="update(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.shopid)"></el-button>
          </el-row>
           
        </template>
      </el-table-column>

    </el-table>

<!-- 添加发动机 -->
     <div id="app">
			<el-dialog  :visible.sync="isShow" title="添加发动机品牌" width="50%" center>
				<div id="cnt" >

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
                  发动机价格：<el-input v-model="shop.sellingprice" placeholder="请输入发动机价格" style="width:290px"></el-input> 
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
                  适合的车型：<el-input v-model="shop.numbering" placeholder="请输入适合的车型" style="width:290px"></el-input> 
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

<!-- 修改模态框 -->
  <div id="app">
			<el-dialog  :visible.sync="isShows" title="修改发动机品牌" width="50%" center>
				<div id="cnt" >

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
                  发动机价格：<el-input v-model="shop.sellingprice" placeholder="请输入发动机价格" style="width:290px"></el-input> 
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
                  适合的车型：<el-input v-model="shop.numbering" placeholder="请输入适合的车型" style="width:290px"></el-input> 
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
	    			<el-button type="primary" @click="queding()">确 定</el-button>
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
          isShows: false,
          input:'',
          shops: [],
          cartypes:[],
          options: [],
          op:1,
          ops:1,
          cx:'',
          shop:{
            shopid:'',
            firmid:'',
            shopname:'',
            sellingprice:'',
            numbering:'',
            quantity:'',
            weight:'',
            goodid:1
          }
          };
      },
      created(){  
        this.queryshop();
        this.queryfirm(1,100);
        this.querycartypes();
      },
      methods:{
          //根据发动机名称模糊查询
          chaxun(){
              //axios
              const axios = require("axios");
              let that = this;
              if(this.cx==""){
                  this.queryshop();
              }else{
                axios
                .get("http://localhost:8080/dzw_sys/api/tzy/shop/queryshopname/"+this.cx)
                .then(function (res) {
                  //alert(res.data)
                      that.shops = res.data;
                });
              }
              
          },
          //修改发动机
          update(xg){
              this.isShows = true;
              this.shop.shopname = xg.shopname;
              this.shop.sellingprice = xg.sellingprice;
              this.shop.numbering = xg.numbering;
              this.shop.quantity = xg.quantity;
              this.shop.shopid = xg.shopid;
              this.op = xg.firmid;
              this.ops = xg.weight;
              this.shop.firmid = this.op;
              this.shop.weight = this.ops;
            
          },queding(){
              //axios
              const axios = require("axios");
              let that = this;
              axios
                .post("http://localhost:8080/dzw_sys/api/tzy/shop/modifyshop",this.shop)
                .then(function (res) {
                  if(res.data){
                      that.$message({
                        type: 'success',
                        message: '修改成功'
                      });
                      that.isShows = false;
                      that.queryshop();
                  }else{
                      that.$message({
                        type: 'success',
                        message: '修改失败'
                      });
                  }
                    
                });
          },
          //查询全部供应商
          queryfirm(p,s){
            //alert(p+"/"+s)
            //axios
            const axios = require("axios");
            let that = this;
            axios
              .get("http://localhost:8080/dzw_sys/api/tzy/shop/queryfirm/"+p+"/"+s)
              .then(function (res) {
                  that.options = res.data.list;
                  console.log(res.data.list);
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
            //axios
            const axios = require("axios");
            let that = this;
            axios
              .post("http://localhost:8080/dzw_sys/api/tzy/shop/addshop",this.shop)
              .then(function (res) {
                 if(res.data){
                    that.$message({
                      type: 'success',
                      message: '添加成功'
                    });
                     that.isShow = false;
                     that.queryshop();
                 }else{
                    that.$message({
                      type: 'success',
                      message: '添加失败'
                    });
                 }
                  
              });
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